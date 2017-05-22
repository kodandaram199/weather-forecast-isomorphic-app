const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/locations',
  port: process.env.PORT || 8000,
  'secretKey': '12345-67890-09876-54321'
};

export default config;
