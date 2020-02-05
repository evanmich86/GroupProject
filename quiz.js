const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreDiv");

//creating questions
let questions = [
  {
    question: "What is the Strategy Pattern?",
    imgSrc: 
    choiceA: "Wrong",
    choiceB: "Wrong",
    choiceC: "Right",
    choiceD: "Wrong",
    correct: "C"
  }, {
    question: "What is the Singleton Pattern?",
    imgSrc: "",
    choiceA: "Right",
    choiceB: "Wrong",
    choiceC: "Wrong",
    choiceD: "Wrong",
    correct: "A"
  }, {
    question: "",
    imgSrc: "",
    choiceA: "Wrong",
    choiceB: "Wrong",
    choiceC: "Wrong",
    choiceD: "Right",
    correct: "D"
  }
];

const lastQuestion = question.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
function renderQuestion() {
  let q = question[runningQuestion];
  
  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + question.imgSrc + ">";
  choiceA.innerHTML = question.choiceA;
  choiceB.innerHTML = question.choiceB;
  choiceC.innerHTML = question.choiceC;
  choiceD.innerHTML = quesiton.choiceD;
}

start.addEventListener("click", startQuiz);

//starting quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); //1000ms = 1000ms
}

//render progress
function renderProgress() {
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id ="+ qIndex +"></div>";
  }
}

//counter render
function renderCounter() {
  if(count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  }
  else {
    count = 0;
    //change progress color to red
    answerIsWrong();
    if(runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    }
    else {
      //end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

//check answer
function checkAnswer() {
  if(answer == question[runningQuestion].correct) {
    //answer is correct
    score++;
    //change progress color to green
    answerIsCorrect();
  }
  else {
    //answer is wrong
    //change progress color to red
    answerIsWrong();
  }
  count = 0;
  if(runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  }
  else {
    //end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

//answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//answer is wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render
function scoreRender() {
  scoreDiv.style.display = "block";
  
  //calculate the amount of question percent answered by the user
  const scorePercent = Math.round(100 * score / question.length);
  let img = (scorePercent >= 80 ? "img/5.png" :
            (scorePercent >= 60 ? "img/4.png"):
            (scorePercent >= 40 ? "img/3.png"):
            (scorePercent >= 20 ? "img/2.png"):
            "img/1.png";
            
  scoreDiv.innerHTML = "<img src="+ img +">";
  scoreDiv.innerHTML += "<p>"+ scorePercent + "%</p>";
}