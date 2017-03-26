var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

// Get data from local file
$http.get('js/quizData.json').success(function(data) {

  // Store qustions into arrays specific to each difficulty
  $scope.questionsD1 = [];
  $scope.questionsD2 = [];
  $scope.questionsD3 = [];

  for (var i = 0; i < data.length; i++) {
    var q = data[i];
    switch (q.difficulty)
    {
      case 1:
        $scope.questionsD1.push(q);
        break;
      case 2:
        $scope.questionsD2.push(q);
        break;
      case 3:
        $scope.questionsD3.push(q);
        break;
      default:
        // shouldn't hit this part since difficulty is only 1-3 for now
        break;
    }
  }

  $scope.currentLevel = 1;
  $scope.grandTotal = 0;

  // Calling questions for the level
  $scope.currentQuestions = $scope.getQuestionsForLevel($scope.currentLevel);
});

//Level Question function
$scope.getQuestionsForLevel = function(level) {


  var countD1 = $scope.questionsD1.length;
  var countD2 = $scope.questionsD2.length;
  var countD3 = $scope.questionsD3.length;

  var questions;

  if (level < 10) {
    questions = $scope.questionsD1;
  }
  else if (level < 20) {
    questions = $scope.questionsD2;
  }
  else {
    questions = $scope.questionsD3;
  }

  //randomize 3 questions
  var q1 = Math.floor(Math.random() * questions.length);
  var q2 = Math.floor(Math.random() * questions.length);
  while (q2 == q1) {
    q2 = Math.floor(Math.random() * questions.length);
  }
  var q3 = Math.floor(Math.random() * questions.length);
  while (q3 == q1 || q3 == q2) {
    q3 = Math.floor(Math.random() * questions.length);
  }

  return [
    questions[q1],
    questions[q2],
    questions[q3]
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

  $scope.currentLevel += 1;
  $scope.grandTotal += total;

  $scope.quizData = [];
  var newQuestions = $scope.getQuestionsForLevel($scope.currentLevel);
  $scope.currentQuestions = newQuestions;

};

}]);
