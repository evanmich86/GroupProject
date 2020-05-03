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
        question: "Which package is automatically available to all Java programs?",
        choice1: "java.basic",
        choice2: "java.text",
        choice3: "java.lang",
        choice4: "java.util",
        answer: 3
    },
    {
        question: "Which of the following can you not assign to a numeric variable?",
        choice1: "another numeric variable",
        choice2: "a numeric literal",
        choice3: "null",
        choice4: "an arithmetic expression",
        answer: 3
    },
    {
        question: "Which of the following is a valid class name?",
        choice1: "CustomerMaintApp",
        choice2: "Numeric#Validator",
        choice3: "2004YearEndApp",
        choice4: "Customer-Maintenance",
        answer: 1
    },
    {
        question: "Which of the following is a reserved word in Java?",
        choice1: "if",
        choice2: "for",
        choice3: "while",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Which of the following identifiers follows the Java convention for a variable name?",
        choice1: "MaxHeight",
        choice2: "maxHeight",
        choice3: "MAX_HEIGHT",
        choice4: "Max_Height",
        answer: 2
    },
    {
        question: "Which of the following is a correct print statement in Java?",
        choice1: "System.out.print()",
        choice2: "System.out.println()",
        choice3: "System.out.printf()",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Leaving off a semi-colon at the end of a println statement is an example of what kind of error?",
        choice1: "Runtime",
        choice2: "Logic",
        choice3: "Syntax",
        choice4: "All of the above",
        answer: 3
    },
    {
        question: "Computing an incorrect result is an example of what kind of error?",
        choice1: "Logic",
        choice2: "Runtime",
        choice3: "Syntax",
        choice4: "Production",
        answer: 1
    },
    {
        question: "Which of the following is true about a method's local data?",
        choice1: "It must be passed in as a parameter",
        choice2: "It ceases to exist when the method returns",
        choice3: "Its must match the method's return type",
        choice4: "It cannot be used in an assignment statement",
        answer: 2
    },
    {
        question: "If a method doesn't return a value, what should its return type be?",
        choice1: "null",
        choice2: "void",
        choice3: "this",
        choice4: "there should be no return type",
        answer: 2
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