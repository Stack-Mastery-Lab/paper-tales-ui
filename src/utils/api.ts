import type { ApiBook } from '../types';


import { API_BASE } from '../utils/config';

export async function fetchBooks(): Promise<ApiBook[]> {

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };


  console.log('Fetching books from API...-->>' + API_BASE);

  const response = await fetch(`${API_BASE}/catalogue-service/api/v1/books`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      targetMethod: 'GET',
      queryParams: {},
    }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching books: ${response.status}`);
  }

  return response.json();
}
