'use strict';

// sprints routes use sprints controller
var sprints = require('../controllers/sprints');
var authorization = require('./middlewares/authorization');

// sprint authorization helpers
var hasAuthorization = function(req, res, next) {
	// if (req.sprint.user.id !== req.user.id) {
 //        return res.send(401, 'User is not authorized');
 //    }
    next();
};

module.exports = function(app) {

    app.get('/sprints', sprints.all);
    app.post('/sprints', authorization.requiresLogin, sprints.create);
    app.get('/sprints/:sprintId', sprints.show);
    app.put('/sprints/:sprintId', authorization.requiresLogin, hasAuthorization, sprints.update);
    app.del('/sprints/:sprintId', authorization.requiresLogin, hasAuthorization, sprints.destroy);

    // Finish with setting up the sprintId param
    app.param('sprintId', sprints.sprint);

};