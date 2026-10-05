export class ApiClient {


  constructor(private baseUrl: string) {}
   
  
  async post(url: string, data: unknown): Promise<Response> {
    return fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

   async get(url: string): Promise<Response> {
    return fetch(`${this.baseUrl}${url}`);
  }

  async put(url: string, data: unknown, token: string): Promise<Response> {
    return fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(data),
    });
  }
 async delete(url: string, token: string,) : Promise<Response>{
  return fetch(`${this.baseUrl}${url}`, {
    method: 'DELETE',
    headers: {
      Cookie: `token=${token}`,
    },
  });
}
  
}

