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
        question: "What does HTML stand for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hyperlinks and Text Markup Language",
        choice3: "Home Tool Markup Language",
        choice4: "None of the above",
        answer: 1
    },
    {
        question: "What is the correct sequence of HTML tags for starting a webpage?",
        choice1: "Head, Title, HTML",
        choice2: "Title, Head, HTML",
        choice3: "HTML, Head, Title",
        choice4: "Doctype, Head, Title",
        answer: 3
    },{
        question: "Choose the correct HTML tag for the largest heading.",
        choice1: "heading",
        choice2: "h1",
        choice3: "head",
        choice4: "h6",
        answer: 2
    },{
        question: "What is the correct HTML tag for inserting a line break?",
        choice1: "br",
        choice2: "break",
        choice3: "linebreak",
        choice4: "lb",
        answer: 1
    },{
        question: "Which of the following is the correct HTML tag to make text bold?",
        choice1: "bold",
        choice2: "b",
        choice3: "bld",
        choice4: "BOLD",
        answer: 2
    },{
        question: "Which of the following is the correct HTML tag to make the text italic?",
        choice1: "it",
        choice2: "italic",
        choice3: "i",
        choice4: "None of the above",
        answer: 3
    },{
        question: "How can you make a list that lists the items with numbers?",
        choice1: "list",
        choice2: "dl",
        choice3: "ul",
        choice4: "ol",
        answer: 4
    },{
        question: "How can you make a list that lists the items with bullet points?",
        choice1: "dl",
        choice2: "ol",
        choice3: "ul",
        choice4: "list",
        answer: 3
    },{
        question: "Who is making the web standards?",
        choice1: "The World Wide Web Consortium",
        choice2: "Microsoft",
        choice3: "Mozilla",
        choice4: "Google",
        answer: 1
    },{
        question: "HTML tags are used to describe document:",
        choice1: "Definition",
        choice2: "Library",
        choice3: "Content",
        choice4: "Files",
        answer: 3
    }

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

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("hyperTextEnd.html");
    }
    questionCounter++;
    //increment question counter
    progressText.innerText = "Question: " + questionCounter + "/" + MAX_QUESTIONS;
    //update progess bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            //add to score if answer is correct
            if(classToApply == "correct"){
                incrementScore(CORRECT_BONUS);
            } 
        //displaying correct or incorrect answer colors
        selectedChoice.parentElement.classList.add(classToApply);
        //1 second timeout
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();