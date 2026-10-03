import { ApiClient } from './ApiClient';
import { Booking, BookingData } from '../test-data/dataObject';

export class BookingApi {
  constructor(private apiClient: ApiClient) {}

  async createBooking(
    bookingData: BookingData,
  ): Promise<Response> {
    return this.apiClient.post('/booking', bookingData);
  }

  async getBooking(bookingId: number): Promise<Response> {
    return this.apiClient.get(`/booking/${bookingId}`);
  }

  async updateBooking(
    bookingData: Booking,
  ): Promise<Response> {
    const { bookingId, ...bookingDetails } = bookingData;

    return this.apiClient.put(
      `/booking/${bookingId}`,
      bookingDetails,
    );
  }

  async deleteBooking(bookingId: number): Promise<Response> {
    return this.apiClient.delete(`/booking/${bookingId}`);
  }
}