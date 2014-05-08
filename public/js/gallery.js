var audio_context;
var recorder;
var current_audio_title;
var current_audio_elem;
function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  input.connect(audio_context.destination);    
  recorder = new Recorder(input);
}
function startRecording(button) {
    var newRecording = document.createElement('span');
    //recordingslist.innerHTML="";
    recorder && recorder.record();
    button.disabled = true;
    button.style.backgroundColor = "red";
    button.style.color = "white"
    button.nextElementSibling.disabled = false;
}
function stopRecording(button) {
  recorder && recorder.stop();
  button.disabled = true;
  button.previousElementSibling.style.backgroundColor = "white"; 
  button.previousElementSibling.style.color = "black"; 
  button.previousElementSibling.disabled = false; 
  // create WAV download link using audio data blob
  createDownloadLink();
  changeImage();
  recorder.clear();
}
function changeImage() {
  var imgElems = document.getElementsByClassName(current_audio_title + "_img");
  var indexHyphen = imgElems[0].src.indexOf("_");
  if (indexHyphen != -1) {
    var imgNum = parseInt(imgElems[0].src[indexHyphen + 1]);
    [].forEach.call(imgElems, function (elem) {
      elem.src = "img/post_" + imgNum + ".jpg";
    });    
  }
}
function createDownloadLink() {
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    setActiveElement();
    current_audio_elem.src = url;
    setCurrentElement();
  });
}
function deactivateElement() {
  current_audio_elem.style.display = "none";
}
function setActiveElement() {
  var title = document.getElementsByClassName("active")[0].title;
  current_audio_title = title;
  current_audio_elem = document.getElementById(title + "_audio");
}
function isCurrentElementFull() {
  return (current_audio_elem.src != ""); 
}
function setCurrentElement() {
  if (isCurrentElementFull()) { 
    current_audio_elem.style.display = "inline";
    $('#record').css("visibility", "hidden");
    $('#stop').css("visibility", "hidden");
  } else {
    $('#record').css("visibility", "visible");
    $('#stop').css("visibility", "visible");    
  }
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
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
  });
};
$(document).ready(function() {      
$('.row .thumbnail').on('load', function() { }).each(function(i) {
  //if(this.complete) {
    var item = $('<div class="item"></div>');
    var itemDiv = $(this).parents('div');
    var title = $(this).parent('a').attr("title"); 
    item.attr("title", title);
    $(itemDiv.html()).appendTo(item);
    item.appendTo('.carousel-inner'); 
    if (i == 0){ // set first item active
      item.addClass('active');
    }
    var li = document.createElement('span');
    var au = document.createElement('audio');
    au.controls = true;
    au.style.display = "none";
    au.id = title + "_audio";
    li.appendChild(au);
    recordingslist.appendChild(li);
    setActiveElement();
    //}
});
/* activate the carousel */
$('#modalCarousel').carousel({interval:false});
/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {
  deactivateElement()
  $('.modal-title').html($(this).find('.active').attr("title"));
  setActiveElement();
  setCurrentElement();
})
/* when clicking a thumbnail */
$('.row .thumbnail').click(function(){
  deactivateElement();
  setActiveElement();
  setCurrentElement();
  var idx = $(this).parents('div').index();
  var id = parseInt(idx);
  $('#myModal').modal('show'); // show the modal
  $('#modalCarousel').carousel(id); // slide carousel to selected   
});
}); 