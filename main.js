const quiz = {
    numberCorrect: 0,
    questionsAndAnswers: [
      {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: ""
      },
    ]
  };

  const question = {
      question: "What is your name?",
      answer1: "Tim",
      answer2: "Jeff",
      answer3: "Phillip",
      correctAnswer: "Tyler"
  }
  
  function startQuiz() {
    //Begins the quiz when the user presses start
    console.log("`startQuiz` ran");
    $(".start-button").click(function() {
        $(".begin-quiz-box").toggleClass("hidden");
        $(".question-box").toggleClass("hidden");
    });
  }
  
  function displayQuestion() {
    //displays the question along with the 4 possible answers
    console.log("`displayQuestion` ran");
    $(".question-box").on("submit", "#question-form", function(event) {
        event.preventDefault();
    });
  }
  
  function determineAnswer() {
    //shows if the previous answer was correct or not
    console.log("`determineAnswer` ran");
  }
  
  function updateScore() {
    //updates the score of the quiz
    console.log("`updateScore` ran");
  }
  
  function displayResults() {
    //displays the final results of the quiz
    console.log("`displayResults` ran");
  }
  
  function handleQuestions() {
    startQuiz();
    displayQuestion();
    determineAnswer();
    updateScore();
    displayResults();
    arr = [question.answer1, question.answer2, question.answer3, question.correctAnswer];
    console.log(arr[3] === question.answer1);
  }
  
  $(handleQuestions());