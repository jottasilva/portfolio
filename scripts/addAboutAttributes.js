const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = 'main';

async function addAboutAttributes() {
    console.log('--- 🛠️  Adicionando Atributos em "about" ---');

    const attributes = [
        { name: 'name', size: 255 },
        { name: 'role', size: 255 },
        { name: 'imageUrl', size: 500 }
    ];

    for (const attr of attributes) {
        try {
            console.log(`Adicionando atributo "${attr.name}"...`);
            await databases.createStringAttribute(DATABASE_ID, 'about', attr.name, attr.size, false);
            console.log(`✅ Atributo "${attr.name}" adicionado!`);
        } catch (e) {
            console.log(`ℹ️ Erro ao criar "${attr.name}":`, e.message);
        }
    }

    console.log('\n--- 🎉 Atributos de "about" adicionados! ---');
}

addAboutAttributes();
