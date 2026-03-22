const { Client, Databases, ID, Permission, Role } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function testCreate() {
    console.log('--- 🧪 Testando criação de documento em "visits" ---');
    try {
        const doc = await databases.createDocument(
            'main',
            'visits',
            ID.unique(),
            {
                visitorId: 'test-visitor',
                ip: '127.0.0.1',
                city: 'TestCity',
                country: 'TestCountry',
                region: 'TestRegion',
                timezone: 'TestTimezone',
                page: '/test',
                referrer: 'test-referrer',
                userAgent: 'test-agent',
                visitedAt: new Date().toISOString(),
            },
            [
                Permission.read(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('✅ Sucesso! Documento criado:', doc.$id);
    } catch (e) {
        console.error('❌ Erro completo:', e);
        if (e.response) {
            console.error('Resposta do Servidor:', JSON.stringify(e.response, null, 2));
        }
    }
}

testCreate();
