export class ApiClient {
private token?:string;

  constructor(private baseUrl: string) {}
   setToken(token: string): void {
    this.token = token;
  }
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

  async put(url: string, data: unknown): Promise<Response> {
    return fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${this.token}`,
      },
      body: JSON.stringify(data),
    });
  }
   async delete(url: string) : Promise<Response>{
  return fetch(`${this.baseUrl}${url}`, {
    method: 'DELETE',
    headers: {
      Cookie: `token=${this.token}`,
    },
  });
}
  }
  

