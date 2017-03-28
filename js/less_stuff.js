// App:  Starter App
var app = angular.module('StarterApp', ['ngMaterial']);
// controller: AppCtrl
app.controller('AppCtrl', ['$scope', '$timerCount', '$http', '$mdSidenav', function($scope, $timerCount, $http, $mdSidenav){

$scope.timerCount=3;

// Countdown Timers
var _startCountdown = function(){
	var timerCount = 3;

	var countDown = function () {
		if (timerCount < 0) {
		  //Any desired function upon countdown end.
		  //window.location.href='gameOver.html';
      window.alert("timer over");
		} else {
		  $scope.countDownLeft = timerCount;
		  timerCount--;
      window.alert("timercount is "+ timerCount);
		  $timeout(countDown, 1000);
		}
	};
	$scope.countDownLeft = timerCount;
	countDown();
}

}]);
