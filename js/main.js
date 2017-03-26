var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

// Get data from local file
$http.get('js/quizData.json').success(function(data) {
   $scope.questions = data;

   $scope.currentQuestions = $scope.getQuestionsForNextLevel(1);
});

$scope.getQuestionsForNextLevel = function(level) {

  var count = $scope.questions.length;
  var q1 = Math.floor(Math.random() * count);
  var q2 = Math.floor(Math.random() * count);
  var q3 = Math.floor(Math.random() * count);

  return [
    $scope.questions[q1],
    $scope.questions[q2],
    $scope.questions[q3]
  ];
}

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
  $scope.currentQuestions = getQuestionsForNextLevel(1);
};

}]);
