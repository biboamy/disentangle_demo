//-----------------Initial Two.js----------------------
var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);
two.pause(); // pause the animation (update function)
//-----------------------------------------------------
var recrA = []; // For drawing Rectangle
var finishLineArray = []; //For drawing the finish line
var midiArray = [];
var uiLineArray = []; // For re-drawing the UI, resize
var midiInstrument = []; // Array for recording type of the instrument
var midiContainer = [];
var midiEachPos = []; // Record the progress rate of each track
var cololist = [
  "#d43f53",
  "#00cc44",
  "#00571d",
  "#4664ce",
  "#63caf7",
  "#e67300", // bass
  "#bf80ff",
  "#751aff",
  "#fcc000"
]; // color list for each instrument
var textlist = ["P", "F", "AG", "EG", "S", "T", "V", "C", "B"];
var textlist2 = [
  "Piano",
  "Flute",
  "Acoustic Guitar",
  "Electric Guitar",
  "Saxophone",
  "Trumpet",
  "Violin",
  "Cello",
  "Bass"
];
var playingMode = 1;
var playBool = true; // animation playing or not
var frame = 0;
var sampleName = "";
var audioPlayBool = false;
var barsColor = "#424242";
function drawingLines() {
  // drawing the background (Gray parts) and the finish line
  var finishLine = two.makeRectangle(
    0.2 * two.width,
    two.height * 0.425,
    two.width / 200,
    two.height * 0.35
  );
  finishLineArray.push(finishLine);
  finishLine.fill = barsColor;
  finishLine.noStroke();

  for (i = 0; i < 6; i += 2) {
    // Gray parts
    var lineV = two.makeRectangle(
      0,
      two.height * 0.25 + two.height * 0.05 * (i + 1.5),
      two.width * 2,
      two.height * 0.05
    );
    lineV.fill = barsColor;
    lineV.opacity = 0.75;
    //lineV.noStroke();
    uiLineArray.push(lineV);
  }
  var lineV = two.makeRectangle(
    // Bottom borderline
    0,
    two.height * 0.6,
    two.width * 2,
    two.height / 150
  );
  lineV.fill = barsColor;
  //lineV.noStroke();
  uiLineArray.push(lineV);

  var lineV = two.makeRectangle(
    // Top borderline
    0,
    two.height * 0.25,
    two.width * 2,
    two.height / 150
  );
  lineV.fill = barsColor;
  //lineV.noStroke();
  uiLineArray.push(lineV);
}
drawingLines();
// --------------Parsering MIDI--------------------
function readMidiFile(e) {
  MidiConvert.load("midiScript/" + e + ".mid", function(midi) {
    midiContainer.push(midi);
    for (j = 0; j < midi.tracks.length; j++) {
      // Check whether the track is an empty array
      if (midi.tracks[j].length == 0) {
        midiEachPos.push(-1); // Empty array marks it by -1
      } else {
        midiEachPos.push(0);
      }
    }
    $(".loadingPage").css("font-size", "10vh");
    $(".loadingPage").css("z-index", "5");
    setTimeout(function() {
      $(".loadingPage").css("font-size", "0vh");
      $(".loadingPage").css("z-index", "-5");
      two.play(); // after Parsering midi files , start the animation and drawing the UI
    }, 3000); //delay 3secs for loading the mp3 files

    playBool = true;
    document.getElementById("debug1").innerHTML = sampleName;
    checkingInstrument();
  });
}
//-----------------Checking-------------------

function checkingInstrument() {
  initFontSize();
  for (j = 0; j < midiContainer[0].tracks.length; j++) {
    if (midiEachPos[j] != -1) {
      $("#" + midiContainer[0].tracks[j].name).css("font-size", "3.5vh");
    }
  }
}

// --------------Animation Part--------------------
two.bind("update", function(frameCount) {
  // binding function in Two.js
  frame++;

  var playingRate = frame / 60; // the controller of playing rate
  if (playingMode == 0) {
    mainDrawing(playingRate);
  } else {
    // Unused
  }
});

function mainDrawing(playingRate) {
  for (j = 0; j < midiContainer[0].tracks.length; j++) {
    if (
      midiEachPos[j] != -1 &&
      midiEachPos[j] < midiContainer[0].tracks[j].length // if the track isn't an empty array
    ) {
      if (
        playingRate >= midiContainer[0].tracks[j].notes[midiEachPos[j]].time
      ) {
        var Rect = two.makeRectangle(
          // drawing and initialing the Rectangle of each note
          two.width * 1.2 +
            (midiContainer[0].tracks[j].notes[midiEachPos[j]].duration *
              two.width) /
              50,
          0.6 * two.height -
            ((midiContainer[0].tracks[j].notes[midiEachPos[j]].midi - 20) *
              two.height *
              0.35) /
              87,
          (midiContainer[0].tracks[j].notes[midiEachPos[j]].duration *
            two.width) /
            25,
          two.height / 87
        );

        Rect.fill = cololist[j - 2]; // j = 0,1 unused
        Rect.opacity = 1;
        //Rect.noStroke();
        recrA.push(Rect); // Recording the Rectangle into recrA
        midiArray.push(midiContainer[0].tracks[j].notes[midiEachPos[j]]); // recording the arrary for later using
        midiInstrument.push(midiContainer[0].tracks[j].instrumentNumber);
        midiEachPos[j] += 1;
      }
    }
  }

  for (i = 0; i < recrA.length; i++) {
    recrA[i].translation.set(
      (recrA[i].translation.x -= two.width * 0.01), // the Rectangle animation moving speed controller
      recrA[i].translation.y
    );

    var rectToTail = recrA[i].translation.x + recrA[i].width / 2; // The rightmost side of each Rectangle
    var rectToHead = recrA[i].translation.x - recrA[i].width / 2; // The leftmost side of each Rectangle

    if (
      rectToHead.toFixed(0) < 0.2 * two.width &&
      rectToHead.toFixed(0) > 0.18 * two.width
    ) {
      if (audioPlayBool == false) {
        playAudio();
        playBtnLocker = false;
        audioPlayBool = true;
      }
      recrA[i].height = two.height / 45;
      finishLineArray[0].fill = recrA[i].fill;
    }
    if (
      rectToTail.toFixed(0) < 0.185 * two.width &&
      rectToTail.toFixed(0) > 0.17 * two.width
    ) {
      recrA[i].fill = "#b2cace";
      recrA[i].height = two.height / 87;
      finishLineArray[0].fill = barsColor;
    }

    if (rectToTail < -100) {
      // remove rectangles outside of the screen
      two.remove(recrA[0]);
      recrA.shift();
      midiInstrument.shift();
      midiArray.shift();
    }
  }
}

function oriAnimation(playingRate) {
  textA[0].scale = 3 * Math.cos(playingRate);
}
scriptMidi.onended = function() {
  playBtnLocker = true;
};
var styles = {
  // font style in two.js
  family: "ka3, sans-serif",
  size: 50,
  leading: 50,
  weight: 900
};
