TODO: //save initials and have quiz stop when timer is 0

var timerEl = document.querySelector(".timer");
var scoreEl = document.querySelector(".score");
var questionEl = document.querySelector(".question");
var qAEl = document.querySelector(".question-answer")
var answerOneEl = document.querySelector(".answer-one");
var answerTwoEl = document.querySelector(".answer-two");
var answerThreeEl = document.querySelector(".answer-three");
var answerFourEl = document.querySelector(".answer-four");
var rightChoiceEl = document.querySelector(".right");
var highScoreEl = document.querySelector(".high-score");


// timer start value
var timeLeft = 59;

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
var i = 0;

//score value
var rightAnswers = 0;

//high score array
var highScoreArr = [];


update();

function update() {
    var x = JSON.parse(localStorage.getItem("score"));
    if (x !== null) {
        highScoreArr = x
    }

    renderHighScore();
}

function renderHighScore() {
    highScoreEl.textContent = '';

    for (var i = 0; i < highScoreArr.length; i++) {
        var todo = highScoreArr[i];

        var li = document.createElement("li");
        li.textContent = todo;

        highScoreEl.appendChild(li);
    }
}

//changes question when button is clicked and changes score
qAEl.addEventListener("click", function () {
    var result = event.target.className;
    if (event.target.matches("button")) {
        if (qArr[i] === undefined) {
            if (result === "right") {
                rightAnswers++
                scoreEl.textContent = "Score: " + rightAnswers;
            }

            questionEl.textContent = "test is done"
            answerOneEl.innerHTML = ""
            answerTwoEl.innerHTML = ""
            answerThreeEl.innerHTML = ""
            answerFourEl.innerHTML = ""
            highScoreArr.push(rightAnswers)
            var y = JSON.stringify(highScoreArr);
            localStorage.setItem("score", y);
            renderHighScore();



        } else if (result === 'wrong') {
            questionEl.textContent = qArr[i].question
            answerOneEl.innerHTML = "<button class='wrong'> A </button>" + ": " + qArr[i].wrongOne;
            answerTwoEl.innerHTML = "<button class='wrong'> B </button>" + ": " + qArr[i].wrongTwo;
            answerThreeEl.innerHTML = "<button class='wrong'> C </button>" + ": " + qArr[i].wrongThree;
            answerFourEl.innerHTML = '<button class="right"> D </button>' + ": " + qArr[i].right;

            timeLeft = timeLeft - 10;

        } else if (result === "right") {
            rightAnswers++;
            scoreEl.textContent = "Score: " + rightAnswers;

            questionEl.textContent = qArr[i].question
            answerOneEl.innerHTML = "<button class='wrong'> A </button>" + ": " + qArr[i].wrongOne;
            answerTwoEl.innerHTML = "<button class='wrong'> B </button>" + ": " + qArr[i].wrongTwo;
            answerThreeEl.innerHTML = "<button class='wrong'> C </button>" + ": " + qArr[i].wrongThree;
            answerFourEl.innerHTML = '<button class="right"> D </button>' + ": " + qArr[i].right;

            x = ''


        } else {
            questionEl.textContent = qArr[i].question
            answerOneEl.innerHTML = "<button class='wrong'> A </button>" + ": " + qArr[i].wrongOne;
            answerTwoEl.innerHTML = "<button class='wrong'> B </button>" + ": " + qArr[i].wrongTwo;
            answerThreeEl.innerHTML = "<button class='wrong'> C </button>" + ": " + qArr[i].wrongThree;
            answerFourEl.innerHTML = '<button class="right"> D </button>' + ": " + qArr[i].right;
        }
        i++
    }

})



//timer count down
function timeRemaining() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Timer: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeLeft = ''
            //   sendMessage();
        }

    }, 1000);
};

// function sendMessage (){
//     alert("time is up")
// };


timeRemaining();