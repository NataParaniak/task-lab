
import { test, expect, afterEach } from '@jest/globals';

import { config } from '../config/config';

import { BookingApi } from '../api/BookingApi';
import { createBookingData } from '../test-data/dataObject';


const bookingApi = new BookingApi(config.baseUrl);


describe('Booking API', () => {
  // let bookingId: number | undefined;

  // afterEach(async () => {
  //   if (bookingId !== undefined) {
  //     console.log(`Cleanup: deleting booking ${bookingId}`);

  //     await bookingApi.deleteBooking(bookingId);

  //     bookingId = undefined;
  //   }
  // });

test('Create booking', async () => {
  const bookingData = createBookingData();

  const response = await bookingApi.createBooking(bookingData);
  const body = await response.json();

  expect(response.status).toBe(200);

  expect(body).toEqual({
    bookingid: expect.any(Number),
    booking: bookingData,
  });
  let bookingId=body.bookingid
 let emptyResult=await bookingApi.deleteBooking(bookingId);
 expect(emptyResult.status).toBe(201)

 let getResponse = await bookingApi.getBooking(bookingId);
 expect(getResponse.status).toBe(404)
 
});

test('Get created booking by id', async () => {
   const bookingData = createBookingData();
  let bookingId = await bookingApi.createBookingID();

  const response = await bookingApi.getBooking(bookingId);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(body).toEqual(bookingData);
  await bookingApi.deleteBooking(bookingId)
});

test('Update booking', async () => {
  const bookingData = createBookingData();

  let bookingId=await bookingApi.createBookingID()
 

  const updatedBookingData = {
    ...bookingData,
    bookingId,
    firstname: 'Nata',
  };

  const response = await bookingApi.updateBooking(
    updatedBookingData,
  );

  const body = await response.json();

  expect(response.status).toBe(200);

  expect(body).toEqual({
    ...bookingData,
    firstname: 'Nata',

    
  });
   await bookingApi.deleteBooking(bookingId)
});

test('Delete booking', async () => {


   let bookingId=await bookingApi.createBookingID()

  const response = await bookingApi.deleteBooking(bookingId);

  expect(response.status).toBe(201);

  const getResponse = await bookingApi.getBooking(bookingId);

  expect(getResponse.status).toBe(404);

  
});

 })



