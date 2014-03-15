'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
    Status = mongoose.model('Status'),
    _ = require('lodash');
 

/**
 * Find status by id
 */
exports.status = function(req, res, next, id) {
    Status.load(id, function(err, status) {
        if (err) return next(err);
        if (!status) return next(new Error('Failed to load status ' + id));
        req.status = status;
        next();
    });
};


/**
 * Create a status
 */
exports.create = function(req, res) {
    var status = new Status(req.body);
    status.createdBy = req.user;

    status.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                status: status
            });
        } else {
            res.jsonp(status);
        }
    });
};

/**
 * Update an status
 */
exports.update = function(req, res) {
    var status = req.status;

    status = _.extend(status, req.body);

    status.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                status: status
            });
        } else {
            res.jsonp(status);
        }
    });
};

/**
 * Delete an status
 */
exports.destroy = function(req, res) {
    var status = req.status;

    status.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                status: status
            });
        } else {
            res.jsonp(status);
        }
    });
};

/**
 * Show an status
 */
exports.show = function(req, res) {
    res.jsonp(req.status);
};

/**
 * List of Status
 */
exports.all = function(req, res) {
    Status.find().sort('-startTime').populate('user', 'name username').populate('issue','name').exec(function(err, status) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(status);
        }
    });
};
