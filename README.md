WHAT DOES THIS APP DO:

It creates a unique ROOM_ID for you and allows multiple people to join that meeting.

It does peer to peer communication for audio/video.

It uses a NodeJS (socket.io) based signaling server for client to server and server to client communication.

Participants can do Audio/Video and it is being done using Browser builtin WebRTC APIs. 

For demo and to learn about APIs, you can visit here https://webrtc.github.io/samples/

MADE CLONE APP USING DEPENDENCIES LIKE:

socket.io

express

ejs

uuid

nodemon

peerjs library

HOW TO RUN THE APP:

Install all the commands in the vsc terminal

Saved the files then go to default browser and run http://localhost:3030 ( to check the working of app locally)

You can also deploy the app to get connected with other people ( I have deployed the app to Heroku)

NOTE: If you are getting the error: 'reference: io io is not defined' 

then in room.ejs file change your script code to 

'https://yourappname.herokuapp.com/socket.io/socket.io.jS'

SOME IDEAS FOR ENHANCEMENTS IF YOU WANT TO TICKER:

How to make this app working for 15 people

Add screen sharing option

Lock meeting option

Recordings which will be available after the recording

