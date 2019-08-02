var audioName = "";
var functionLock = false;
var playBtnLocker = true;
var Sample1 = "Les_Potes";
var Sample2 = "Untitled";
var Sample3 = "Faded";
var Sample4 = "Dream_a_little_dream_of_me";

$(document).ready(function() {
  // Animation of Pickin' the midi file
  reStart();
  if (functionLock == false) {
    $("#pickScript1").mouseup(function() {
      reStart();
      menuDisplay();
      sampleName = Sample1;
      audioName = Sample1;
      pickAudio(Sample1);
      oriPlayingReset();
    });
    $("#pickScript2").mouseup(function() {
      reStart();
      menuDisplay();
      sampleName = Sample2;
      audioName = Sample2;
      pickAudio(Sample2);
      oriPlayingReset();
    });
    $("#pickScript3").mouseup(function() {
      reStart();
      menuDisplay();
      sampleName = Sample3;
      audioName = Sample3;
      pickAudio(Sample3);
      oriPlayingReset();
    });
    $("#pickScript4").mouseup(function() {
      reStart();
      menuDisplay();
      sampleName = Sample4;
      audioName = Sample4;
      pickAudio(Sample4);
      oriPlayingReset();
    });
  }
});
// ------pick instrument------
$(document).ready(function() {
  $("#pickScript0_2").mouseup(function() {
    reStart();
    $("#menu_opener_id_2").prop("checked", false);
    pickAudio(sampleName + "/" + "/" + audioName);
    oriPlayingReset();
    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
  });
  $("#pickScript1_2").mouseup(function() {
    reStart();
    playingMode = 0;
    pickAudio(sampleName + "/" + "/" + audioName + "_1");
    readMidiFile(sampleName + "/" + sampleName + "_1");

    $("#menu_opener_id_2").prop("checked", false);

    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
  });
  $("#pickScript2_2").mouseup(function() {
    reStart();
    playingMode = 0;
    pickAudio(audioName + "/" + audioName + "_2");
    readMidiFile(sampleName + "/" + sampleName + "_2");
    $("#menu_opener_id_2").prop("checked", false);

    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
  });
  $("#pickScript3_2").mouseup(function() {
    reStart();
    playingMode = 0;
    pickAudio(audioName + "/" + audioName + "_3");
    readMidiFile(sampleName + "/" + sampleName + "_3");
    $("#menu_opener_id_2").prop("checked", false);

    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
  });
  $("#pickScript4_2").mouseup(function() {
    reStart();
    playingMode = 0;
    pickAudio(audioName + "/" + audioName + "_4");
    readMidiFile(sampleName + "/" + sampleName + "_4");
    $("#menu_opener_id_2").prop("checked", false);

    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
  });
});

$(document).ready(function() {
  $(window).resize(function() {
    // Resize the UI
    // player.cancelQueue(audioContext);
    two.pause();
    playBool = false;
    $("#playIcon").attr("src", "src/assets/playIcon.png");
    two.remove(finishLineArray[0]);
    finishLineArray.shift();
    for (i = 0; i < 5; i++) {
      two.remove(uiLineArray[i]);
    }
    for (j = 0; j < 5; j++) {
      uiLineArray.shift();
    }
    drawingLines();
  });
});

function playbutton(e) {
  // Controller of Play button and icon
  var key = e.keyCode;
  if (key == 32 && playBool == true && playBtnLocker == false) {
    // 32 = keycode of spacebar
    playBool = false;
    $("#playIcon").attr("src", "src/assets/playIcon.png");
    scriptMidi.pause();

    two.pause();
  } else if (key == 32 && playBool == false && playBtnLocker == false) {
    playBool = true;
    $("#playIcon").attr("src", "src/assets/pauseIcon.png");
    scriptMidi.play();
    two.play();
  }
}

$(document).ready(function() {
  $("#playIcon").mouseup(function() {
    if (playBool == true && playBtnLocker == false) {
      // keycode of spacebar
      playBool = false;
      $("#playIcon").attr("src", "src/assets/playIcon.png");
      scriptMidi.pause();
      two.pause();
    } else if (playBool == false && playBtnLocker == false) {
      playBool = true;
      $("#playIcon").attr("src", "src/assets/pauseIcon.png");
      scriptMidi.play();
      two.play();
    }
  });
});

//--------Restart Function------
function reStart() {
  //init
  two.clear();
  two.pause();
  recrA.length = 0;
  finishLineArray.length = 0;
  midiArray.length = 0;
  uiLineArray.length = 0;
  midiInstrument.length = 0;
  midiContainer.length = 0;
  midiEachPos.length = 0;
  playBool = false;
  audioPlayBool = false;

  frame = 0;

  drawingLines();

  console.log("Re-start");
  scriptMidi.pause();
}
function initFontSize() {
  $("#Piano").css("font-size", "0vh");
  $("#A-Guitar").css("font-size", "0vh");
  $("#E-Guitar").css("font-size", "0vh");
  $("#Trumpet").css("font-size", "0vh");
  $("#Saxphone").css("font-size", "0vh");
  $("#Bass").css("font-size", "0vh");
  $("#Violin").css("font-size", "0vh");
  $("#Cello").css("font-size", "0vh");
  $("#Flute").css("font-size", "0vh");
}
var initMeun = false;

function menuDisplay() {
  $("#menu_opener_id").prop("checked", false);
  $(".instrument_pic ").css("opacity", "1");
  $(".play_pic ").css("opacity", "1");
  $(".link_general_2 ").css("opacity", "1");
  $(".menu_opener_label_2").css("opacity", "1");
  functionLock = true;
}
var scriptMidi = new Audio();
function pickAudio(e) {
  console.debug("loading!!");
  scriptMidi = new Audio("audio/" + e + ".wav");
  console.debug("Done!!");
}
function playAudio() {
  scriptMidi.play();
}
$(document).ready(function() {
  $("#playButton").mouseup(function() {
    $(".frontPage").css("z-index", "-5");
    $(".instrument_pic ").css("opacity", "0");
    $(".frontPage").fadeOut();
  });
});
var titleArray = [];
function oriPlayingReset() {
  initFontSize();
  document.getElementById("debug1").innerHTML = "";
  titleArray.length = 0;

  playingMode = 1;
  two.play();
  two.clear();
  var text = two.makeText(sampleName, two.width / 2, two.height / 2, styles);
  text.stroke = "black";
  text.fill = "white";
  text.linewidth = 3;
  titleArray.push(text);
  setTimeout("playAudio()", 1500);
}
document.addEventListener("keydown", playbutton);
