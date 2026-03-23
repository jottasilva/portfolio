require('dns').setDefaultResultOrder('ipv4first');
const { createClient } = require('@supabase/supabase-js');
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

const URL = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const KEY = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

const supabase = createClient(URL, KEY);

async function run() {
  const tables = ['about', 'projects', 'skills', 'experiences', 'certifications', 'contacts', 'chat_messages', 'visits'];
  console.log('--- RELATÓRIO DE DADOS SUPABASE ---\n');

  for (const t of tables) {
    try {
      const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
      if (error) throw error;
      console.log(`✅ ${t.padEnd(15)}: ${count || 0} registros`);
    } catch (err) {
      console.log(`❌ ${t.padEnd(15)}: Erro (${err.message})`);
    }
  }
}

run();
