(function() {
  "use strict";
  /*jshint es5: true */

  var
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    fs = require('fs'),
    isStatic = /(vendor|locale|assets|images|partials|bower_components)/,
    app = express();




  app
    .set('port', 3000 )
    .use('/vendor', express.static(__dirname     +   '/vendor') )
    .use('/release', express.static(__dirname   +   '/release') )
    .use('/sample', express.static(__dirname   +   '/sample') )
    .use( bodyParser.json() )
    .use( bodyParser.urlencoded( {extended: true} ) );

  require('./backend/endpoints')(app);

  app
    .get('*', function( request, response ) {

    if(isStatic.test(request.originalUrl) && !fs.existsSync(request.originalUrl)) {
      return response.status(404).end(null);
    }

    return response.sendFile(
      'index.html', { root: __dirname }
    );
  });


  var
    serverPort = app.get('port'),
    server = app.listen(serverPort, function() {
      console.info('Code-Y.ajax, SERVER listening on port:',  serverPort);
    });
})();
