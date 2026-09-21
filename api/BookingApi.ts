import {ApiClient}  from './ApiClient';
import {Booking} from '../test-data/dataObject'

export class BookingApi {
  constructor(private apiClient: ApiClient) {}

  async createBooking(bookingData: Booking) {
    return this.apiClient.post('/booking', bookingData);
  }

  async getBooking(bookingId: number) {
    return this.apiClient.get(`/booking/${bookingId}`);
  }
  async updateBooking(
    bookingId: number,
    bookingData: unknown,
    token: string,
  ) {
    return this.apiClient.put(
      `/booking/${bookingId}`,
      bookingData,
      token,
    );
  }

  async deleteBooking(bookingId: number, token: string) {
  return this.apiClient.delete(`/booking/${bookingId}`, token);
}
}