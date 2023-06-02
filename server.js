const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Post, Comment } = require("./models");

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: process.env.DB_SESSION_SECRET,
  cookie: {
    // 30 min
    maxAge: 0.5 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// Set up handlebars as the template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Serve static files from the public directory
app.use(express.static("public"));

// Import and use the routes
const allRoutes = require("./Develop/controllers");
app.use(allRoutes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
