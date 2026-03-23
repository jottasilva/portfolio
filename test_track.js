// Fetch já é nativo no Node 18+

async function test() {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: 'test-ai-' + Math.random().toString(36).substring(7),
        page: '/qualquer-pagina',
        referrer: 'meu-teste'
      })
    });
    console.log('Status:', res.status);
    console.log('Body:', await res.text());
  } catch (err) {
    console.error('Erro de Conexão:', err.message);
  }
}
test();
