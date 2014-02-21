var async = require('async');

module.exports = function(app) {

    //Home route
    var index = require('../app/controllers/index');

    // Datasources
    var datasources = require('../app/controllers/datasources');

    // Data Flows
    var flows = require('../app/controllers/flows');

    // SQL
    var sql = require('../app/controllers/sql');

    app.get('/', index.render);

    app.get('/datasources', datasources.list);
    app.post('/datasources', datasources.save);
    app.get('/datasources/:id', datasources.lookup);

    app.post('/flow', flows.load);

    app.post('/sql', sql.run)
};