 //This file act as client and responsible for exchanging peer network data.
const socket = io('/');
var peer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '443'
});
const videoGrid = document.getElementById('video-grid');
let ownVideoStream;
const ownVideo = document.createElement('video');
ownVideo.muted = true;
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
  // making promise
.then(stream => {
  // receiving user video and answer to it
    ownVideoStream = stream;
    addVideoStream(ownVideo, stream);
    peer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })
    socket.on('user-connected', userId => {
      console.log("user connected")
      setTimeout(function()
      {
        connectToNewUser(userId, stream)
      },5000
      )
      
    })
    let text = $("input");

  // calling the html file which is .ejs (here) to listen key down pressed
  // below e is the event of typing on keyboard
  // front end send messsage when press enter and clear the input
    $("html").keydown((e) => {
    if (e.which == 13 && text.val().length !== 0) {
      socket.emit("SentMessage", text.val())
      text.val("")
    }
   })
 //got message back from server
   socket.on("createMessage", (message) => {
    $("ul").append(`<li class="messages"><b>User</b><br />${message}</li>`)
    scrollToBottom()
   })
  socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })
})
peer.on('open', id => {
  // room id automatically generated
    socket.emit('join-room', ROOM_ID, id)
})  
const connectToNewUser = (userId, stream) =>{
  //call new user, send own video and add the stream of new user
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
  
}
const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
    video.play()
    })
    videoGrid.append(video)

} 
 //while typing messages in chat, it will scroll to the bottom during overflow
const scrollToBottom = () => {
  var d = $('.main__chat_window');
  d.scrollTop(d.prop("scrollHeight"));
}
 // mute our audio
const muteorUnmute = () => {
  const enabled = ownVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    ownVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    ownVideoStream.getAudioTracks()[0].enabled = true;
  }
}
const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}
const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}
 // stop our video
const playorStop = () => {
  console.log('object')
  let enabled = ownVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    ownVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    ownVideoStream.getVideoTracks()[0].enabled = true;
  }
}
const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}
const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}
