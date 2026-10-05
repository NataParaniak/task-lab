import { ApiClient } from './ApiClient';
import { Auth } from './Auth';
import { Booking, BookingData } from '../test-data/dataObject';
import { validUser } from '../test-data/credentials';

export class BookingApi {
  private readonly auth: Auth;
  private token?: string;

  constructor(private readonly apiClient: ApiClient) {
    this.auth = new Auth(apiClient);
  }

  private async getToken(): Promise<string> {
    if (!this.token) {
      this.token = await this.auth.getToken(
        validUser.username,
        validUser.password,
      );
    }

    return this.token;
  }

  async createBooking(
    bookingData: BookingData,
  ): Promise<Response> {
    return this.apiClient.post('/booking', bookingData);
  }

  async getBooking(
    bookingId: number,
  ): Promise<Response> {
    return this.apiClient.get(`/booking/${bookingId}`);
  }

  async updateBooking(
    bookingData: Booking,
  ): Promise<Response> {
    const { bookingId, ...bookingDetails } = bookingData;
    const token = await this.getToken();

    return this.apiClient.put(
      `/booking/${bookingId}`,
      bookingDetails,
      token
    );
  }

  async deleteBooking(
    bookingId: number,
  ): Promise<Response> {
    const token = await this.getToken();

    return this.apiClient.delete(
      `/booking/${bookingId}`,
      token
    );
  }
}