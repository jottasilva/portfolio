import { supabase } from '@/infrastructure/supabase';

export const supabaseService = {
  // --- 📷 STORAGE / IMAGENS ---
  async uploadImage(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      // Retorna URL pública do arquivo
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
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
      const { data: res, error } = await supabase.from('contacts').insert({
        name: data.name,
        email: data.email,
        message: data.message,
        project_type: data.projectType
      }).select().single();

      if (error) throw error;
      return res;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  },

  async getContactMessages() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      return [];
    }
  },

  /**
   * 2. CRUD Projetos
   */
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
  },

  async createProject(data: { title: string; description: string; image_url?: string; link?: string; github?: string; category: string; node?: string }) {
    try {
      const { data: res, error } = await supabase.from('projects').insert(data).select().single();
      if (error) throw error;
      return res;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  },

  async deleteProject(id: string) {
    return await supabase.from('projects').delete().eq('id', id);
  },

  async updateProject(id: string, data: any) {
    const { data: res, error } = await supabase.from('projects').update(data).eq('id', id).select();
    if (error) throw error;
    return res?.[0] || null;
  },

  /**
   * 3. CRUD Habilidades (Skills)
   */
  async getSkills() {
    try {
      const { data, error } = await supabase.from('skills').select('*').order('category');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar Skills:', error);
      return [];
    }
  },

  async createSkill(data: { name: string; category: string; value: number }) {
    return await supabase.from('skills').insert(data).select().single();
  },

  async updateSkill(id: string, data: any) {
    const { data: res, error } = await supabase.from('skills').update(data).eq('id', id).select();
    if (error) throw error;
    return res?.[0] || null;
  },

  async deleteSkill(id: string) {
    return await supabase.from('skills').delete().eq('id', id);
  },

  /**
   * 4. CRUD Certificações
   */
  async getCertifications() {
    try {
      const { data, error } = await supabase.from('certifications').select('*');
      if (error) throw error;
      return data || [];
    } catch { return []; }
  },

  async createCertification(data: any) {
    return await supabase.from('certifications').insert(data).select().single();
  },

  async updateCertification(id: string, data: any) {
    const { data: res, error } = await supabase.from('certifications').update(data).eq('id', id).select();
    if (error) throw error;
    return res?.[0] || null;
  },

  async deleteCertification(id: string) {
    return await supabase.from('certifications').delete().eq('id', id);
  },

  /**
   * 5. Dados de Sobre (About)
   */
  async getAbout() {
    try {
      const { data, error } = await supabase.from('about').select('*').eq('id', 'current').single();
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = 0 rows
      return data;
    } catch { return null; }
  },

  async updateAbout(data: { title: string; subtitle: string; bio: string; resume_url?: string }) {
    try {
      const { data: res, error } = await supabase.from('about').upsert({ id: 'current', ...data }).select().single();
      if (error) throw error;
      return res;
    } catch (error) {
      console.error('Erro ao atualizar About:', error);
      throw error;
    }
  },

  /**
   * 6. CRUD Trajetória / Experiências
   */
  async getExperiences() {
    try {
      const { data, error } = await supabase.from('experiences').select('*').order('created_at');
      if (error) throw error;
      return data || [];
    } catch { return []; }
  },

  async createExperience(data: any) {
    return await supabase.from('experiences').insert(data).select().single();
  },

  async updateExperience(id: string, data: any) {
    const { data: res, error } = await supabase.from('experiences').update(data).eq('id', id).select();
    if (error) throw error;
    return res?.[0] || null;
  },

  async deleteExperience(id: string) {
    return await supabase.from('experiences').delete().eq('id', id);
  },

  /**
   * 7. Mensagens de Chat (Logs)
   */
  async sendChatMessage(data: { prompt: string; response: string }) {
    try {
      return await supabase.from('chat_messages').insert(data).select().single();
    } catch (error) {
      console.error('Erro ao salvar log de chat:', error);
      return { error: 'insert_failed' };
    }
  },

  async getChatMessages() {
    try {
      const { data, error } = await supabase.from('chat_messages').select('*').order('submitted_at', { ascending: false }).limit(50);
      if (error) throw error;
      return data || [];
    } catch { return []; }
  },

  /**
   * 8. Estatísticas de Visitas
   */
  async getVisitStats() {
    try {
      const { count } = await supabase.from('visits').select('*', { count: 'exact', head: true });
      return { total: count || 0, uniqueVisitors: count || 0, topCities: [] };
    } catch { return { total: 0, uniqueVisitors: 0, topCities: [] }; }
  },

  async getVisits(limit = 20) {
    try {
      const { data } = await supabase.from('visits').select('*').order('visited_at', { ascending: false }).limit(limit);
      return data || [];
    } catch { return []; }
  },

  async deleteChatMessage(id: string) {
    try {
      return await supabase.from('chat_messages').delete().eq('id', id);
    } catch { return { error: 'delete_failed' }; }
  }
};
