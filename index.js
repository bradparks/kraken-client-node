var KrakenAPI = require('kraken-api');
var _ = require('underscore');

function KrakenClient(key, secret) {
    if (!(this instanceof KrakenClient)) {
        return new KrakenClient(key, secret);
    }
    this.key = key;
    this.secret = secret;
    this.krakenapi = new KrakenAPI(key, secret);
    return this;
}

KrakenClient.prototype._checkCredentials = function() {
    if ((! this.key) || (! this.secret)) {
        return new Error('KrakenClient: Credentials not set!');
    };
};

KrakenClient.prototype.getTime = function(callback) {
    this.krakenapi.api('Time', null, function(err, result) {
            if (err) return callback(err);
            callback(null, result.result.unixtime);
    });
};

KrakenClient.prototype.getBalance = function(currency, callback) {
    var credentialsError = this._checkCredentials();
    if (credentialsError) {
        return callback(credentialsError);
    }
    this.krakenapi.api('Balance', null, function (err, result) {
        if (err) return callback(err);
        result = result.result;
        if (result[currency]) {
            return callback(null, parseFloat(result[currency]));
        }
        return callback(null, 0);
    });
};

KrakenClient.prototype.getTrades = function(callback) {
    var credentialsError = this._checkCredentials();
    if (credentialsError) {
        return callback(credentialsError);
    }
    this.krakenapi.api('TradesHistory', null, function (err, result) {
        if (err) return callback(err);
        result = result.result.trades;
        trades = [];
        _.mapObject(result, function(val, key) {
            val.tradeid = key;
          trades.push(val);
        });
        return callback(null, trades);
    });
};


module.exports = KrakenClient;