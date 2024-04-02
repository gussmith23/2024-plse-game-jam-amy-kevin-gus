// $(".word").click(function () {
//   $(this).toggleClass('redacted');
// });

var redactAudio = new Audio('scribble1.m4a');
var stampAudio = new Audio('stamp.m4a');
var currentCompleted = true;

var progression = {
  "soviet": "hardware",
  "hardware": "website",
  "website": "dolphin",
}

for (const [start, end] of Object.entries(progression)) {
  $(`#${start}`).click(function () {
    if ($(".stamp").css('display') != 'none') {
      $(this).hide();
      $(".stamp").hide();
      $(`#${end}`).show();
    }
  })
}

$(".startButton").click(function () {
  $(this).hide();
  $(".memoScreen").show();
  // $(".page").show();
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


function makeRedactable(element) {

  function wrapInRedactableSpan(text) {
    if (text === "<br>") {
      return "<br>";
    }
    return "<span class='word'><canvas class='wordCanvas'></canvas>" + text + "</span>";
  }
  element.innerHTML = element.innerHTML.trim().split(/\s+/).map(wrapInRedactableSpan).join(" ");
}

// $(".stinkButtRedactable").lettering('words').children('span').addClass('word');
console.assert($(".stinkButtRedactable").length === 1);
makeRedactable($(".stinkButtRedactable")[0]);
// $(".stinkButtRedactable > .word").append("<canvas class='wordCanvas'></canvas>");
// $(".stinkButtRedactable > .word").each(_ => {
//   console.log($(this));
//   $(this).append("hi");
//   // $(this).append("<canvas class='wordCanvas'></canvas>");
// });

makeRedactable($("#sovietRedactable")[0]);
makeRedactable($("#hardwareRedactable")[0]);
makeRedactable($("#websiteRedactable")[0]);

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
  // $(".dolphinDoc").show();
  $(".stinkButtDoc").show();
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


// let isVisible = () => {
//   console.log("lsfdjsjd")
//   $(".profilePicture").show();
// }
//hookup the event
// $('#website').bind('isVisible', isVisible);

//show div and trigger custom event in callback when div is visible
// $('#website').show('slow', function(){
//     $(this).trigger('isVisible');
// });

$(".stinkButtDoc").click(function () {
  if ($(".stamp").css('display') != 'none') {
    $(".stamp").hide();
    $(".stinkButtDoc").hide();
    $("#soviet").show();
  }
});

$(".stampButton").click(stamp);
