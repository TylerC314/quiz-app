let currentQuiz = new Quiz();

function Quiz() {
  this.numberCorrect = 0;
  this.currentQuestionIndex = 0;
  this.questionsAndAnswers = [
    new Question("What was Luke Skywalker's original last name?", "Cloudrunner", "Starstrider", "Skywalker", "Starkiller"),
    new Question("What is Luke's original home planet?", "Alderaan", "Kashyyyk", "Coruscant", "Tatooine"),
    new Question("Who is Han Solo's faithful companion?", "Jar Jar Binks", "Luke Skywalker", "Obi-Wan Kenobi", "Chewbacca"),
    new Question("What is Darth Vader's real name?", "Mace Windu", "Qui-gon Jinn", "Sheev Palpatine", "Anakin Skywalker"),
    new Question("What type of spaceship did Luke Skywalker fly throughout the original trilogy?", "A-Wing", "Y-Wing", "Millenium Falcon", "X-Wing"),
  ];
  this.questionOrder = this.questionsAndAnswers.slice();
  shuffle(this.questionOrder);
}

function Question(question, answer1, answer2, answer3, correctAnswer) {
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.correctAnswer = correctAnswer;
}

function startQuizListener() {
  $(".start-button").click(function () {
    $(".progress-box").toggleClass("hidden");
    $(".begin-quiz-box").toggleClass("hidden");
    displayQuestionAndAnswers();
  });
}

function submitAnswerListener() {
  //displays the question along with the 4 possible answers
  $(".question-box").on("submit", "#question-form", function (event) {
    event.preventDefault();
    answer = $("input[name=radio-answer]:checked").val();
    console.log(currentQuiz.currentQuestionIndex);
    if (answer === currentQuiz.questionOrder[currentQuiz.currentQuestionIndex].correctAnswer) {
      $(".question-box").toggleClass("hidden");
      displayCorrectAnswer();
    }
    else {
      $(".question-box").toggleClass("hidden");
      displayIncorrectAnswer();
    }
  });
}

function startQuiz() {
  //Begins the quiz
  currentQuiz = new Quiz();
  displayScore();
  $(".begin-quiz-box").toggleClass("hidden");
}

function displayQuestionAndAnswers() {
  $(".question-box").toggleClass("hidden");
  const answerOrder = Object.values(currentQuiz.questionOrder[currentQuiz.currentQuestionIndex]).splice(1, 4);
  shuffle(answerOrder);
  $(".question-box").append(`
    <p class="question">${currentQuiz.questionOrder[currentQuiz.currentQuestionIndex].question}</p>
            <form id="question-form">
                <label for="answer1">
                    <input type="radio" id="answer1" name="radio-answer" value="${answerOrder[0]}">
                    <span class="radio-button"></span>
                    <span class="answer1">${answerOrder[0]}</span>
                </label>
                <label for="answer2">
                    <input type="radio" id="answer2" name="radio-answer" value="${answerOrder[1]}">
                    <span class="answer2">${answerOrder[1]}</span>
                </label>
                <label for="answer3">
                    <input type="radio" id="answer3" name="radio-answer" value="${answerOrder[2]}">
                    <span class="answer3">${answerOrder[2]}</span>
                </label>
                <label for="answer4">
                    <input type="radio" id="answer4" name="radio-answer" value="${answerOrder[3]}">
                    <span class="answer4">${answerOrder[3]}</span>
                </label>
                <input type="submit" class="submit-button" value="Choose">
            </form>`);
}

function swap(array, index) {
  let temp = array[index];
  const rand = Math.floor(Math.random() * array.length);
  array[index] = array[rand];
  array[rand] = temp;
}

function shuffle(array) {
  array.forEach(function (element, index) {
    swap(array, index);
  });
}

function displayCorrectAnswer() {
  //shows if the answer was correct
  let buttonName = "";
  if(currentQuiz.currentQuestionIndex + 1 === currentQuiz.questionOrder.length){
    buttonName = "Finish Quiz!";
  }
  else{
    buttonName = "NextQuestion";
  }
  $(".determine-answer-box").toggleClass("hidden");
  $(".determine-answer-box").append(`
    <p>Correct!</p>
            <label for="next-question-button">
                <button id="next-question-button">${buttonName}</button>
            </label>`);
  updateScore(true);
  $("#next-question-button").click(function () {
    $(".determine-answer-box").html("");
    $(".determine-answer-box").toggleClass("hidden");
    ++currentQuiz.currentQuestionIndex;
    if (currentQuiz.currentQuestionIndex === currentQuiz.questionOrder.length) {
      displayResults();
    } else {
      displayScore();
      displayQuestionAndAnswers();
    }
  });
}

function displayIncorrectAnswer() {
  //shows if the answer was incorrect
  let buttonName = "";
  if(currentQuiz.currentQuestionIndex + 1 >= currentQuiz.questionOrder.length){
    buttonName = "Finish Quiz!";
  }
  else{
    buttonName = "Next Question";
  }
  $(".determine-answer-box").toggleClass("hidden");
  $(".determine-answer-box").append(`
    <p>Sorry the answer was ${currentQuiz.questionOrder[currentQuiz.currentQuestionIndex].correctAnswer}!</p>
            <label for="next-question-button">
                <button id="next-question-button">${buttonName}</button>
            </label>`);
  updateScore(false);
  $("#next-question-button").click(function () {
    $(".determine-answer-box").html("");
    $(".determine-answer-box").toggleClass("hidden");
    ++currentQuiz.currentQuestionIndex;
    if (currentQuiz.currentQuestionIndex === currentQuiz.questionOrder.length) {
      displayResults();
    } else {
      displayScore();
      displayQuestionAndAnswers();
    }
  });
}

function displayScore() {
  $(".progress-box").html("");
  $(".progress-box").append(`
    <p>Question Number ${currentQuiz.currentQuestionIndex + 1} / ${currentQuiz.questionOrder.length}</p>
    <p>Number Correct: ${currentQuiz.numberCorrect}`);
}

function updateScore(result) {
  if (result === true) {
    ++currentQuiz.numberCorrect;
    displayScore();
    $(".question-box").html("");
  } else {
    displayScore();
    $(".question-box").html("");
  }
}

function displayResults() {
  //displays the final results of the quiz
  $(".progress-box").toggleClass("hidden");
  $(".score-screen").html("");
  $(".score-screen").toggleClass("hidden");
  $(".score-screen").append(`
  <p>You got ${currentQuiz.numberCorrect} out of ${currentQuiz.questionOrder.length} correct!</p>
  <button class="new-quiz-button">Play Again?</button>`);
  $(".new-quiz-button").click(function () {
    $(".score-screen").toggleClass("hidden");
    startQuiz();
  });
}

function handleQuestions() {
  startQuiz();
  startQuizListener();
  submitAnswerListener();
  console.log(currentQuiz.questionOrder[0].question);
}

$(handleQuestions());