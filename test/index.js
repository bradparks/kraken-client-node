/** Taking https://github.com/mateodelnorte/coinbase/blob/master/test/nonce.js
 * as an example.
 */


'use strict';
var log = require('debug')('kraken-client:test'),
    util = require('util');
require('should');

var KrakenClient = require('../index');

var krakenclient = new KrakenClient();
describe('kraken.getTime', function () {
    it('should return todays time', function (done) {
        krakenclient.getTime(function (err, data) {
            if (err) return done(err);
            log('data: ' + util.inspect(data, null, 5));
            var krakenToday = (new Date(data*1000)).getDay();
            var ourToday = (new Date()).getDay();
            krakenToday.should.equal(ourToday);
            done();
        });
    });
});


//These tests requires user auth! We check whether they have been set before we do any tests.

if (!process.env.KRAKEN_API_KEY) throw new Error('You must specify a KRAKEN_API_KEY environment variable to run tests');
if (!process.env.KRAKEN_API_SECRET) throw new Error('You must specify a KRAKEN_API_SECRET environment variable to run tests');

krakenclient = new KrakenClient(process.env.KRAKEN_API_KEY, process.env.KRAKEN_API_SECRET);

describe('kraken.getBalance', function () {
    it('should return users balance', function (done) {
        krakenclient.getBalance("ZEUR", function (err, data) {
            if (err) return done(err);
            log('data: ' + util.inspect(data, null, 5));
            data.should.be.instanceOf(Number);
            done();
        });
    });
});


describe('kraken.getTradesHistory', function () {
    it('should return an array of historic trades', function (done) {
        krakenclient.getTradesHistory(function (err, data) {
            if (err) return done(err);
            log('data: ' + util.inspect(data, null, 5));
            data.should.be.instanceOf(Array);
            done();
        });
    });
});


describe('kraken.getLedgerHistory', function () {
    it('should return an array of historic ledger entries', function (done) {
        krakenclient.getLedgerHistory(function (err, data) {
            if (err) return done(err);
            log('data: ' + util.inspect(data, null, 5));
            data.should.be.instanceOf(Array);
            done();
        });
    });
});