require('dns').setDefaultResultOrder('ipv4first');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`${name}="([^"]+)"`));
  if (match) return match[1];
  const matchNoQuotes = envContent.match(new RegExp(`${name}=([^\\n]+)`));
  return matchNoQuotes ? matchNoQuotes[1].trim() : '';
}

const ENDPOINT = getEnvVar('NEXT_PUBLIC_APPWRITE_ENDPOINT');
const PROJECT = getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECT_ID');
const KEY = getEnvVar('APPWRITE_API_KEY');

async function api(path) {
  const url = `${ENDPOINT}${path}`;
  const res = await fetch(url, {
    headers: { 'X-Appwrite-Project': PROJECT, 'X-Appwrite-Key': KEY }
  });
  if (!res.ok) throw new Error(`${res.status} - ${await res.text()}`);
  return res.json();
}

async function run() {
  const sqlLines = [
    '-- ==========================================',
    '-- SUPABASE DATA RECOVERY',
    '-- Cole e execute este script no SQL Editor do Supabase Studio',
    '-- ==========================================\n'
  ];

  try {
    console.log('Buscando Bancos de Dados no Appwrite...');
    const dbsRes = await api('/databases');
    const databases = dbsRes.databases || [];

    if (databases.length === 0) {
      console.log('❌ Nenhum banco de dados encontrado no Appwrite.');
      return;
    }

    const db = databases[0]; // Tentar o primeiro banco da lista
    const dbId = db.$id;
    console.log(`👉 Usando Banco de Dados: ${dbId} (${db.name})`);

    console.log('Buscando Coleções...');
    const colsRes = await api(`/databases/${dbId}/collections`);
    const collections = colsRes.collections || [];

    for (const col of collections) {
      console.log(`Processando: ${col.name} (${col.$id})...`);
      try {
        const docsRes = await api(`/databases/${dbId}/collections/${col.$id}/documents`);
        const docs = docsRes.documents || [];
        
        if (docs.length === 0) {
          console.log(`- Coleção ${col.name} está vazia.`);
          continue;
        }

        const tableName = col.$id; // No Postgres, assumimos que o ID da coleção bate com a tabela
        sqlLines.push(`-- --- Dados de ${tableName} ---`);

        // Mapeamento de colunas Appwrite ➔ Supabase (snake_case)
        const COLUMN_MAP = {
          projectType: 'project_type',
          submittedAt: 'submitted_at',
          resumeUrl: 'resume_url',
          imageUrl: 'image_url',
          image: 'image_url',
          visitedAt: 'visited_at',
          visitorId: 'visitor_id'
        };

        if (tableName === 'visits') {
           sqlLines.push('ALTER TABLE visits ALTER COLUMN visitor_id DROP NOT NULL;');
        }

        // ALTER TABLE dinâmico para garantir que colunas extras existam
        if (docs.length > 0) {
          const sampleDoc = docs[0];
          const keys = Object.keys(sampleDoc)
            .filter(k => !k.startsWith('$'))
            .map(k => COLUMN_MAP[k] || k);

          for (const k of keys) {
             if (['id', 'created_at', 'updated_at'].includes(k)) continue;
             // Executa um IF NOT EXISTS para colunas extras
             sqlLines.push(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${k} TEXT;`);
          }
          sqlLines.push('');
        }

        for (const doc of docs) {
          const keys = Object.keys(doc)
            .filter(k => !k.startsWith('$'))
            .map(k => COLUMN_MAP[k] || k);

          const values = keys.map(k => {
            const originalKey = Object.keys(COLUMN_MAP).find(ok => COLUMN_MAP[ok] === k) || k;
            let val = doc[originalKey];
            if (val === null || val === undefined) return 'NULL';

            // Especial para SKILLS - Converter '98%' para 98
            if (tableName === 'skills' && k === 'value' && typeof val === 'string') {
              const numeric = parseInt(val.replace('%', ''));
              return isNaN(numeric) ? 'NULL' : numeric;
            }

            if (Array.isArray(val)) val = val.join('\n');
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            return val;
          });

          if (keys.length > 0) {
            sqlLines.push(`INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${values.join(', ')});`);
          }
        }
        sqlLines.push('');
        console.log(`✅ ${docs.length} registros montados para ${col.name}.`);
      } catch (err) {
        console.warn(`⚠️ Aviso na coleção ${col.name}:`, err.message);
      }
    }

    fs.writeFileSync('supabase_data.sql', sqlLines.join('\n'));
    console.log('\n🔥 Arquivo `supabase_data.sql` gerado com sucesso na raiz do projeto!');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
}

run();
