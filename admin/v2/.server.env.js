var SERVER_URI = 'http://localhost:5000';

if (process.env.NODE_ENV === 'development') {
  SERVER_URI = process.env.NEXT_PUBLIC_DEV_SERVER;
}

if (process.env.NODE_ENV === 'production') {
  SERVER_URI = process.env.NEXT_PUBLIC_PROD_SERVER;
}

export default SERVER_URI;
