const models = require('../models');
const Promise = require('bluebird');
// const cookie = require('./cookieParser.js')

module.exports.createSession = (req, res, next) => {
  let userId;
  let username;
  res.cookies = {};
  res.cookies['shortlyid'] = { value: '' };

  if (JSON.stringify(req.cookies) === '{}') {
    // If no session exists, create a new session
    models.Sessions.create()
      .then(data => models.Sessions.get({ id: data.insertId }))
      .then(data => {
        req.session = { hash: data.hash };
        res.cookies['shortlyid'] = { value: data.hash };
        next();
      })
  } else {
    
    models.Sessions.get({ hash: req.cookies.shortlyid })
      // Find the UserID of the cookie
      .then(data => { if (data) { userId = data.userId } })
      .then(() => { 
        if (!userId) {
          req.session = { hash: req.cookies.shortlyid }
          next();
        } else { 
          // Set the username and ID of the session
          models.Users.get({ id: userId })
            .then(data => username = data.username)
            .then(() => {
              req.session = {};
              req.session.user = {};
              req.session.user.username = username;
              req.session.userId = userId;
              next();
            })
        }
      })
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

