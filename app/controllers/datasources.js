'use strict';

var hal = require('hal');

var Neo4j = require('node-neo4j');

var db = new Neo4j('http://localhost:7474');

var squel = require('squel');

var query = squel.select().from('students').field('name').field('address');

function toHal(datasource) {
    return new hal.Resource(datasource, '/datasources/'+datasource._id);
}

exports.list = function(req, res) {
    db.readNodesWithLabel('Datasource', function (err, nodes) {
        var resource = new hal.Resource({count: nodes.length}, '/datasources');

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            resource.embed('item', toHal(node));
        }

        res.set('Content-Type', 'application/json');
        res.send(resource.toJSON());
    });
};

exports.lookup = function(req, res) {
    db.readNode(req.params.id, function(err, node) {
        res.send(toHal(node));
    });
};

exports.save = function(req, res) {
    var datasource = req.body;

    db.insertNode(datasource, 'Datasource', function (err, node) {
        res.send(toHal(node));
    });
};