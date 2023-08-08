const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const proposalsRouter = require('./routes/proposals.router');
const calendarRouter = require('./routes/calendar.router')
const adminRouter = require('./routes/admin.router')
const galleryRouter = require('./routes/gallery.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/proposals', proposalsRouter);
app.use('/calendar', calendarRouter);
app.use('/admin', adminRouter);
app.use('/api/gallery', galleryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8080; // should be 5000 when local and 8080 for fly deployment

/** Listen * */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;