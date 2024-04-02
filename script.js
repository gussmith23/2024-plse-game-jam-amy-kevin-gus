// $(".word").click(function () {
//   $(this).toggleClass('redacted');
// });

var redactAudio = new Audio('scribble1.m4a');
var stampAudio = new Audio('stamp.m4a');
var paperAudio = new Audio('paper.mp3');
var currentCompleted = true;

var progression = {
  "soviet": "dolphin"
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
  stageShowNoteFromManager();
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

$(".stinkButtDoc").click(function () {
  if ($(".stamp").css('display') != 'none') {
    $(".stamp").hide();
    $(".stinkButtDoc").hide();
    $("#soviet").show();
  }
});

$(".stampButton").click(stamp);


// This stage displays the note from the manager.
function stageShowNoteFromManager() {

  $(".stinkButtStickyNote").show();
  $(".stinkButtStickyNoteButton").click(stageStinkButt);

}

function stageStinkButt() {
  $(".stinkButtDoc").show();
  $(".stinkButtStickyNoteButton").hide();
  $(".stinkButtStickyNote").css('left', '544px');
  $(".stinkButtStickyNote").css('top', '37px');


  var wordsList = $(".stinkButtRedactable").children();
  function redact(idx) {
    $(wordsList[idx]).toggleClass('redacted');
  }

  redact(2);
  redact(3);
  redact(4);
  redact(7);
  redact(8);
  redact(9);
  redact(10);
  redact(13);
  redact(14);
  redact(15);
  redact(18);
  redact(19);
  redact(20);
  redact(21);
  redact(22);
  redact(23);
  redact(26);
  redact(27);
  redact(28);
  redact(29);
  redact(32);
  redact(33);
  redact(34);
  redact(35);
  redact(36);

}

$(".stinkButtUnredact").click(() => trash($(".stinkButtDoc")));

// Unredact everything under the given element.
function unredactAll(element) {
  // Remove redacted class.
  $(element).find(".word").removeClass('redacted');
  // Clear canvas.
  $(element).find(".wordCanvas").each(function () {
    const ctx = $(this)[0].getContext("2d");
    ctx.clearRect(0, 0, $(this)[0].width, $(this)[0].height);
  });
}

// "Trash" an element and make it reappear.
function trash(element) {
  paperAudio.play();
  const oldTop = $(element).css('top');
  $(element).css('transition', 'top .25s ease');
  $(element).css('top', '2000px');
  setTimeout(() => {
    unredactAll(element);
    $(element).css('top', oldTop);
  }, 250);
}

function stampDoc(doc) {
  stampAudio.play();
  $(doc).find(".stamp").show();
  $(doc).find(".next").show();
}

$(".stinkButtSubmit").click(() => stampDoc($(".stinkButtDoc")));

$(".stinkButtDoc .next").click(() => {
  $(".stinkButtDoc").hide();
  $(".stinkButtStickyNote").hide();
  $("#soviet").show();
});