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
        question: "Which of the following is a false statement in python?",
        choice1: "int(144)==144",
        choice2: "int('144')==144",
        choice3: "int(144.0)==144",
        choice4: "None of the above",
        answer: 4
    },
    {
        question: "How can we generate random numbers in python using methods?",
        choice1: "random.uniform()",
        choice2: "random.randint()",
        choice3: "random.random()",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Which method is used to convert raw byte data to a string?",
        choice1: "Encode()",
        choice2: "Decode()",
        choice3: "Convert",
        choice4: "toString()",
        answer: 2
    },
    {
        question: "Which of the following is used to create an event loop?",
        choice1: "Window.eventloop()",
        choice2: "Window.mainloop()",
        choice3: "Window.loop()",
        choice4: "Eventloop.window()",
        answer: 2
    },
    {
        question: "Which of the following data types is not supported in python?",
        choice1: "Tuple",
        choice2: "Dictionary",
        choice3: "Generics",
        choice4: "List",
        answer: 3
    },
    {
        question: "Which of the following functions convert a String to a set in python?",
        choice1: "set(x)",
        choice2: "dict(d)",
        choice3: "frozenset(s)",
        choice4: "chr(x)",
        answer: 1
    },
    {
        question: "Which of the following operators in python performs exponential (power) calculation on operands?",
        choice1: "**",
        choice2: "//",
        choice3: "!",
        choice4: "||",
        answer: 1
    },
    {
        question: "Which of the following functions converts a string to all uppercase?",
        choice1: "upper()",
        choice2: "capslock()",
        choice3: "swapcase()",
        choice4: "title()",
        answer: 1
    },
    {
        question: "What is the output of L[2] if L = [1,2,3]?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which of the following functions inserts an object at a given index in a list?",
        choice1: "list.index(obj)",
        choice2: "list.insert(index, obj)",
        choice3: "list.pop(obj=list[-1])",
        choice4: "list.remove(obj)",
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
        return window.location.assign("endPython.html");
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