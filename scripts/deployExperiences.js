const { Client, Databases, Permission, Role, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = 'main';

async function deploy() {
    console.log('--- 🚀 Iniciando Deploy de Experiences ---');

    try {
        console.log('Criando coleção "experiences"...');
        await databases.createCollection(DATABASE_ID, 'experiences', 'Trajetória / Experiências', [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log('✅ Coleção "experiences" criada!');

        console.log('Adicionando atributos a "experiences"...');
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'type', 50, true); // 'Trabalho' | 'Acadêmico'
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'title', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'institution', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'period', 100, true);
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'description', 2000, true);
        // Adiciona um atributo de texto longo para atividades separadas por \n
        await databases.createStringAttribute(DATABASE_ID, 'experiences', 'activities', 2000, false);
        
        console.log('✅ Atributos de "experiences" criados!');
    } catch (e) {
        console.log('ℹ️ Erro:', e.message);
    }

    console.log('\n--- 🎉 Deploy de Experiences concluído! ---');
}

deploy();
