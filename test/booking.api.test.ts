let bookingId: number;
let token:string;

test('Create authentication token', async () => {
  const response = await fetch('https://restful-booker.herokuapp.com/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
  });

  const body = await response.json();
  token=body.token;
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('application/json');
  expect(body).toHaveProperty('token');
});


test('Create booking', async () => {
  const response = await fetch('https://restful-booker.herokuapp.com/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     firstname : 'Jim',
    lastname : 'Brown',
    totalprice : 111,
    depositpaid : true,
    bookingdates : {
        checkin : '2018-01-01',
        checkout : '2019-01-01'
    },
    additionalneeds : 'Breakfast'
    }),
  });

  const body = await response.json();
 bookingId=await body.bookingid
   expect(body).toHaveProperty('bookingid')
   expect(body).toHaveProperty('booking')


  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('application/json');

});


test('Get created booking by id', async () => {
    
  const response = await fetch(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );
 
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('application/json');

  expect(body).toHaveProperty('firstname');
  expect(body).toHaveProperty('lastname');
  expect(body).toHaveProperty('totalprice');
  expect(body).toHaveProperty('depositpaid');
  expect(body).toHaveProperty('bookingdates');

  expect(body.firstname).toBe('Jim');
  expect(body.lastname).toBe('Brown');
  expect(body.totalprice).toBe(111);
  expect(body.depositpaid).toBe(true);
  expect(body.bookingdates.checkin).toBe('2018-01-01');
  expect(body.bookingdates.checkout).toBe('2019-01-01');})

 
test('Update booking', async () => {
  const response = await fetch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
       Cookie: `token=${token}`,
    },
    body: JSON.stringify({
     firstname : 'Nata',
    lastname : 'Brown',
    totalprice : 111,
    depositpaid : true,
    bookingdates : {
        checkin : '2018-01-01',
        checkout : '2019-01-01'
    },
    additionalneeds : 'Breakfast'
    }),
  });

  const body = await response.json();
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('application/json');
  expect(body.firstname).toBe('Nata')

});
test('Delete booking', async () => {
  const response = await fetch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    method: 'DELETE',
    headers: {
     
       Cookie: `token=${token}`,
    },})
 
  expect(response.status).toBe(201);
 

});