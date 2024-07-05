
buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];
var started = false;
var level = 0;



$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level" + " " + level)
        nextSequence()
        started=true
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
  
    playSound(userChosenColour)
    animatePress(userChosenColour);
   
    checkAnswer(userClickedPattern.length - 1)
});
// Checks the answers [proper color buttons] 
// user has pressed.
function checkAnswer(lastColor) {
   // i.e. [recent color chosen]
    if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
  
    else {
        
        playSound("wrong")
       
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")
       
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
       
        startOver()
    }

}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + " " + level);
    let randomNumber = Math.floor((Math.random() * 3) + 1);

    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

function animatePress(currentColor) {

    $('#' + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
};
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }