'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Paycheck = mongoose.model('Paycheck'),
 _ = require('lodash');
 

/**
 * Find paycheck by id
 */
 exports.paycheck = function(req, res, next, id) {
    Paycheck.load(id, function(err, paycheck) {
        if (err) return next(err);
        if (!paycheck) return next(new Error('Failed to load paycheck ' + id));
        req.paycheck = paycheck;
        next();
    });
};


/**
 * Create a paycheck
 */
 exports.create = function(req, res) {
    var paycheck = new Paycheck(req.body);

    paycheck.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                paycheck: paycheck
            });
        } else {
            res.jsonp(paycheck);
        }
    });
};

/**
 * Update an paycheck
 */
 exports.update = function(req, res) {
    var paycheck = req.paycheck;

    paycheck = _.extend(paycheck, req.body);

    paycheck.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                paycheck: paycheck
            });
        } else {
            res.jsonp(paycheck);
        }
    });
};

/**
 * Delete an paycheck
 */
 exports.destroy = function(req, res) {
    var paycheck = req.paycheck;

    paycheck.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                paycheck: paycheck
            });
        } else {
            res.jsonp(paycheck);
        }
    });
};

/**
 * Show a paycheck
 */
 exports.show = function(req, res) {
    res.jsonp(req.paycheck);
};

/**
 * List of paychecks
 */
 exports.all = function(req, res) {
    Paycheck.find().sort('name').populate('project', 'name').exec(function(err, paychecks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(paychecks);
        }
    });
};

/**
 * List of Paychecks by Date Range
 */
 exports.findByRange = function(req, res) {
    Paycheck.find({
        checkDate: {$gte: req.query.startDate, $lt: req.query.endDate}
    }).sort('-checkDate').populate('user', 'name username').populate('rate','rate').exec(function(err, paychecks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(paychecks);
        }
    });
};