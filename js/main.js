var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

// Get data from local file
$http.get('js/quizData.json').success(function(data) {

  // Initialize code
  $scope.currentLevel = 1;
  $scope.grandTotal = 0;

  $scope.quizData = [];

  $scope.usedQuestionsD1 = [];
  $scope.usedQuestionsD2 = [];
  $scope.usedQuestionsD3 = [];

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

  // Calling questions for the level
  $scope.currentQuestions = $scope.getQuestionsForLevel($scope.currentLevel);
});

//Level Question function
$scope.getQuestionsForLevel = function(level) {

  var QUESTIONS_PER_LEVEL = 3;

  var probability = $scope.calculateProbability(level);

  var countD1 = $scope.questionsD1.length;
  var countD2 = $scope.questionsD2.length;
  var countD3 = $scope.questionsD3.length;

  var questions;
  var usedQuestions;

  var toReturn = [];

  // randomize questions
  for (var i = 0; i < QUESTIONS_PER_LEVEL; i++) {

    var rand = Math.random();

    if (rand < probability.d3) {
      questions = $scope.questionsD3;
      usedQuestions = $scope.usedQuestionsD3;
    }
    else if (rand < probability.d2 + probability.d3) {
      questions = $scope.questionsD2;
      usedQuestions = $scope.usedQuestionsD2;
    }
    else {
      questions = $scope.questionsD1;
      usedQuestions = $scope.usedQuestionsD1;
    }

    // Check if we've used all the questions in current difficulty
    if (questions.length - usedQuestions.length == 0) {
      // If there are not enough questions, then empty used questions array
      usedQuestions = [];
    }

    var index = Math.floor(Math.random() * questions.length);
    while (usedQuestions.indexOf(index) != -1) {
      index = Math.floor(Math.random() * questions.length);
    }
    usedQuestions.push(index);

    toReturn.push(questions[index]);
  }

  return toReturn;
}

$scope.calculateProbability = function(level) {

  var D1_INITIAL_VALUE = 0.85;
  var D2_INITIAL_VALUE = 0.10;
  var D3_INITIAL_VALUE = 0.05;

  var D1_DELTA = -.03;
  var D2_DELTA = .02;
  var D3_DELTA = .01;

  var probability = {
    d1: D1_INITIAL_VALUE + (level * D1_DELTA),
    d2: D2_INITIAL_VALUE + (level * D2_DELTA),
    d3: D3_INITIAL_VALUE + (level * D3_DELTA)
  };

  return probability;
};

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
