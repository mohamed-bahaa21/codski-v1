var CHAT_URI = 'http://localhost:5001';

if (process.env.NODE_ENV === 'development') {
  CHAT_URI = process.env.NEXT_PUBLIC_DEV_CHAT;
}

if (process.env.NODE_ENV === 'production') {
  CHAT_URI = process.env.NEXT_PUBLIC_PROD_CHAT;
}

export default CHAT_URI;
