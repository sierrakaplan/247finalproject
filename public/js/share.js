var audio_context;
var recorder;
function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  input.connect(audio_context.destination);
  recorder = new Recorder(input);
}
function startRecording(button) {
  recordingslist.innerHTML = "";
  recorder && recorder.record();
  button.disabled = true;
  var nextButton = document.getElementById("stop");
  nextButton.disabled = false;
  changePrompt();
}
function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  var prevButton = document.getElementById("record");
  prevButton.disabled = false;
  // create WAV download link using audio data blob
  createDownloadLink();
  changeImage();
  recorder.clear();
}
function changePrompt() {
  var elem = document.getElementById("One_img");
  elem.src = "img/prompts.jpg";
}
function changeImage() {
  var elem = document.getElementById("One_img");
  elem.src = "img/post_1.jpg";
}
function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement('span');
    var au = document.createElement('audio');
    var hf = document.createElement('a');
    au.controls = true;
    au.src = url;
    hf.href = url;
    li.appendChild(au);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}
window.onload = function init() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = ( navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia);
    window.URL = window.URL || window.webkitURL;
    audio_context = new AudioContext;
  } catch (e) {
    alert('No web audio support in this browser!');
  }  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) { });
  var li = document.createElement('span');
  var au = document.createElement('audio');
  au.controls = true;
  au.style.display = "none";
  li.appendChild(au);
  recordingslist.appendChild(li);
};