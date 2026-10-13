
import { BookingApi } from '../api/BookingApi';
import { createBookingData } from '../test-data/dataObject';

export async function createBookingAndGetId(
  bookingApi: BookingApi
): Promise<number> {
  const bookingData = createBookingData();

  const response = await bookingApi.createBooking(bookingData);

  if (!response.ok) {
    throw new Error(
      `Failed to create booking: ${response.status}`
    );
  }

  const body = await response.json();
  const bookingId = body.bookingid;

  if (typeof bookingId !== 'number') {
    throw new Error('Booking ID was not created');
  }

  return bookingId;
}
