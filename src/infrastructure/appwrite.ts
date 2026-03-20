import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (endpoint) {
    client.setEndpoint(endpoint);
} else if (typeof window === 'undefined') {
    client.setEndpoint('http://localhost/v1'); // Fallback apenas para builds estáticos
}

if (projectId) {
    client.setProject(projectId);
}

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export default client;
