var bodyEl = document.querySelector("body");
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
var submitEl = document.querySelector(".submit");
var nameEl = document.querySelector(".name");
var scoreSubmitEl = document.querySelector(".score-submit");
var placementEl = document.querySelector(".placement");

// question objects
var questionOne = {
    question: "What calls an id in CSS?",
    wrongOne: "...",
    wrongTwo: "who's to say",
    wrongThree: "fish",
    right: "#",
}

var questionTwo = {
    question: "Is an image tag self-closing?",
    wrongOne: "no",
    wrongTwo: "...",
    wrongThree: "let me ask reddit real fast",
    right: "yes",
}

var questionThree = {
    question: "What does ABC stand for?",
    wrongOne: "Alway Be Cramming",
    wrongTwo: "...",
    wrongThree: "American Bed Company",
    right: "Always Be Coding",
}

var questionFour = {
    question: "Did you name your debugging duck?",
    wrongOne: "No",
    wrongTwo: "...",
    wrongThree: "I never got a duck",
    right: "Yes",
}

var questionFive = {
    question: "Click the answer with the highest value",
    wrongOne: "1",
    wrongTwo: "...",
    wrongThree: "2",
    right: "3",
}

var questionSix = {
    question: "Click the answer with the lowest value",
    wrongOne: "3",
    wrongTwo: "1000",
    wrongThree: "2",
    right: "1",
}

var questionSeven = {
    question: "Is coding fun?",
    wrongOne: "No",
    wrongTwo: "eh, not for me",
    wrongThree: "Definitely not",
    right: "Yes",
}


// timer start value
var timeLeft = 59;

//question object array
var qArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven]

//which object is shown
var i = 0;

//score value
var rightAnswers = 0;

//high score array
var highScoreArr = [];
var nameArr = [];
var totalAnswerArr = [];
var anotherArray = [];

update();

//timer count down
function timeRemaining() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Timer: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Timer: " + 0
            scoreSubmitEl.removeAttribute("class")
            endTest();
        }
    }, 1000);
};

function update() {
    var x = JSON.parse(localStorage.getItem("score"));
    var m = JSON.parse(localStorage.getItem("name"));
    var q = JSON.parse(localStorage.getItem("totalA"));
    if (x !== null) {
        highScoreArr = x
    }
    if( m !== null){
        nameArr = m
    }
    if(q !== null){
        totalAnswerArr = q;
    }

    renderHighScore();
}

function renderHighScore() {
    highScoreEl.textContent = '';

    for (var i = 0; i < highScoreArr.length; i++) {
        var scoreStorage = highScoreArr[i];
        var nameStorage = nameArr[i];

        var li = document.createElement("li");
        li.textContent = `${nameStorage}: ${scoreStorage}`;

        highScoreEl.appendChild(li);
    }
}

function changeQuestion(){
    questionEl.textContent = qArr[i].question
    answerOneEl.innerHTML = "<button class='wrong btn btn-info'>" + qArr[i].wrongOne + "</button>"
    answerTwoEl.innerHTML = "<button class='wrong btn btn-info'>" + qArr[i].wrongTwo; + "</button>" 
    answerThreeEl.innerHTML = "<button class='wrong btn btn-info'>" + qArr[i].wrongThree; + "</button>" + qArr[i].wrongThree;
    answerFourEl.innerHTML = '<button class="right btn btn-info">' + qArr[i].right; + '</button>'
}

function endTest(){
    questionEl.textContent = "Test is complete! Please enter your name and submit your score"
    answerOneEl.innerHTML = ""
    answerTwoEl.innerHTML = ""
    answerThreeEl.innerHTML = ""
    answerFourEl.innerHTML = ""
}

function orderArray(array) {
    array.sort(function(a, b){return b - a})  
    return array
  }

submitEl.addEventListener("click", function reportScore(){
    highScoreArr.unshift(rightAnswers)
    totalAnswerArr.push(rightAnswers)
    var n = nameEl.value
    nameArr.unshift(n)
    var y = JSON.stringify(highScoreArr);
    var z = JSON.stringify(nameArr);
    var c = JSON.stringify(totalAnswerArr)
    localStorage.setItem("score", y);
    localStorage.setItem("name", z);
    localStorage.setItem("totalA", c);

    var q = JSON.parse(localStorage.getItem("totalA"));
    var w = orderArray(q);

    for(i=0; i<w.length; i++){
        if(w[i]===w[i-1]){
    
        }else{
            anotherArray.push(w[i]);
        }
    }

    // w.some(function(position, index, arr){
    //     anotherArray.push(position)
    //     return position === rightAnswers;
    // })

    placementEl.textContent = (`You are position ${anotherArray.indexOf(rightAnswers)+1} of ${highScoreArr.length} position(s)`);
    // placementEl.removeAttribute("class");


    
    renderHighScore();
})

//changes question when button is clicked and changes score
qAEl.addEventListener("click", function () {
    var result = event.target.className;
    if (event.target.matches("button")) {
        if (qArr[i] === undefined) { //when test is over
            if (result === "right btn btn-info") {
                bodyEl.setAttribute("class", "green")
                rightAnswers++
                scoreEl.textContent = "Score: " + rightAnswers;
            }else{
                bodyEl.setAttribute("class", "red")
            }
            //change hmtl to done screen
            endTest();
            scoreSubmitEl.removeAttribute("class")
            timeLeft = 0;

        } else if (result === 'wrong btn btn-info') {
            bodyEl.setAttribute("class", "red")
            changeQuestion();

            timeLeft = timeLeft - 10;

        } else if (result === "right btn btn-info") {
            rightAnswers++;
            scoreEl.textContent = "Score: " + rightAnswers;
            bodyEl.setAttribute("class", "green")

            changeQuestion();

            x = ''

        } else if(result === 'start btn btn-info') {
            timeRemaining();
            changeQuestion();
        }
        i++
    }

})