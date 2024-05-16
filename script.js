const questions=[
    {
        question:"What is 2+2?",
        answers:[
            {text:"3", correct:false},
            {text:"0", correct:false},
            {text:"5", correct:false},
            {text:"4", correct:true},
        ]
    },{ 
        question:"What is 10-3?",
        answers:[
            {text:"3", correct:false},
            {text:"7", correct:true},
            {text:"5", correct:false},
            {text:"4", correct:false},
    ]},{ 
        question:"What is 2*2?",
        answers:[
            {text:"3", correct:false},
            {text:"0", correct:false},
            {text:"5", correct:false},
            {text:"4", correct:true},
    ]},{ 
        question:"What is 2+8?",
        answers:[
            {text:"3", correct:false},
            {text:"0", correct:false},
            {text:"10", correct:true},
            {text:"4", correct:false},
    ]}
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const scor =document.getElementById("scor");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    scor.textContent = 0;
    document.querySelector("#puncte").style.display = "block";
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        scor.innerHTML=score;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    document.querySelector("#puncte").style.display = "none";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML= "Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


