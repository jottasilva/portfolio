import { databases, account, storage } from '@/infrastructure/appwrite';
import { ID, Query } from 'appwrite';

// Defina os IDS das suas coleções no Dashboard do Appwrite
const DATABASE_ID = 'main'; // ID do Banco de dados principal
export const COLLECTIONS = {
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CONTACTS: 'contacts',
  CERTIFICATIONS: 'certifications',
  ABOUT: 'about',
  EXPERIENCES: 'experiences',
  CHAT_MESSAGES: 'chat_messages', // Adicionado para logs do terminal
};

export const appwriteService = {
  // --- 📷 STORAGE / IMAGENS ---
  async uploadImage(file: File) {
    try {
      const response = await storage.createFile('uploads', ID.unique(), file);
      // Retorna a URL de visualização do arquivo
      const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/uploads/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      return fileUrl;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  },
  /**
   * 1. Mensagens de Contato
   */
  async sendContactMessage(data: { name: string; email: string; message: string; projectType?: string }) {
    try {
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.CONTACTS, ID.unique(), {
        ...data,
        submittedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  },

  async getContactMessages() {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CONTACTS, [
        Query.orderDesc('submittedAt')
      ]);
      return response.documents;
    } catch (error) {
      console.error('Erro ao buscar mensagens do Appwrite:', error);
      return [];
    }
  },

  /**
   * 2. CRUD Projetos
   */
  async getProjects() {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROJECTS, [
         Query.orderDesc('$createdAt')
      ]);
      return response.documents;
    } catch (error) {
      console.error('Erro ao buscar projetos do Appwrite:', error);
      return [];
    }
  },

  async createProject(data: { title: string; description: string; image?: string; link?: string; github?: string; category: string; node?: string }) {
    try {
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.PROJECTS, ID.unique(), data);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  },

  async deleteProject(id: string) {
    try {
      return await databases.deleteDocument(DATABASE_ID, COLLECTIONS.PROJECTS, id);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      throw error;
    }
  },

  async updateProject(id: string, data: { title: string; description: string; image?: string; link?: string; github?: string; category?: string; node?: string }) {
    try {
      return await databases.updateDocument(DATABASE_ID, COLLECTIONS.PROJECTS, id, data);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw error;
    }
  },

  /**
   * 3. CRUD Habilidades (Skills)
   */
  async getSkills() {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SKILLS);
      return response.documents;
    } catch (error) {
      console.error('Erro ao buscar Skills do Appwrite:', error);
      return [];
    }
  },

  async createSkill(data: { name: string; category: string; value: string }) {
    try {
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.SKILLS, ID.unique(), data);
    } catch (error) {
      console.error('Erro ao criar Skill:', error);
      throw error;
    }
  },

  async deleteSkill(id: string) {
    try {
      return await databases.deleteDocument(DATABASE_ID, COLLECTIONS.SKILLS, id);
    } catch (error) {
      console.error('Erro ao deletar Skill:', error);
      throw error;
    }
  },

  async updateSkill(id: string, data: { name: string; category: string; value: string }) {
    try {
      return await databases.updateDocument(DATABASE_ID, COLLECTIONS.SKILLS, id, data);
    } catch (error) {
      console.error('Erro ao atualizar Skill:', error);
      throw error;
    }
  },

  /**
   * 4. CRUD Certificações
   */
  async getCertifications() {
    try {
      const resp = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CERTIFICATIONS);
      return resp.documents;
    } catch { return []; }
  },
  async createCertification(data: { title: string; issuer: string; date: string; link?: string }) {
    return await databases.createDocument(DATABASE_ID, COLLECTIONS.CERTIFICATIONS, ID.unique(), data);
  },
  async updateCertification(id: string, data: { title: string; issuer: string; date: string; link?: string }) {
    return await databases.updateDocument(DATABASE_ID, COLLECTIONS.CERTIFICATIONS, id, data);
  },
  async deleteCertification(id: string) {
    return await databases.deleteDocument(DATABASE_ID, COLLECTIONS.CERTIFICATIONS, id);
  },

  /**
   * 5. Dados de Sobre (About) - Documento Único "current"
   */
  async getAbout() {
    try {
      const resp = await databases.getDocument(DATABASE_ID, COLLECTIONS.ABOUT, 'current');
      return resp;
    } catch { return null; }
  },
  async updateAbout(data: { title: string; subtitle: string; bio: string; resumeUrl?: string }) {
    try {
      return await databases.updateDocument(DATABASE_ID, COLLECTIONS.ABOUT, 'current', data);
    } catch (error: any) {
      if (error.code === 404) {
        return await databases.createDocument(DATABASE_ID, COLLECTIONS.ABOUT, 'current', data);
      }
      throw error;
    }
  },

  /**
   * 6. CRUD Trajetória / Experiências
   */
  async getExperiences() {
    try {
      const resp = await databases.listDocuments(DATABASE_ID, 'experiences');
      return resp.documents;
    } catch { return []; }
  },
  async createExperience(data: any) {
    return await databases.createDocument(DATABASE_ID, 'experiences', ID.unique(), data);
  },
  async updateExperience(id: string, data: any) {
    return await databases.updateDocument(DATABASE_ID, 'experiences', id, data);
  },
  async deleteExperience(id: string) {
    return await databases.deleteDocument(DATABASE_ID, 'experiences', id);
  },

  /**
   * 7. Métricas de Visitas
   */
  async getVisits(limit = 100) {
    try {
      const resp = await databases.listDocuments(DATABASE_ID, 'visits', [
        Query.orderDesc('visitedAt'),
        Query.limit(limit),
      ]);
      return resp.documents;
    } catch { return []; }
  },

  async getVisitStats() {
    try {
      const resp = await databases.listDocuments(DATABASE_ID, 'visits', [
        Query.limit(500),
      ]);
      const docs = resp.documents;

      // Total de visitas
      const total = docs.length;

      // Visitantes únicos (por visitorId)
      const uniqueVisitors = new Set(docs.map((d: any) => d.visitorId)).size;

      // Cidades mais acessadas
      const cityCount: Record<string, number> = {};
      docs.forEach((d: any) => {
        if (d.city) cityCount[d.city] = (cityCount[d.city] || 0) + 1;
      });
      const topCities = Object.entries(cityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([city, count]) => ({ city, count }));

      return { total, uniqueVisitors, topCities };
    } catch { return { total: 0, uniqueVisitors: 0, topCities: [] }; }
  },

  /**
   * 8. Mensagens de Chat (Logs)
   */
  async sendChatMessage(data: { prompt: string; response: string }) {
    try {
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.CHAT_MESSAGES, ID.unique(), {
        ...data,
        submittedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao salvar log de chat:', error);
      throw error;
    }
  },

  async getChatMessages() {
    try {
      const resp = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CHAT_MESSAGES, [
        Query.orderDesc('submittedAt'),
        Query.limit(50)
      ]);
      return resp.documents;
    } catch (error: any) { 
      if (error.code === 404) return { error: 'collection_missing' } as any;
      return []; 
    }
  },

  async deleteChatMessage(id: string) {
    try {
      return await databases.deleteDocument(DATABASE_ID, COLLECTIONS.CHAT_MESSAGES, id);
    } catch (error) {
      console.error('Erro ao deletar log de chat:', error);
      throw error;
    }
  }
};
