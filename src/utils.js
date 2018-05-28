var utils = {
  utf16to8: function(str) {
    var i, c;
    var out = "";
    var len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0000 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  },

  addCookies: function(cookies) {
    /* Parameters:
             *  (Object) cookies - either a map of cookie names
             *    to string values or to maps of cookie values.
             *
             * For example:
             * { "myCookie": "1234" }
             *
             * or:
             * { "myCookie": {
             *      "value": "1234",
             *      "domain": ".example.org",
             *      "path": "/",
             *      "expires": expirationDate
             *      }
             *  }
             *
             *  These values get passed to Strophe.Connection via
             *   options.cookies
             */
    var cookieName, cookieObj, isObj, cookieValue, expires, domain, path;
    for (cookieName in cookies || {}) {
      expires = "";
      domain = "";
      path = "";
      cookieObj = cookies[cookieName];
      isObj = typeof cookieObj === "object";
      cookieValue = escape(unescape(isObj ? cookieObj.value : cookieObj));
      if (isObj) {
        expires = cookieObj.expires ? ";expires=" + cookieObj.expires : "";
        domain = cookieObj.domain ? ";domain=" + cookieObj.domain : "";
        path = cookieObj.path ? ";path=" + cookieObj.path : "";
      }
      document.cookie =
        cookieName + "=" + cookieValue + expires + domain + path;
    }
  }
};
module.exports = utils;

// (function(root, factory) {
//   if (typeof define === "function" && define.amd) {
//     define([], function() {
//       return factory();
//     });
//   } else if (typeof exports === "object") {
//     module.exports = factory();
//   } else {
//     // Browser globals
//     root.stropheUtils = factory();
//   }
// })(this, function() {});
