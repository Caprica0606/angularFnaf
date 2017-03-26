var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

// Get data from local file
$http.get('js/quizData.json').success(function(data) {
   $scope.questions = data;
});

$scope.quizData = [];
$scope.submit = function(answerData) {
  // Tally the score
  var QPOINTS = 5;
  var total = 0;

  for (var i = 0; i < answerData.length; i++) {
    if (answerData[i].selectedAnswer == answerData[i].correctAnswer) {
      total += (QPOINTS * answerData[i].difficulty);
    }
  }
  alert('You scored ' + total + ' points!');
};

}]);
