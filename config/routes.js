var async = require('async');

module.exports = function(app) {

    //Home route
    var index = require('../app/controllers/index');

    // Datasources
    var datasources = require('../app/controllers/datasources');

    app.get('/', index.render);

    app.get('/datasources', datasources.list);
    app.post('/datasources', datasources.save);
};