// $(".word").click(function () {
//   $(this).toggleClass('redacted');
// });

var redactAudio = new Audio('scribble1.m4a');
var stampAudio = new Audio('stamp.m4a');

$(".startButton").click(function () {
  $(this).hide();
  $(".memoScreen").show();
  // $(".page").show();
});

$(".wordCanvas").click(function () {

  redactAudio.play();


  // As long as we're setting the canvas width/height to a percentage from css,
  // the canvas is stretched, which makes height/width less meaningful.
  // Hopefully won't be a problem for the simple animations we're doing, as long
  // as we just do everything relative to these constants:
  const height = $(this)[0].height;
  const width = $(this)[0].width;
  const ctx = $(this)[0].getContext("2d");

  const getRandomHeight = () => {
    return (.25 * height) + .5 * (Math.random() * height)
  };

  const strike = () => {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(0, getRandomHeight());
    ctx.lineTo(width, getRandomHeight());
    ctx.lineWidth = 40;
    ctx.stroke(); // Render the path
  };

  strike();
  strike();
  strike();
});

$(".memoScreen").click(function () {
  $(".memo").hide();
  $(".page").show();
});

function endGame() {
  $(".mainScreen").hide();
  $(".mainScreen").children().hide();
  $(".endScreen").show();
}

$(".endButton").click(endGame);

function stamp() {
  stampAudio.play();
  $(".stamp").show();
}

$(".stampButton").click(stamp);