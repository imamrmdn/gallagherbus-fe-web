// REVERSE PROXY SERVER SIDE 

export async function GET() {
  // const apiUrl = 'https://49c9-103-171-161-217.ngrok-free.app/api/jadwal/get{}';
  const apiUrl = 'https://e7c0-103-171-161-217.ngrok-free.app/api/jadwal/get';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Tambahkan header lain jika diperlukan
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Fetch error:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
