// App:  Starter App
var app = angular.module('StarterApp', ['ngMaterial']);
// controller: AppCtrl
app.controller('AppCtrl', ['$scope', '$timerCount', '$http', '$mdSidenav', function($scope, $timerCount, $http, $mdSidenav){

	function countController($scope){
	    $scope.time = 10;
	    var timer = setInterval(function(){
	        $scope.time--;
	        $scope.$apply();
	        console.log($scope.time);
	    }, 1000);
	}

	$scope.startTimer = function(seconds){
  var ticker;
  $scope.time = parseInt(seconds)-1;
  ticker = setInterval($scope.tick(),1000);
  };

  $scope.tick = function() {
  var seconds = $scope.time;
  if (seconds == 0) {
    window.location.href='gameOver.html';
  }
  else {
  $scope.time--;
  }
};
  $scope.startTimer(60);

}]);

TIME_CONST = 60;
var timeSquared = Math.pow(TIME_CONST,2);
var doubleTime = $scope.currentLevel * 2;
var levelTime = Math.floor((timeSquared)/(doubleTime+TIME_CONST));
clearInterval($scope.timer);
$scope.timerFuction(levelTime);
