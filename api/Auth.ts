import {ApiClient}  from './ApiClient';



export class Auth {
  constructor(private apiClient: ApiClient) {}

  async getToken( username: string, password: string,): Promise<string>  {
   const response=await this.apiClient.post('/auth',{ username,password});
   const data=await response.json()
   return data.token;
  }
}