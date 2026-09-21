export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export const createBookingData = () => ({
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 100,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-09-20',
    checkout: '2026-09-25',
  },
});
