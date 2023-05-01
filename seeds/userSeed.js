const { User } = require('../models');

const userdata =
[
  {
    "username": "RZA",
    "password": "greatpass123"
  },
  {
    "username": "GZA",
    "password": "greatpass456"
  },
  {
    "username": "ODB",
    "password": "shimmyshimmyya1"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
