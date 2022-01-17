
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

//You'll need a way to keep track of whether if the game has started or not,
//so you only call nextSequence() on the first keypress.
var started = false;
//. Create a new variable called level and start at level 0.
var level = 0;


$(document).keypress(function(){
   if(!started){
  $("#level-title").text("Level" + level);
  nextSequence();
  started =true;
}
});

//To store the id of the button that got clicked.
$(".btn").click(function(){
var userChosenColour= $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

if(userClickedPattern.length===gamePattern.length)
  {
  setTimeout(function(){nextSequence();},1000);
}}
else{
  console.log("wrong");


  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function(){  $("body").removeClass("game-over");}, 200);

startOver();
}
}


function nextSequence()
{ userClickedPattern=[];
  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

 var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//To play the sound whenever a butoon is clicked
function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}
//To change the colour of the button
function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");}, 100);
}


function startOver(){
  level =0;
  started=false;
  gamePattern=[];
}
