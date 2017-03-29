// App:  Starter App
var app = angular.module('StarterApp', ['ngMaterial']);
// controller: AppCtrl
app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {

    $mdSidenav(menuId).toggle();
  };
  //**** Countdown Timer ****//
var TIME_CONST = 60;
$scope.timerFuction = function(seconds){

    $scope.time = seconds;

     $scope.timer = setInterval(function(){
        $scope.tick($scope.time);
        $scope.$apply();
        console.log($scope.time);
    }, 1000);

    $scope.tick = function(seconds) {
    if (seconds == 0) {
      window.location.href='gameOver.html';
    }
    else {
    $scope.time--;
    }
    };

};
$scope.timerFuction(TIME_CONST);
// Get data from local file
$http.get('js/quizData.json').success(function(data) {

  // Initialize code
  //Timer
  // Countdown Timer Variables
  //var  $scope.timeInSecs;
  //var $scope.ticker;
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
  // Switch statements for difficulty arrays
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

// Function to calculate probability of each difficulty level
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
/*********************LEVEL QUESTIONS FUNCTION*********************
                     (function of the level)*/
$scope.getQuestionsForLevel = function(level) {
  // Initalize QUESTIONS_PER_LEVEL: 3
  var QUESTIONS_PER_LEVEL = 3;
  /* Probility is calculated by calling the calculateProbability function
     and passing in the level number*/
  var probability = $scope.calculateProbability(level);
  // Variables to count the questions in each difficulty
  var countD1 = $scope.questionsD1.length;
  var countD2 = $scope.questionsD2.length;
  var countD3 = $scope.questionsD3.length;
  // Declare questions and usedQuestions
  var questions;
  var usedQuestions;
  // toReturn is an array (initialize empty)
  var toReturn = [];
  // randomize questions (in a loop that runs for each question in the level)
  for (var i = 0; i < QUESTIONS_PER_LEVEL; i++) {
    // rand equals a random number between 0 and 1
    var rand = Math.random();
    // If rand < the probiltiy of d3, question will come from d3 array
    if (rand < probability.d3) {
      questions = $scope.questionsD3;
      // and the usedQuestion will go into the usedQuestionsD3 array
      usedQuestions = $scope.usedQuestionsD3;
    }
    /* If rand < (the combined probabilities of d2 and d3),
       the question will come from quesstionsD2 array */
    else if (rand < probability.d2 + probability.d3) {
      questions = $scope.questionsD2;
      // and the usedQuestion will go into the usedQuestionsD2 array
      usedQuestions = $scope.usedQuestionsD2;
    }
    // Otherwise use a question from questionsD1 array
    else {
      questions = $scope.questionsD1;
      // and the usedQuestion will go into the usedQuestionsD1 array
      usedQuestions = $scope.usedQuestionsD1;
    }

    // Check if we've used all the questions in current difficulty
    if (questions.length - usedQuestions.length == 0) {
      // If there are no more new questions, then empty used questions array
      usedQuestions = [];
    }
              /*****Randomize Questions*****
      (Math.floor rounds to the nearest whole number)
      (random number between 0 and 1)* the number of questions,
      then rounded to the nearest whole number to get a random question index */
    var index = Math.floor(Math.random() * questions.length);
    // While the question is not in usedQuestion array
    while (usedQuestions.indexOf(index) != -1) {
      index = Math.floor(Math.random() * questions.length);
    }
    // Add the used question to usedQuestion array
    usedQuestions.push(index);
   // Add the randomly selected question to toReturn
    toReturn.push(questions[index]);
  }
  // Return the questions
  return toReturn;
}


/***********STUFF THAT HAPPENS WHEN THE USER CLICKS THE SUBMIT BUTTON***********
                          (function of answerData)*/
$scope.submit = function(answerData) {
  // CALCULATE LEVEL SCORE
  var QPOINTS = 5;
  var levelTotal = 0;

 // For the length of answerData array
  for (var i = 0; i < answerData.length; i++) {
    // If the selected answer is correct
    if (answerData[i].selectedAnswer == answerData[i].correctAnswer) {
      // Add (QPOINTS * difficulty) to levelTotal
      levelTotal += (QPOINTS * answerData[i].difficulty);
    }
  }

  // Show alert Box displaying level's score
  alert('You scored ' + levelTotal + ' points!');
  // currentLevel will go up by 1
  $scope.currentLevel += 1;
  // Tally grandTotal (accumulation of levelTotals)
  $scope.grandTotal += levelTotal;

  /*****Reset the timer with the appropriate level time*****/
  //var CYLON_TIME = 50;
  //var levelTime = Math.floor(CYLON_TIME - ((CYLON_TIME * $scope.currentLevel)/($scope.currentLevel+CYLON_TIME)));
  clearInterval($scope.timer);
  $scope.timerFuction(TIME_CONST);


  // quizData is an array
  $scope.quizData = [];
  // newQuestions come from the getQuestionsForLevel function
  var newQuestions = $scope.getQuestionsForLevel($scope.currentLevel);
  // $scope.currentQuestions equals newQuestions
  $scope.currentQuestions = newQuestions;
};

}]);
