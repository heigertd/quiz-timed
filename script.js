FIXME: //make start click not add a score
TODO: //add score to local Storage
TODO: //add score to high score list


var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score");
var questionEl = document.querySelector(".question");
var qAEl = document.querySelector(".question-answer")
var answerOneEl = document.querySelector(".answer-one");
var answerTwoEl = document.querySelector(".answer-two");
var answerThreeEl = document.querySelector(".answer-three");
var answerFourEl = document.querySelector(".answer-four");
var rightChoiceEl = document.querySelector(".right");


// timer start value
var timeLeft = 60;

// question objects
var questionOne = {
    question: "WHat is 2+2",
    wrongOne: "...",
    wrongTwo: "18",
    wrongThree: "fish",
    right: "4",
}

var questionTwo = {
    question: "If you jump down a hole will you hit the sides",
    wrongOne: "yes",
    wrongTwo: "no",
    wrongThree: "let me ask reddit real fast",
    right: "who's to say",
}

//question object array
var qArr = [questionOne, questionTwo]

//which object is shown
var i= 0;

//score value
var rightAnswers = 0;



//changes question when button is clicked and changes score
qAEl.addEventListener("click", function(){
    var x = event.target.className;
    if(event.target.matches("button")){
        if(x === "right"){
            rightAnswers++;
            scoreEl.textContent = "Score: " + rightAnswers;

            if (qArr[i] === undefined){
                questionEl.textContent = "Test is finished!"
                answerOneEl.innerHTML = ''
                answerTwoEl.innerHTML =''
                answerThreeEl.innerHTML =''
                answerFourEl.innerHTML =''
                
            }else{
                questionEl.textContent = qArr[i].question
                answerOneEl.innerHTML = "<button> A </button>" + ": " + qArr[i].wrongOne;
                answerTwoEl.innerHTML ="<button> B </button>" + ": " + qArr[i].wrongTwo;
                answerThreeEl.innerHTML ="<button> C </button>" + ": " + qArr[i].wrongThree;
                answerFourEl.innerHTML ='<button class="right"> D </button>' + ": " + qArr[i].right;

                x = ''
            }

        }else{

            if (qArr[i] === undefined){
                questionEl.textContent = "Test is finished!"
                answerOneEl.innerHTML = ''
                answerTwoEl.innerHTML =''
                answerThreeEl.innerHTML =''
                answerFourEl.innerHTML =''
                
            }else{
                questionEl.textContent = qArr[i].question
                answerOneEl.innerHTML = "<button> A </button>" + ": " + qArr[i].wrongOne;
                answerTwoEl.innerHTML ="<button> B </button>" + ": " + qArr[i].wrongTwo;
                answerThreeEl.innerHTML ="<button> C </button>" + ": " + qArr[i].wrongThree;
                answerFourEl.innerHTML ='<button class="right"> D </button>' + ": " + qArr[i].right; 

                timeLeft = timeLeft - 10;
            }
        }
        i++
    }
 
})


//timer count down
function timeRemaining (){
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Timer: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
        //   sendMessage();
        }
    
      }, 1000);
};

// function sendMessage (){
//     alert("time is up")
// };


timeRemaining();