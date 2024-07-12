const offer = {
  /*
Here is the SDP string copied from peerA via your browser dev tools.
*/
};

const rc = new RTCPeerConnection();

rc.onicecandidate = (e) =>
  console.log(
    "New Ice Candidate! Reprinting SDP " + JSON.stringify(rc.localDescription)
  );

rc.ondatachannel = (e) => {
  rc.dc = e.channel;
  rc.dc.onmessage = (e) => console.log("Received Message: " + e.data);
  rc.dc.onopen = (e) => console.log("Connection opened!");
};

rc.setRemoteDescription(offer).then((a) => console.log("Offer Set!"));

rc.createAnswer()
  .then((a) => rc.setLocalDescription(a))
  .then((a) => console.log("Answer created!"));

// This creates an answer SDP string on the console which you need to copy into peerA.

// After setting the remoteDescription there, the connection is established and now you can send and receive data.

dc.send("Nice and good, matey! ");
