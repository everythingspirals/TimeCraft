'use strict';

// timelogs routes use timelogs controller
var timelogs = require('../controllers/timelogs');
var authorization = require('./middlewares/authorization');

// timelog authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.timelog.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/timelogs', timelogs.all);
    app.post('/timelogs', authorization.requiresLogin, timelogs.create);
    app.get('/timelogs/:timelogId', timelogs.show);
    app.put('/timelogs/:timelogId', authorization.requiresLogin, hasAuthorization, timelogs.update);
    app.del('/timelogs/:timelogId', authorization.requiresLogin, hasAuthorization, timelogs.destroy);

    // Finish with setting up the timelogId param
    app.param('timelogId', timelogs.timelog);

};