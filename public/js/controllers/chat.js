'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', 'Global', 'socket', function ($scope, Global, socket) {
   

   //---------------------------------
    //Variables
    //---------------------------------
    $scope.global = Global;
    $scope.toggle = false;
    $scope.messages = [];
    $scope.message = {};


   //---------------------------------
    //Function
    //---------------------------------
 $scope.sendMessage = function () {
    $scope.message.user = $scope.global.user;
    $scope.message.date = new Date();

    socket.emit('send:message', {message: $scope.message});

    // add the message to our model locally
    $scope.messages.push(
      $scope.message
    );

    // clear message box
    $scope.message = {};
  };


    //---------------------------------
    //Listeners
    //---------------------------------
  $scope.$watch('messages.length', function() {
    if($scope.messages.length){
    document.title = "TimeCraft - New Message";
     var chat = document.getElementsByClassName('chat-output')[0];
     console.log(chat.scrollTop);
     console.log(chat.scrollHeight);
     chat.scrollTop = chat.scrollHeight;
    console.log(chat.scrollTop);
    $scope.toggle = true;
}
   });

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