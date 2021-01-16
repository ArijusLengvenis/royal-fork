const users = require('../json/Users');

exports.findById = function(id, cb) {
    process.nextTick(function() {
      var idx = id - 1;
      if (users[idx]) {
        cb(null, users[idx]);
      } else {
        cb(new Error('User ' + id + ' does not exist'));
      }
    });
  }
  
  exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
      for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
          return cb(null, user);
        }
      }
      return cb(null, null);
    });
  }