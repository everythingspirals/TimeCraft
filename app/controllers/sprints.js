'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Sprint = mongoose.model('Sprint'),
 _ = require('lodash');
 

/**
 * Find sprint by id
 */
 exports.sprint = function(req, res, next, id) {
    Sprint.load(id, function(err, sprint) {
        if (err) return next(err);
        if (!sprint) return next(new Error('Failed to load sprint ' + id));
        req.sprint = sprint;
        next();
    });
};


/**
 * Create a sprint
 */
 exports.create = function(req, res) {
    var sprint = new Sprint(req.body);

    sprint.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sprint: sprint
            });
        } else {
            res.jsonp(sprint);
        }
    });
};

/**
 * Update an sprint
 */
 exports.update = function(req, res) {
    var sprint = req.sprint;

    sprint = _.extend(sprint, req.body);

    sprint.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sprint: sprint
            });
        } else {
            res.jsonp(sprint);
        }
    });
};

/**
 * Delete an sprint
 */
 exports.destroy = function(req, res) {
    var sprint = req.sprint;

    sprint.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                sprint: sprint
            });
        } else {
            res.jsonp(sprint);
        }
    });
};

/**
 * Show a sprint
 */
 exports.show = function(req, res) {
    res.jsonp(req.sprint);
};

/**
 * List of sprints
 */
 exports.all = function(req, res) {
    Sprint.find().sort('name').populate('project', 'name').exec(function(err, sprints) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sprints);
        }
    });
};

/**
 * List of Issues by Sprint
 */
 exports.projects = function(req, res) {
    Sprint.find({
        project:mongoose.Types.ObjectId(req.query.projectId)
    }).sort('-startTime').populate('project', 'name').exec(function(err, sprints) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(sprints);
        }
    });
};