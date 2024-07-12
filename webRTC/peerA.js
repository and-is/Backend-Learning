const lc = new RTCPeerConnection();

const dc = lc.createDataChannel("channel");

dc.onmessage = (e) => console.log("Received message: " + e.data);

dc.onopen = (e) => console.log("Connection opened!");

lc.onicecandidate = (e) =>
  console.log(
    "New Ice Candidate! Reprinting SDP " + JSON.stringify(lc.localDescription)
  );

lc.createOffer()
  .then((o) => lc.setLocalDescription(o))
  .then((a) => console.log("Set Successfully!"));

// Now you will get a SDP message which you need to copy as offer for the PEER B. That is the offer we need to send for webRTC to the other device via any other medium.

const answer = {
  /* 
    Here will be the SDP string which is the answer generated from peerB
    */
};

lc.setRemoteDescription(answer);

// This will now open the connection.

dc.send("How you doin' peerB? ");
