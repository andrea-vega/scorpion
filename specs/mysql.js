'use strict';

var should = require('should');
var mysql = require('mysql');
var squel = require('squel');
var config = {
    host: 'alamance',
    port: 9306,
    user: 'root',
    password: 'entrinsikcrm',
    database: 'sugarcrm'
};

describe('MySQL Node client', function () {

    it('should connect to mysql', function (done) {
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err) throw err;
            rows[0].solution.should.be.exactly(2);
            connection.end();
            done();
        });
    });

    it('should retrieve mysql databases', function (done) {
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SHOW DATABASES', function (err, rows, fields) {
            if (err) throw err;
            rows.should.have.length(7);
            rows[4].Database.should.be.exactly('sugarcrm');
            connection.end();
            done();
        });
    });


    it('should retrieve mysql tables on a database', function (done) {
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SHOW TABLES FROM sugarcrm', function (err, rows, fields) {
            if (err) throw err;
            rows[0].Tables_in_sugarcrm.should.be.exactly('accounts');
            connection.end();
            done();
        });
    });

    it('should retrieve mysql columns on a table', function (done) {
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SHOW COLUMNS FROM accounts', function (err, rows, fields) {
            if (err) throw err;
            var column = rows[0];
            column.should.have.property('Field');
            column.Field.should.be.exactly('id');
            column.should.have.property('Type');
            column.Type.should.be.exactly('char(36)');
            column.should.have.property('Key');
            column.Key.should.be.exactly('PRI');
            connection.end();
            done();
        });
    });

    it('should provide relational information', function (done) {
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM information_schema.TABLE_CONSTRAINTS ' +
            'WHERE information_schema.TABLE_CONSTRAINTS.CONSTRAINT_TYPE = \'FOREIGN KEY\'' +
            'AND information_schema.TABLE_CONSTRAINTS.TABLE_SCHEMA = \'sugarcrm\';', function (err, rows, fields) {
                if (err) throw err;
                connection.end();
                done();
            }

        )
        ;
    });

    it('should execute squel generated sql', function (done) {
        var sql = squel.select().from("accounts").field("name").field("billing_address_city").toString();
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err;
            rows[0].should.have.property('name');
            rows[0].should.have.property('billing_address_city');
            rows[0].name.should.be.exactly('Pullman Cart ');
            connection.end();
            done();
        });
    });
})
;