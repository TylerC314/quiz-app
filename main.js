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
    if (answer === currentQuiz.questionsAndAnswers[currentQuiz.currentQuestionIndex].correctAnswer) {
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
  const questionOrder = Object.values(currentQuiz.questionsAndAnswers[currentQuiz.currentQuestionIndex]).splice(1, 4);
  shuffle(questionOrder);
  $(".question-box").append(`
    <p class="question">${currentQuiz.questionsAndAnswers[currentQuiz.currentQuestionIndex].question}</p>
            <form id="question-form">
                <label for="answer-button">
                    <input type="radio" name="radio-answer" value="${questionOrder[0]}">
                    <span class="answer1">${questionOrder[0]}</span>
                </label>
                <label for="answer-button">
                    <input type="radio" name="radio-answer" value="${questionOrder[1]}">
                    <span class="answer2">${questionOrder[1]}</span>
                </label>
                <label for="answer-button">
                    <input type="radio" name="radio-answer" value="${questionOrder[2]}">
                    <span class="answer3">${questionOrder[2]}</span>
                </label>
                <label for="answer-button">
                    <input type="radio" name="radio-answer" value="${questionOrder[3]}">
                    <span class="answer4">${questionOrder[3]}</span>
                </label>
                <input type="submit" class="submit-button" value="Answer">
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
  $(".determine-answer-box").toggleClass("hidden");
  $(".determine-answer-box").append(`
    <p>Correct!</p>
            <label for="next-question-button">
                <button id="next-question-button">Next Question</button>
            </label>`);
  $("#next-question-button").click(function () {
    $(".determine-answer-box").html("");
    $(".determine-answer-box").toggleClass("hidden");
    updateScore(true);
    if (currentQuiz.currentQuestionIndex === currentQuiz.questionsAndAnswers.length) {
      displayResults();
    } else {
      displayQuestionAndAnswers();
    }

  });
}

function displayIncorrectAnswer() {
  //shows if the answer was incorrect
  $(".determine-answer-box").toggleClass("hidden");
  $(".determine-answer-box").append(`
    <p>Sorry the answer was ${currentQuiz.questionsAndAnswers[currentQuiz.currentQuestionIndex].correctAnswer}!</p>
            <label for="next-question-button">
                <button id="next-question-button">Next Question</button>
            </label>`);
  $("#next-question-button").click(function () {
    $(".determine-answer-box").html("");
    $(".determine-answer-box").toggleClass("hidden");
    updateScore(false)
    if (currentQuiz.currentQuestionIndex === currentQuiz.questionsAndAnswers.length) {
      displayResults();
    } else {
      displayQuestionAndAnswers();
    }
  });
}

function displayScore() {
  // $(".question-number").html(currentQuiz.currentQuestionIndex + 1);
  // $(".questions-correct").html(currentQuiz.numberCorrect);
  $(".progress-box").html("");
  $(".progress-box").append(`
    <p>Question Number ${currentQuiz.currentQuestionIndex + 1} / ${currentQuiz.questionsAndAnswers.length}</p>
    <p>Number Correct: <span class="questions-correct">0</span></p>`);
}

function updateScore(result) {
  if (result === true) {
    currentQuiz.currentQuestionIndex++;
    currentQuiz.numberCorrect++;
    displayScore();
    $(".question-box").html("");
  } else {
    currentQuiz.currentQuestionIndex++;
    displayScore();
    $(".question-box").html("");
  }
}

function displayResults() {
  //displays the final results of the quiz
  $(".score-screen").toggleClass("hidden");
  $(".score-screen").append(`
  <p>You got ${currentQuiz.numberCorrect} out of ${currentQuiz.questionsAndAnswers.length} correct!</p>
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
}

$(handleQuestions());