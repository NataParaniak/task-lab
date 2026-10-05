import { validUser } from '../test-data/credentials';

export class ApiClient {
  private token?: string;
  

  constructor(private baseUrl: string) {


  }
async getToken(): Promise<string> {
  if (!this.token) {
    const response = await this.post('/auth', {
      username: validUser.username,
      password: validUser.password,
    });

    const data = await response.json();

    this.token = data.token;
  }

  return this.token!;
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

