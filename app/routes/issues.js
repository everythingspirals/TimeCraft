'use strict';

// issues routes use issues controller
var issues = require('../controllers/issues');
var authorization = require('./middlewares/authorization');

// issue authorization helpers
var hasAuthorization = function(req, res, next) {
	// if (req.issue.user.id !== req.user.id) {
 //        return res.send(401, 'User is not authorized');
 //    }
    next();
};

module.exports = function(app) {

    app.get('/issues', issues.all);
    app.get('/issues/sprint', issues.sprint);
    app.get('/issues/getByUser', issues.getByUser);
    app.post('/issues', authorization.requiresLogin, issues.create);
    app.get('/issues/:issueId', issues.show);
    app.put('/issues/:issueId', authorization.requiresLogin, hasAuthorization, issues.update);
    app.del('/issues/:issueId', authorization.requiresLogin, hasAuthorization, issues.destroy);

    // Finish with setting up the issueId param
    app.param('issueId', issues.issue);

};