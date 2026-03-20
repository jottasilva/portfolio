const { Client, Databases, Permission, Role } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DB = 'main';

async function deployVisits() {
    console.log('--- 📊 Criando coleção "visits" ---');
    try {
        await databases.createCollection(DB, 'visits', 'Métricas de Visitas', [
            // Escrita aberta: API route server-side vai registrar
            Permission.create(Role.any()),
            // Leitura apenas para usuários autenticados (admin)
            Permission.read(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log('✅ Coleção "visits" criada!');

        const attrs = [
            ['visitorId', 255, true],   // ID único gerado no client (localStorage)
            ['ip', 100, false],          // IP do visitante
            ['city', 100, false],        // Cidade
            ['country', 100, false],     // País
            ['region', 100, false],      // Estado/Região
            ['timezone', 100, false],    // Fuso horário
            ['page', 255, true],         // Página acessada
            ['referrer', 500, false],    // Página anterior
            ['userAgent', 500, false],   // Navegador
            ['visitedAt', 50, true],     // ISO timestamp
        ];

        console.log('Adicionando atributos...');
        for (const [name, size, required] of attrs) {
            await databases.createStringAttribute(DB, 'visits', name, size, required);
            console.log(`  ✅ ${name}`);
        }
        console.log('\n✅ Coleção "visits" configurada com sucesso!');
    } catch (e) {
        console.log('❌ Erro:', e.message);
    }
}

deployVisits();
