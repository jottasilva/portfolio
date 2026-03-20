const { Client, Databases, Query } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function testStats() {
    console.log('--- 🧪 Testando getVisitStats() ---');
    try {
        const resp = await databases.listDocuments('main', 'visits', [
            Query.limit(500),
        ]);
        const docs = resp.documents;
        console.log(`Documentos encontrados: ${docs.length}`);

        const cityCount = {};
        docs.forEach((d) => {
            if (d.city) cityCount[d.city] = (cityCount[d.city] || 0) + 1;
        });

        const topCities = Object.entries(cityCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([city, count]) => ({ city, count }));

        console.log('Result:', {
            total: docs.length,
            uniqueVisitors: new Set(docs.map(d => d.visitorId)).size,
            topCities
        });

    } catch (e) {
        console.error('❌ Erro real na execução:', e.message);
    }
}

testStats();
