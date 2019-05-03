const parseCookies = (req, res, next) => {
  req.cookies = {};
  let cookie = req.headers.cookie;
  if (cookie) {
    let strSpl = req.headers.cookie.split('; ')
    for (var i = 0; i < strSpl.length; i++) {
      let inside = strSpl[i].split('=');
      req.cookies[inside[0]] = inside[1];
    }
  }
  next();
};

module.exports = parseCookies;