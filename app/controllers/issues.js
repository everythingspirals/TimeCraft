'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Issue = mongoose.model('Issue'),
 _ = require('lodash');


/**
 * Find issue by id
 */
 exports.issue = function(req, res, next, id) {
    Issue.load(id, function(err, issue) {
        if (err) return next(err);
        if (!issue) return next(new Error('Failed to load issue ' + id));
        req.issue = issue;
        next();
    });
};


/**
 * Create an issue
 */
 exports.create = function(req, res) {
    var issue = new Issue(req.body);
    issue.createdBy = req.user;

    issue.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err,
                issue: issue
            });
        } else {
            res.jsonp(issue);
        }
    });
};

/**
 * Update an issue
 */
 exports.update = function(req, res) {
    var issue = req.issue;

    issue = _.extend(issue, req.body);

    issue.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err,
                issue: issue
            });
        } else {
            res.jsonp(issue);
        }
    });
};

/**
 * Delete an issue
 */
 exports.destroy = function(req, res) {
    var issue = req.issue;

    issue.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err,
                issue: issue
            });
        } else {
            res.jsonp(issue);
        }
    });
};

/**
 * Show an issue
 */
 exports.show = function(req, res) {
    res.jsonp(req.issue);
};

/**
 * List of Issues
 */
 exports.all = function(req, res) {
    Issue.find().sort('created')
    .populate('user', 'name username')
    .populate('status', 'name')
    .populate('project', 'name')
    .populate('sprint', 'name')
    .exec(function(err, issues) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(issues);
        }
    });
};

/**
 * List of Issues
 */
 exports.sprint = function(req, res) {
    Issue.find({
        sprint:mongoose.Types.ObjectId(req.query.sprintId)
    }).sort('created')
    .populate('user', 'name username')
    .populate('status', 'name')
    .populate('project', 'name')
    .populate('sprint', 'name')
    .exec(function(err, issues) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(issues);
        }
    });
};

exports.user = function(req, res) {
    Issue.find({
        assignedTo:mongoose.Types.ObjectId(req.query.userId)
    }).sort('created')
    .populate('user')
    .populate('status')
    .populate('project')
    .populate('sprint')
    .exec(function(err, issues) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(issues);
        }
    });
};

exports.related = function(req, res) {
    Issue.find({
        $or: [
            {"assignedTo":mongoose.Types.ObjectId(req.query.userId)},
            {"createdBy":mongoose.Types.ObjectId(req.query.userId)}
        ]
    }).sort('created')
    .populate('createdBy', 'name username')
     .populate('assignedTo', 'name username')
    .populate('status', 'name')
    .populate('project', 'name')
    .populate('sprint', 'name')
    .exec(function(err, issues) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(issues);
        }
    });
};

