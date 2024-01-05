var gamePattern = [];

var buttonColours = ["red", "blue" , "green" , "yellow"];

var userClickedPattern = [];

var level = 0

// Checking if its on start page for it to trigger the start when pressing a key
$(document).on('keydown', function (){
    if (level=== 0)     {
        nextSequence();
    }
})


//Next sequence fucnction for the next level
function nextSequence (){

    userClickedPattern = [];


    level++;
    $('h1').text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);         // Random number
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor)

    // var audio = new Audio("sounds/"+ randomChosenColor+ ".mp3");
    // audio.play();

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){   /*To log results  console.log(gamePattern); console.log(userClickedPattern);  console.log("success"); */ 
                                                                                 
                                                           
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        
    }
    else{
        // If player loses 

        playSound("wrong");
        $('body').addClass('game-over');
        $('h1').text("GAME OVER, Press Any Key to Restart")
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }

}
  
// Getting the user click and adding to the user array pattern
$(".btn").on('click', function (){

        var userChosenColor = $(this).attr('id');

        userClickedPattern.push(userChosenColor);
        
        // console.log(userClickedPattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1); // for the index number []

    })



// Sound function
function playSound (name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

// Button animation function
function animatePress(currentColor){

        $('#' + currentColor).addClass('pressed');

        setTimeout( function() {
            $('#' + currentColor).removeClass('pressed');
        }, 100);

}

function startOver (){
    level = 0;
    gamePattern= [];

}





