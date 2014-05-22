var socket = io.connect('/');
var localStream = null;

//our own PeerServer cloud API key
var peer = new Peer('abc', {key: 'ejpl0jusq1gaatt9'});

peer.on('open', function(id) {
	console.log("My peer ID is: " + id);
});

function unmuteAudio() {

  $("#unmuteButton").hide();
  $("#muteButton").show();

 	navigator.webkitGetUserMedia({video: false, audio: true}, successCallback, errorCallback);
  	function successCallback(stream) {
  		localStream = stream;
  		var call = peer.call('abc', localStream);
		call.on('stream', function(remoteStream) {
  		//Received peer's MediaStream
  			console.log(remoteStream);
  			var remoteaudio = $("#remoteaudio");
  			console.log("Received stream.");
  			try {
	          remoteaudio.src = window.URL.createObjectURL(remoteStream);
	          remoteaudio.play();
	        } catch(e) {
	          console.log("Error setting video src: ", e);
	        }
   		});
	}
  	function errorCallback(error) {
      	console.error('An error occurred getting local audio stream: [CODE ' + error.code + ']');
     	return;
  	}
}

function muteAudio() {
	$("#muteButton").hide();
	$("#unmuteButton").show();

	localStream.stop();
}

peer.on('call', function(call) { 
	navigator.webskitGetUserMedia({video: false, audio: true}, successCallback, errorCallback);
	function successCallback(stream) {
		localStream = stream;
		call.answer(localStream);
		call.on('stream', function(remoteStream) {
			var remoteaudio = $("#remoteaudio");
  			console.log("Received stream.");
  			try {
	          remoteaudio.src = window.URL.createObjectURL(remoteStream);
	          remoteaudio.play();
	        } catch(e) {
	          console.log("Error setting video src: ", e);
	        }
		});
	}
	
	function errorCallback(err) {
		console.log('An error occurred getting local audio stream: [CODE ' + error.code + ']');
	}
});

























// var isAudioMuted = true;
// var channelReady = false;
// var localStream = null;
// var peerConn = null;
// var started = false;



// socket.on('connect', onChannelOpened).on('message', onMessage);

// function onChannelOpened(evt) {
// 	channelReady = true;
// }

// function createPeerConnection() {
// 	console.log("Creating peer connection");
// 	RTCPeerConnection = webkitRTCPeerConnection || mozRTCPeerConnection;
// 	var pc_config = {"iceServers":[]};
// 	try {
// 		peerConn = new RTCPeerConnection(pc_config);
// 		console.log('Adding local stream...');
// 		peerConn.addStream(localStream); //{stream:localStream});
// 		//peerConn.addStream({stream:localStream});

// 	} catch (e) {
// 		console.log("Failed to create PeerConnection, error: " + e.message);
// 	}

// 	peerConn.onicecandidate = function (evt) {
// 		if(evt.candidate) {
// 			console.log('Sending ICE candidate');
// 			console.log(evt.candidate);
// 			socket.json.send({type: "candidate",
// 							sdpMLineIndex: evt.candidate.sdpMLineIndex,
//                       	sdpMid: evt.candidate.sdpMid,
//                       	candidate: evt.candidate.candidate});
// 		} else {
// 			console.log("End of candidates");
// 		}
// 	};


// 	peerConn.onaddstream = function(evt) {
// 		var remoteaudio = document.getElementById("remoteaudio");
// 		console.log("Added remote stream");
// 		remoteaudio.src = window.URL.createObjectURL(evt.stream);
// 		console.log(remoteaudio);
// 		remoteaudio.play();
// 	};

// 	// peerConn.on('addStream', function(evt) {
// 	// 	console.log("Added remote stream");
// 	// 	remoteaduio.src = window.URL.createObjectURL(evt.stream);
// 	// });

	

// 	// peerConn.addEventListener("addStream", onRemoteStreamAdded, false);
// 	// peerConn.addEventListener("removeStream", onRemoteStreamRemoved, false);

// 	// // when remote adds a stream, hand it on to the local video element
//  //    function onRemoteStreamAdded(event) {
//  //      console.log("Added remote stream");
//  //      remoteaudio.src = window.URL.createObjectURL(event.stream);
//  //      remoteaudio.play();
//  //    }

//  //    // when remote removes a stream, remove it from the local video element
//  //    function onRemoteStreamRemoved(event) {
//  //      console.log("Remove remote stream");
//  //      remoteaudio.src = "";
//  //    }
// }

// var mediaConstraints = {'mandatory': {
// 						'OfferToReceiveAudio': true,
// 						'OfferToReceiveVideo':false }};

// function setLocalAndSendMessage(sessionDescription) {
//  	peerConn.setLocalDescription(sessionDescription);
//  	console.log("Sending: SDP");
//  	console.log(sessionDescription);
//  	socket.json.send(sessionDescription);
// }

// socket.on('message', onMessage);


//  //Accept connection request
//  function onMessage(evt) {
//  	if(evt.type == "offer") {
//  		console.log("Received offer");
//  		if(!started) {
//  			createPeerConnection();
//  			started = true;
//  		}
//  		console.log("Creating remote session description.");
//  		peerConn.setRemoteDescription(new RTCSessionDescription(evt));
//  		console.log("Sending answer");
//  		peerConn.createAnswer(setLocalAndSendMessage, createAnswerFailed, mediaConstraints);
//  	} else if (evt.type == "answer" && started) {
//  		console.log("Recevied answer");
//  		console.log("Setting remote session description");
//  		peerConn.setRemoteDescription(new RTCSessionDescription(evt));
//  	} else if(evt.type == "candidate" && started) {
//  		console.log("Received ICE candidate");
//  		var candidate = new RTCIceCandidate({sdpMLineIndex:evt.sdpMLineIndex, sdpMid:evt.sdpMid, candidate:evt.candidate});
// 	    console.log(candidate);
// 	    peerConn.addIceCandidate(candidate);
//  	}
//  }

// function unmuteAudio() {
//   $("#unmuteButton").hide();
//   $("#muteButton").show();

//   navigator.webskitGetUserMedia({video: false, audio: true}, successCallback, errorCallback);
//   function successCallback(stream) {

//   	var audioContext = new webkitAudioContext();
//   	var mediaStreamSource = audioContext.createMediaStreamSource(stream);
//   	mediaStreamSource.connect(audioContext.destination);



//       localStream = stream;
   
//       // if (audioStream.mozSrcObject) {
//       //   audioStream.mozSrcObject = stream;
//       //   audioStream.play();
//       // } else {
//       //   try {
//       //     audioStream.src = window.URL.createObjectURL(stream);
//       //     audioStream.play();
//       //   } catch(e) {
//       //     console.log("Error setting video src: ", e);
//       //   }
//       // }
//       createPeerConnection();
//   	  peerConn.createOffer(setLocalAndSendMessage, errorCallback, mediaConstraints);
//   }
//   function errorCallback(error) {
//       console.error('An error occurred getting local audio stream: [CODE ' + error.code + ']');
//       return;
//   }
//  }
//  function muteAudio() {
//   $("#muteButton").hide();
//   $("#unmuteButton").show();

//   localStream.stop();
//  }



//   function createAnswerFailed() {
//     console.log("Create Answer failed");
//   }

//  //BASED ON EXAMPLE ON HTML5 VIDEO CONFERENCING

 



 	
