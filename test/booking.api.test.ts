
import { test, expect, afterEach } from '@jest/globals';

import { config } from '../config/config';
import { ApiClient } from '../api/ApiClient';
import { BookingApi } from '../api/BookingApi';
import { createBookingData } from '../test-data/dataObject';

const apiClient = new ApiClient(config.baseUrl);
const bookingApi = new BookingApi(apiClient);

let bookingId: number | undefined;

afterEach(async () => {
  if (bookingId !== undefined) {
    console.log(`Cleanup: deleting booking ${bookingId}`);

    await bookingApi.deleteBooking(bookingId);

    bookingId = undefined;
  }
});

test('Create booking', async () => {
  const bookingData = createBookingData();

  const response = await bookingApi.createBooking(bookingData);
  const body = await response.json();

  expect(response.status).toBe(200);

  expect(body).toEqual({
    bookingid: expect.any(Number),
    booking: bookingData,
  });

  bookingId = body.bookingid;
});

test('Get created booking by id', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

  const response = await bookingApi.getBooking(bookingId);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(body).toEqual(bookingData);
});

test('Update booking', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

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

test('Delete booking', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

  const response = await bookingApi.deleteBooking(bookingId);

  expect(response.status).toBe(201);

  const getResponse = await bookingApi.getBooking(bookingId);

  expect(getResponse.status).toBe(404);

  bookingId = undefined;
});





