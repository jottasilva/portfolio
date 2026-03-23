import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Busca dados do usuário (Repos)
    const userResp = await fetch('https://api.github.com/users/jottasilva', {
       next: { revalidate: 3600 } // Cache por 1 hora
    });
    const userData = await userResp.json();

    // Busca total de commits via Search API
    const commitsResp = await fetch('https://api.github.com/search/commits?q=author:jottasilva', {
       headers: { Accept: 'application/vnd.github.cloak-preview' },
       next: { revalidate: 3600 }
    });
    const commitsData = await commitsResp.json();

    return NextResponse.json({
      repos: userData.public_repos || 0,
      commits: commitsData.total_count || '1.1k+',
    });
  } catch (error) {
    return NextResponse.json({ repos: '28+', commits: '1300+' }); // Fallback seguro
  }
}
