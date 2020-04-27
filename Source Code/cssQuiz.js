const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Creating question objects
let questions = [
  {
    question:
      "What property do you use to create spacing between HTML elements?",
    choice1: "Margin",
    choice2: "Spacing",
    choice3: "Padding",
    choice4: "Border",
    answer: 1,
  },
  {
    question:
      "For users that use the tab key to navigate websites, what property shows moving from one element to another using this behavior?",
    choice1: "a:link",
    choice2: "a:active",
    choice3: "a:focus",
    choice4: "a:visted",
    answer: 3,
  },
  {
    question: "What is the property used to set the class’s text color?",
    choice1: "text-color",
    choice2: "text:color",
    choice3: "color",
    choice4: "font-color",
    answer: 3,
  },
  {
    question: "The acronym CSS stands for what?",
    choice1: "Cascading Style Sheets",
    choice2: "Carrot Sytem Style",
    choice3: "Correlated Styling System",
    choice4: "Canvas Styling System",
    answer: 1,
  },
  {
    question:
      "What property would you use to change the list style to show roman numerals instead of normal numbers?",
    choice1: "list-style-type:upper-roman;",
    choice2: "list-type:roman;",
    choice3: "list-bullet-type:roman-numerals;",
    choice4: "list-style:roman;",
    answer: 1,
  },
  {
    question:
      "What property would you use to create space between the element’s border and inner content?",
    choice1: "margin",
    choice2: "spacing",
    choice3: "padding",
    choice4: "border",
    answer: 3,
  },
  {
    question: "In what way can you NOT reference CSS?",
    choice1: "Inline Styling",
    choice2: "Internal Style Sheet",
    choice3: "External Style Sheet",
    choice4: "All three are correct",
    answer: 4,
  },
  {
    question:
      "To reference a style sheet across multiple HTML pages, how would you define your CSS?",
    choice1: "Inline Style",
    choice2: "Internal Style Sheet",
    choice3: "External Style Sheet",
    choice4: "CSS is meant for only one page",
    answer: 3,
  },
  {
    question:
      "If you wanted to put an HTML element at a certain position on the page regardless of the other elements, what value would you give the position property?",
    choice1: "static",
    choice2: "fixed",
    choice3: "absolute",
    choice4: "relative",
    answer: 3,
  },
  {
    question:
      "How would you style table rows to have alternating background colors?",
    choice1: "tr:even{background-color:#CCC;}",
    choice2: "td:even{background-color:#CCC;}",
    choice3: "td:nth-child(even){background-color:#CCC;}",
    choice4: "tr:nth-child(even){background-color:#CCC;}",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  //increment question counter
  progressText.innerText = "Question: " + questionCounter + "/" + MAX_QUESTIONS;
  //update progess bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    //add to score if answer is correct
    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }
    //displaying correct or incorrect answer colors
    selectedChoice.parentElement.classList.add(classToApply);
    //1 second timeout
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
