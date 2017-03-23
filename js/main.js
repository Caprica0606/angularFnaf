var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.questions = [{
    label: 'Who has killed the most people?',
    correctAnswer: 1,
    answers: [
      { label: 'Freddy', value: 1 },
      { label: 'Bonnie', value: 2 },
      { label: 'Chica', value: 3 },
      { label: 'Bonbon', value: 4 }
    ]
  },
  {
    label: 'Who is the bestest?',
    correctAnswer: 3,
    answers: [
      { label: 'Freddy', value: 1 },
      { label: 'Bonnie', value: 2 },
      { label: 'Chica', value: 3 },
      { label: 'Bonbon', value: 4 }
    ]
  },
  {
    label: 'Who sucks?',
    correctAnswer: 4,
    answers: [
      { label: 'Freddy', value: 1 },
      { label: 'Bonnie', value: 2 },
      { label: 'Chica', value: 3 },
      { label: 'Bonbon', value: 4 }
    ]
  }
];

$scope.quizData = [];
$scope.submit = function(answerData) {
  // Tally the score
  var QPOINTS = 5;
  var total = 0;

  for (var i = 0; i < answerData.length; i++) {
    if (answerData[i].selectedAnswer == answerData[i].correctAnswer) {
      total += QPOINTS;
    }
  }
  alert('You scored ' + total + ' points!');
};

}]);
