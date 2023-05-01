const sequelize = require('../config/config');
const seedUser = require('./userSeed');
const seedPost = require('./commentSeed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  process.exit(0);
};

seedAll();