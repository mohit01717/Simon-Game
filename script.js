const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let gamePattern = [];
let userPattern = [];
function nextSequence() {
    userPattern=[];
  const randomNumber = Math.floor(Math.random() * 3);
  const randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  animation(randomChoosenColor);
  $("#level-title").text(`Level ${level}`);
  level++;
}

function animation(color) {
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function handlerFunction() {
  const user_Color = this.id;
  userPattern.push(user_Color);
  animation(user_Color);
  checkAnswer(userPattern.length - 1);
}
$(".btn").click(handlerFunction);

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
   $("body").css("backgroundColor", "red");
    $("h1").text("Game Over, Press Any Key to Restart");
    const audio = new Audio("./sounds/wrong.mp3")
    audio.play();
    setTimeout(()=>{
        $("body").css("backgroundColor", "#011F3F");
    },200)
   startOver()
  }
}

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function startOver(){
     level = 0;
     started = false;
     gamePattern = [];
}