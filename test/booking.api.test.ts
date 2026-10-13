
import { test, expect } from '@jest/globals';

import { config } from '../config/config';

import { BookingApi } from '../api/BookingApi';

import { createBookingData } from '../test-data/dataObject';
import {createBookingAndGetId} from '../helpers/bookingHelper'

const bookingApi = new BookingApi(config.baseUrl);

const bookingIds: number[] = [];
describe('Booking API', () => {
    afterEach(async () => {
    for (const bookingId of bookingIds) {
      await bookingApi.deleteBooking(bookingId);
    }

    bookingIds.length = 0;
  });

test.concurrent('Create booking', async () => {
  const bookingData = createBookingData();
 

     
    const response = await bookingApi.createBooking(bookingData);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.bookingid).toEqual(expect.any(Number));
    expect(body.booking).toEqual(bookingData);

    let bookingId = body.bookingid;
    bookingIds.push(bookingId)
 
});

test.concurrent('Get created booking by id', async () => {
   const bookingData = createBookingData();
  let bookingId = await createBookingAndGetId(bookingApi);
  bookingIds.push(bookingId)
  const response = await bookingApi.getBooking(bookingId);
  const body = await response.json();
 
  expect(response.status).toBe(200);
  expect(body).toEqual(bookingData);
  
});

test.concurrent('Update booking', async () => {
  const bookingData = createBookingData();

  let bookingId=await createBookingAndGetId(bookingApi)
 bookingIds.push(bookingId)

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
 
});

test.concurrent('Delete booking', async () => {


   let bookingId=await createBookingAndGetId(bookingApi)

  const response = await bookingApi.deleteBooking(bookingId);

  expect(response.status).toBe(201);

  const getResponse = await bookingApi.getBooking(bookingId);

  expect(getResponse.status).toBe(404);

  
});

 })



