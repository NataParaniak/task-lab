import { ApiClient } from './ApiClient';

import { Booking, BookingData,createBookingData } from '../test-data/dataObject';


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
   

    return this.put( `/booking/${bookingId}`, bookingDetails,);
  }

  async deleteBooking(
    bookingId: number,
  ): Promise<Response> {
   

    return this.delete(
      `/booking/${bookingId}`,
      
    )}
    
async createBookingID(): Promise<number>{
  const bookingData=createBookingData()
  const response=await this.createBooking(bookingData);
  const body=await response.json();
  const bookingId=body.bookingid
  if(bookingId===undefined){
    throw new Error ('Booking ID was not created') 
  }
 return bookingId

}

  

}