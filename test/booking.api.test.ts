import { createBookingData } from "../test-data/dataObject"
import {validUser} from "../test-data/credentials"
import {ApiClient} from "../api/ApiClient"
import {BookingApi} from "../api/BookingApi"
import {  test, expect, beforeEach, afterEach } from '@jest/globals';


let bookingApi: BookingApi | undefined;
let token: string | undefined;
let bookingId: number | undefined;

beforeEach(async () => {
  const apiClient = new ApiClient(
    'https://restful-booker.herokuapp.com',
  );

  bookingApi = new BookingApi(apiClient);

  const authResponse = await apiClient.post('/auth', validUser);
  const authBody = await authResponse.json();

  token = authBody.token;
})
     
afterEach(async () => {
  if (
    bookingId !== undefined &&
    bookingApi !== undefined &&
    token !== undefined
  ) {
    console.log(`Cleanup: deleting booking ${bookingId}`);

    await bookingApi.deleteBooking(bookingId, token);
  }

  bookingId = undefined;
  token = undefined;
});

test('Create authentication token', async () => {
  const apiClient = new ApiClient(
    'https://restful-booker.herokuapp.com',
  );

  const response = await apiClient.post('/auth', validUser);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('application/json');

  expect(body).toEqual({
    token: expect.any(String),
  });
});



test('Create booking', async () => {
  const bookingData = createBookingData();

  const response = await bookingApi!.createBooking(bookingData);
  const body = await response.json();

  bookingId = body.bookingid;

  expect(response.status).toBe(200);

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

  expect(body).toEqual({
    bookingid: expect.any(Number),
    booking: bookingData,
  });
});




test('Get created booking by id', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi!.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

  const response = await bookingApi!.getBooking(bookingId);
  const body = await response.json();

  expect(response.status).toBe(200);

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

  expect(body).toEqual(bookingData);
});




test('Update booking', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi!.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

  const updatedBookingData = {
    ...bookingData,
    firstname: 'Nata',
  };

  const response = await bookingApi!.updateBooking(
    bookingId,
    updatedBookingData,
    token!,
  );

  const body = await response.json();

  expect(response.status).toBe(200);

  expect(response.headers.get('content-type')).toContain(
    'application/json',
  );

  expect(body).toEqual(updatedBookingData);
});


test('Delete booking', async () => {
  const bookingData = createBookingData();

  const createResponse = await bookingApi!.createBooking(bookingData);
  const createBody = await createResponse.json();

  bookingId = createBody.bookingid;

  if (bookingId === undefined) {
    throw new Error('Booking ID was not created');
  }

  const response = await bookingApi!.deleteBooking(
    bookingId,
    token!,
  );

  expect(response.status).toBe(201);

  bookingId = undefined;
});

