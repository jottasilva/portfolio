const { Client, Users, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

async function createUser() {
    console.log('--- 🚀 Registrando Novo Usuário ---');
    try {
        await users.create(
            ID.unique(),
            'jefferson_jsp@hotmail.com',
            undefined, // phone
            '@canguru9909_', // password
            'Jefferson'
        );
        console.log('✅ Usuário "jefferson_jsp@hotmail.com" criado com sucesso!');
    } catch (error) {
        if (error.code === 409) {
            console.log('ℹ️ Usuário já cadastrado ou e-mail já existe.');
        } else {
            console.error('❌ Erro ao criar usuário:', error);
        }
    }
}

createUser();
