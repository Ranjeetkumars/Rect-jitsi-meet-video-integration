import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';
import {Input } from '@material-ui/core';

function JitsiMeetComponent() {

  var g_roomName;
  var g_roomPassword;
  const api = null;


  const [loading, setLoading] = useState(false);
  const containerStyle = {
    width: '800px',
    height: '400px',
  };
  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  } 


 function getRoomNameAndPassword(){
      console.log("getRoomNameAndPassword function  is executed");
      var roomName = document.getElementById('room_name_id').value;
      var roomPwd = document.getElementById('room_password_id').value;
      g_roomName = roomName;
      g_roomPassword = roomPwd;
      
      console.log("Room Name::"+g_roomName);
      console.log("Room Password::"+g_roomPassword);
    
      if (window.JitsiMeetExternalAPI) {
        startConference();
      }
      else{
        alert('Jitsi Meet API script not loaded');
      }
 }


 
 function startConference() {
    var password = g_roomPassword; 
    alert("startCOnference function is executed");
    try {
   const domain = 'meet.jit.si';
   const options = {
    roomName: g_roomName,
    height: 400,
    parentNode: document.getElementById('jitsi-container'),
    interfaceConfigOverwrite: {
     filmStripOnly: false,
     SHOW_JITSI_WATERMARK: false,
    },
    configOverwrite: {
     disableSimulcast: false,
    },
    
   };

    api = new JitsiMeetExternalAPI(domain, options);
   
   api.addEventListener('participantRoleChanged', function (event) {
    if (event.role === "moderator") {
      api.executeCommand('password', password);
   }
  }); 
  api.on('passwordRequired', function () {      
   setTimeout(function () {
      password.executeCommand('password', password);
        }, 200)
});
  api.on('videoConferenceJoined', (response) => {
       setTimeout(function () {
           api.executeCommand('password', password);
   }, 200)
  });
  } catch (error) {
   console.error('Failed to load Jitsi API', error);
  } 
 }


 function hangupCall(){
  api.executeCommand('hangup');
}

/*  useEffect(() => {
  // verify the JitsiMeetExternalAPI constructor is added to the global..
  if (window.JitsiMeetExternalAPI) 
  startConference();
  else alert('Jitsi Meet API script not loaded');
 }, []); */
 
 return (
  <div
   style={containerStyle}
  >
   {loading && <ProgressComponent />}
   <div>
    
   </div>
  <div>
  <Input type="text" placeholder ="Enter Room Name" id="room_name_id">Enater Room Name</Input>
  <Input  type="password" placeholder="Enater Room Password" id="room_password_id">Enater Room Password</Input>
  <button onClick={getRoomNameAndPassword}>
      Start Viedo Conference Call
    </button>

    <button onClick={test}>
      Start Viedo Conference Call
    </button>
  </div>
  
   <div
    id="jitsi-container"
    style={jitsiContainerStyle}
   />
</div>
 ); 
}
export default JitsiMeetComponent;



