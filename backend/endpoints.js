var _rand = function(items) {
  return items[ Math.floor(Math.random() * items.length) ];
};

var _randBool = function() {
  return _rand([true, false]);
};

module.exports = function(app) {

  app
    .all('/api/v1/test/form', function(req, res) {

      res.status(200).json({
        'valid' : true,
        'message' : 'form processed'
      });
    })

    .all('/api/v1/test/simple', function(req, res) {

      res.status(200).json({
        'valid' : true
      });
    })

    .all('/api/v1/test/list', function(req, res) {

      res.status(200).json({
        'valid' : true
      });
    })

    .all('/api/v1/test/upload', function(req, res) {

      res.status(200).json({
        'valid' : true
      });
    })

    .all('/api/v1/test/error', function(req, res) {

      res.status(400).json({
        'invalid' : true
      });
    })
  ;
};
