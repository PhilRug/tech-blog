const { User } = require('../models');

const userdata =
[
  {
    "username": "RZA",
    "password": "greatpass123",
    "email": "outdatedreferance1@aol.com"
  },
  {
    "username": "GZA",
    "password": "greatpass456",
    "email": "outdatedreferance2@hotmail.com"
  },
  {
    "username": "ODB",
    "password": "shimmyshimmyya1",
    "email": "outdatedreferance3@msn.com"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
