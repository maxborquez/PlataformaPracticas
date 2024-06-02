require('dotenv').config();

module.exports = {
    apps: [
      {
        name: 'backend',
        script: 'node ./src/index.js',
        env: {
          PORT: process.env.PORT || 3000,
          DATABASE_URL: process.env.DATABASE_URL,  
        },
      },
    ],
  };
  