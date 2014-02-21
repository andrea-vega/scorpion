'use strict';

var noflo = require('noflo');

exports.load = function (req, res) {
    var flow = req.body;
    noflo.graph.loadJSON(flow, function (graph) {
        noflo.createNetwork(graph, function (network) {
            res.send("Graph loaded. ");
        });
    });
}
