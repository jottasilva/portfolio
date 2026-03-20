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
    console.log('--- 🚀 Iniciando Deploy de Novas Coleções ---');

    // 1. Criar Coleção "certifications"
    try {
        console.log('Criando coleção "certifications"...');
        await databases.createCollection(DATABASE_ID, 'certifications', 'Certificações Técnicas', [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log('✅ Coleção "certifications" criada!');

        console.log('Adicionando atributos a "certifications"...');
        await databases.createStringAttribute(DATABASE_ID, 'certifications', 'title', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'certifications', 'issuer', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'certifications', 'date', 100, true);
        await databases.createStringAttribute(DATABASE_ID, 'certifications', 'link', 500, false);
        console.log('✅ Atributos de "certifications" criados!');
    } catch (e) {
        console.log('ℹ️ Provavelmente já existe certifications:', e.message);
    }

    // 2. Criar Coleção "about"
    try {
        console.log('\nCriando coleção "about"...');
        await databases.createCollection(DATABASE_ID, 'about', 'Sobre o Profissional', [
            Permission.read(Role.any()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log('✅ Coleção "about" criada!');

        console.log('Adicionando atributos a "about"...');
        await databases.createStringAttribute(DATABASE_ID, 'about', 'title', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'about', 'subtitle', 255, true);
        await databases.createStringAttribute(DATABASE_ID, 'about', 'bio', 2000, true);
        await databases.createStringAttribute(DATABASE_ID, 'about', 'resumeUrl', 500, false);
        console.log('✅ Atributos de "about" criados!');
    } catch (e) {
        console.log('ℹ️ Provavelmente já existe about:', e.message);
    }

    console.log('\n--- 🎉 Deploy de Novas Coleções concluído! ---');
}

deploy();
