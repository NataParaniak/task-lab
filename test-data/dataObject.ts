export type BookingData = {
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

export type Booking = BookingData & {
  bookingId: number;
};


function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}



export const createBookingData = (): BookingData => {
  const checkin = new Date();
  checkin.setDate(checkin.getDate() + 7);

  const checkout = new Date(checkin);
  checkout.setDate(checkout.getDate() + 5);

  return {
    firstname: `John_${Date.now()}`,
    lastname: 'Smith',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: formatDate(checkin),
      checkout: formatDate(checkout),
       },
    
  };
};
