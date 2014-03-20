'use strict';

angular.module('mean', [
	//Official
	'ngCookies', 
	'ngResource', 
	'ui.router', 
	'mean.system', 
	'mean.socket',
	'mean.chat',
	'mean.timelogs',
	'mean.sprints',
	'mean.issues',
	'mean.projects',
	'mean.clients',
	'mean.users',
	'mean.directives',

	//Third-Party
	'mgcrea.ngStrap',
	'btford.socket-io',
	'textAngular'
]);

angular.module('mean.system', []);
angular.module('mean.socket', []);
angular.module('mean.chat', []);
angular.module('mean.timelogs', []);
angular.module('mean.sprints', []);
angular.module('mean.issues', []);
angular.module('mean.projects', []);
angular.module('mean.clients', []);
angular.module('mean.users', []);
angular.module('mean.directives', []);