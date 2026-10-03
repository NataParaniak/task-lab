
import { test, expect, beforeEach, afterEach } from '@jest/globals';

import { config } from '../config/config';
import { ApiClient } from '../api/ApiClient';
import { Auth } from '../api/Auth';
import { BookingApi } from '../api/BookingApi';
import { createBookingData } from '../test-data/dataObject';
import { validUser } from '../test-data/credentials';

let apiClient: ApiClient;
let auth: Auth;
let bookingApi: BookingApi;

let token: string;
let bookingId: number | undefined;

beforeEach(async () => {
  apiClient = new ApiClient(config.baseUrl);

  auth = new Auth(apiClient);
  bookingApi = new BookingApi(apiClient);

  token = await auth.getToken(
    validUser.username,
    validUser.password,
  );

  apiClient.setToken(token);
});

afterEach(async () => {
  if (bookingId !== undefined) {
    console.log(`Cleanup: deleting booking ${bookingId}`);

    await bookingApi.deleteBooking(bookingId);

    bookingId = undefined;
  }
});

test('Create authentication token', async () => {
  const response = await apiClient.post('/auth', validUser);
  const body = await response.json();

  expect(response.status).toBe(200);

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

  expect(body).toEqual({
    token: expect.any(String),
  });
});

test('Create booking', async () => {
  const bookingData = createBookingData();

  const response = await bookingApi.createBooking(bookingData);
  const body = await response.json();

  expect(response.status).toBe(200);

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

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

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

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

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

  expect(body).toEqual({
    firstname: 'Nata',
    lastname: bookingData.lastname,
    totalprice: bookingData.totalprice,
    depositpaid: bookingData.depositpaid,
    bookingdates: bookingData.bookingdates,
    ...(bookingData.additionalneeds && {
      additionalneeds: bookingData.additionalneeds,
    }),
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

  bookingId = undefined;
});





