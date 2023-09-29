const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// laa sequelize yo config haru lag ani database connect gardey vaneko  
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 
db.blogs = require("./blogModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);

//relationships for blogs and users
db.users.hasMany(db.blogs)
db.blogs.belongsTo(db.users)


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;