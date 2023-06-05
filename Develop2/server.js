const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const exphbs = require('express-handlebars').create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
});

const app = express();
const PORT = process.env.PORT || 3001;

// Set up session
const sess = {
  secret: 'yourSecretSessionKey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000, // 24 hours
  },
};
app.use(session(sess));

// Set up handlebars as the template engine
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
