# WebRTC Google Course

Web RTC stands for Web Real Time Communications and is a open-source tecnology that enables clients to share their video/audio/data streams in a peer-to-peer architecture. Actually it's implemented in the major browsers developed by Apple, Google, Microsoft, Mozilla and Opera.

In the past, a user would have to install and use a plugin to get those features, but this approach is not the most safe and easy, so a team of experts joined and decided to create a web standard to develop RTC natively in browsers. As a result, in may 2011 Ericsson build the first implementation of WebRTC.

Basically, WebRTC implements those three APIs:

* MediaStream (also known as getUserMedia): gets access to data streams, such as from the user's camera and microphone;
* RTCPeerConnection: enables audio or video calling with facilities for encryption and bandwidth management;
* RTCDataChannel: enables peer-to-peer communication of generic data.

## Run the project

```javascript
// Back-end:

npm run prod:back

// Front-end;
// Simply open the index.html on Chrome
```

## MediaStream

The MediaStream API represents synchronized streams of media. For example, a stream taken from camera and microphone input has synchronized video and audio tracks.

The _getUserMedia()_ method takes a MediaStreamConstraints object parameter and returns a Promise that resolves to a MediaStream object. 

A MediaStream can be attached to a video element by setting the srcObject attribute.

## Signaling: Session control, network, and media information

WebRTC uses RTCPeerConnection to communicate streaming data between browsers (also known as peers), but also needs a mechanism to coordinate communication and to send control messages, a process known as signaling. Signaling methods and protocols are not specified by WebRTC. Signaling is not part of the RTCPeerConnection API.

Instead, WebRTC app developers can choose whatever messaging protocol they prefer, such as SIP or XMPP, and any appropriate duplex (two-way) communication channel. Ex.: XHR, Web-Sockets.

Signaling is used to exchange three types of information:

* Session control messages: to initialize or close communication and report errors.
* Network configuration: to the outside world, what's your computer's IP address and port?
* Media capabilities: what codecs and resolutions can be handled by your browser and the browser it wants to communicate with?

The exchange of information through signaling must have completed successfully before peer-to-peer streaming can begin.

## RTCPeerConnection API and signaling: Offer, answer, and candidate

RTCPeerConnection is the API used by WebRTC apps to create a connection between peers, and communicate audio and video.

To initialize this process, RTCPeerConnection has two tasks:

1. Ascertain local media conditions, such as resolution and codec capabilities. This is the metadata used for the offer-and-answer mechanism.
2. Get potential network addresses for the app's host, known as candidates.

Once this local data has been ascertained, it must be exchanged through a signaling mechanism with the remote peer.

### Common terms:

* SDP: Session Description Protocol.
* JSEP: JavaScript Session Establishment Protocol.
* ICE: Interactive Connectivity Establishment. This protocol/framework is used in the process of finding network interfaces and ports.

ICE is a framework for connecting peers, such as two video chat clients. Initially, ICE tries to connect peers directly with the lowest possible latency through UDP. In this process, STUN servers have a single task: to enable a peer behind a NAT to find out its public address and port.

If UDP fails, ICE tries TCP. If direct connection fails—in particular because of enterprise NAT traversal and firewalls—ICE uses an intermediary (relay) TURN server. In other words, ICE first uses STUN with UDP to directly connect peers and, if that fails, falls back to a TURN relay server. The expression finding candidates refers to the process of finding network interfaces and ports.

---
## References

[1] - https://developers.google.com/learn/pathways/webrtc-media-capture?hl=en

[2] - https://codelabs.developers.google.com/codelabs/webrtc-web/

[3] - https://github.com/googlecodelabs/webrtc-web