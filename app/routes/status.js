'use strict';

// status routes use status controller
var status = require('../controllers/status');
var authorization = require('./middlewares/authorization');

// status authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.status.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/status', status.all);
    app.post('/status', authorization.requiresLogin, status.create);
    app.get('/status/:statusId', status.show);
    app.put('/status/:statusId', authorization.requiresLogin, hasAuthorization, status.update);
    app.del('/status/:statusId', authorization.requiresLogin, hasAuthorization, status.destroy);

    // Finish with setting up the statusId param
    app.param('statusId', status.status);

};