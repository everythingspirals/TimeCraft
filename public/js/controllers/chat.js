'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', '$stateParams', '$location', 'Global', 'socket', function ($scope, $stateParams, $location, Global, Clients) {
   

   //---------------------------------
    //Variables
    //---------------------------------
    $scope.toggle = false;
    $scope.messages = [];
    $scope.message = {};


   //---------------------------------
    //Function
    //---------------------------------
 $scope.sendMessage = function () {
    socket.emit('send:message', {
      message: $scope.message
    });

    // add the message to our model locally
    $scope.messages.push({
      text: $scope.message
    });

    // clear message box
    $scope.message = {};
  };
}

    //---------------------------------
    //Listeners
    //---------------------------------

  socket.on('init', function (data) {
    console.log("Chat Initialized");
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

socket.on('user:join', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

socket.on('user:left', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.users.length; i++) {
      user = $scope.users[i];
      if (user === data.name) {
        $scope.users.splice(i, 1);
        break;
      }
    }
  });

}]);