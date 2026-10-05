import { ApiClient } from './ApiClient';

import { Booking, BookingData } from '../test-data/dataObject';


export class BookingApi extends ApiClient{


  constructor(baseUrl: string) {
    super(baseUrl);
  }



  async createBooking(
    bookingData: BookingData,
  ): Promise<Response> {
    return this.post('/booking', bookingData);
  }

  async getBooking(
    bookingId: number,
  ): Promise<Response> {
    return this.get(`/booking/${bookingId}`);
  }

  async updateBooking(
    bookingData: Booking,
  ): Promise<Response> {
    const { bookingId, ...bookingDetails } = bookingData;
   

    return this.put(
      `/booking/${bookingId}`,
      bookingDetails,
      
    );
  }

  async deleteBooking(
    bookingId: number,
  ): Promise<Response> {
    const token = await this.getToken();

    return this.delete(
      `/booking/${bookingId}`,
      
    );
  }
}