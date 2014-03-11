'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Timelog = mongoose.model('Timelog'),
 _ = require('lodash');


/**
 * Find timelog by id
 */
 exports.timelog = function(req, res, next, id) {
    Timelog.load(id, function(err, timelog) {
        if (err) return next(err);
        if (!timelog) return next(new Error('Failed to load timelog ' + id));
        req.timelog = timelog;
        next();
    });
};


/**
 * Create a timelog
 */
 exports.create = function(req, res) {
    var timelog = new Timelog(req.body);  
    timelog.user = req.user;

    timelog.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                timelog: timelog
            });
        } else {
            res.jsonp(timelog);
        }
    });
};

/**
 * Update an timelog
 */
 exports.update = function(req, res) {
    var timelog = req.timelog;

    timelog = _.extend(timelog, req.body);

    timelog.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                timelog: timelog
            });
        } else {
            res.jsonp(timelog);
        }
    });
};

/**
 * Delete an timelog
 */
 exports.destroy = function(req, res) {
    var timelog = req.timelog;

    timelog.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                timelog: timelog
            });
        } else {
            res.jsonp(timelog);
        }
    });
};

/**
 * Show an timelog
 */
 exports.show = function(req, res) {
    res.jsonp(req.timelog);
};

/**
 * List of Timelogs
 */
 exports.all = function(req, res) {
    Timelog.find().sort('-startTime').populate('user', 'name username').populate('issue','name').exec(function(err, timelogs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(timelogs);
        }
    });
};
