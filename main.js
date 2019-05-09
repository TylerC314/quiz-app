const quiz = {
  numberCorrect: 0,
  currentQuestionIndex: 0,
  questionsAndAnswers: [
    new Question("What was Luke Skywalker's original last name?", "Cloudrunner", "Starstrider", "Skywalker", "Starkiller"),
    new Question("What is Luke's original home planet?", "Alderaan", "Kashyyyk", "Coruscant", "Tatooine")
  ]
};

function Question(question, answer1, answer2, answer3, correctAnswer) {
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.correctAnswer = correctAnswer;
}

function startQuiz() {
  //Begins the quiz when the user presses start
  $(".start-button").click(function () {
    $(".begin-quiz-box").toggleClass("hidden");
    displayQuestionAndAnswers();
  });
}

function displayQuestionBox() {
  //displays the question along with the 4 possible answers
  $(".question-box").on("submit", "#question-form", function (event) {
    event.preventDefault();
    answer = $("input[name=radio-answer]:checked").val();
    if (answer === quiz.questionsAndAnswers[quiz.currentQuestionIndex].correctAnswer) {
      $(".question-box").toggleClass("hidden");

      displayCorrectAnswer();
      
    }
    else {
      $(".question-box").toggleClass("hidden");
      displayIncorrectAnswer();
    }
  });
}

function displayQuestionAndAnswers() {
  $(".question-box").toggleClass("hidden");
  const questionOrder = Object.values(quiz.questionsAndAnswers[quiz.currentQuestionIndex]).splice(1, 4);
  shuffle(questionOrder);
  $(".question-box").append(`
    <p class="question">${quiz.questionsAndAnswers[quiz.currentQuestionIndex].question}</p>
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
    displayQuestionAndAnswers();
  });
}

function displayIncorrectAnswer() {
  //shows if the answer was incorrect
  $(".determine-answer-box").toggleClass("hidden");
  $(".determine-answer-box").append(`
    <p>Sorry the answer was ${quiz.questionsAndAnswers[quiz.currentQuestionIndex].correctAnswer}!</p>
            <label for="next-question-button">
                <button id="next-question-button">Next Question</button>
            </label>`);
  $("#next-question-button").click(function () {
    $(".determine-answer-box").html("");
    $(".determine-answer-box").toggleClass("hidden");
    updateScore(false)
    displayQuestionAndAnswers();
  });
}

function updateScore(result) {
  if (result === true) {
    quiz.currentQuestionIndex++;
    quiz.numberCorrect++;
    $(".question-number").html(quiz.currentQuestionIndex + 1);
    $(".questions-correct").html(quiz.numberCorrect);
    $(".question-box").html("");
  } else {
    quiz.currentQuestionIndex++;
    $(".question-number").html(quiz.currentQuestionIndex + 1);
    $(".questions-correct").html(quiz.numberCorrect);
    $(".question-box").html("");
  }
}

function displayResults() {
  //displays the final results of the quiz
  console.log("`displayResults` ran");
}

function handleQuestions() {
  startQuiz();
  displayQuestionBox();
  displayResults();
}

$(handleQuestions());