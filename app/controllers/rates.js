'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Rate = mongoose.model('Rate'),
 _ = require('lodash');
 

/**
 * Find rate by id
 */
 exports.rate = function(req, res, next, id) {
    Rate.load(id, function(err, rate) {
        if (err) return next(err);
        if (!rate) return next(new Error('Failed to load rate ' + id));
        req.rate = rate;
        next();
    });
};


/**
 * Create a rate
 */
 exports.create = function(req, res) {
    var rate = new Rate(req.body);
    rate.user = req.user;

    rate.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rate: rate
            });
        } else {
            res.jsonp(rate);
        }
    });
};

/**
 * Update an rate
 */
 exports.update = function(req, res) {
    var rate = req.rate;

    rate = _.extend(rate, req.body);

    rate.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rate: rate
            });
        } else {
            res.jsonp(rate);
        }
    });
};

/**
 * Delete an rate
 */
 exports.destroy = function(req, res) {
    var rate = req.rate;

    rate.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rate: rate
            });
        } else {
            res.jsonp(rate);
        }
    });
};

/**
 * Show a rate
 */
 exports.show = function(req, res) {
    res.jsonp(req.rate);
};

/**
 * List of rates
 */
 exports.all = function(req, res) {
    Rate.find().sort('startDate').populate('user', 'name username').populate('client', 'name').exec(function(err, rates) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rates);
        }
    });
};

/**
 * Retrieve Most Recent Rate by Client
 */
 exports.current = function(req, res) {
    Rate.find({
        client: mongoose.Types.ObjectId(req.query.clientId)
    }).sort('-startDate').populate('user', 'name username').populate('client','name').limit(1).exec(function(err, rates) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rates);
        }
    });
};

/**
 * List of Rates by Client
 */
 exports.client = function(req, res) {
    Rate.find({
        client: mongoose.Types.ObjectId(req.query.clientId)
    }).sort('-startDate').populate('user', 'name username').populate('client','name').exec(function(err, rates) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rates);
        }
    });
};