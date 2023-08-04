import { getToken } from "api/openvidu";
import StreamComponent from "components/OpenVidu/StreamComponent";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function Openvidutest() {
  const [user, setUser] = useState({
    sessionId: undefined,
    username: "user1",
  });
  const [openvidu, setOpenvidu] = useState({
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });

  useEffect(() => {
    // sessionId 받아오기
    console.log("effect");
    setUser((p) => ({ ...p, sessionId: "sessionA" }));
    return () => {
      leaveSession();
    };
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  const handleUserChange = (event) => {
    setUser((p) => ({
      ...p,
      [event.target.name]: event.target.value,
    }));
  };

  const leaveSession = () => {
    if (openvidu.session) {
      openvidu.session.disconnect();
      setOpenvidu((p) => ({
        ...p,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
      }));
    }
  };

  const joinSession = async () => {
    if (user.sessionId === undefined) return;
    const OV = new OpenVidu();
    OV.enableProdMode();
    const session = OV.initSession();
    //이벤트
    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setOpenvidu((p) => ({
        ...p,
        subscribers: [...p.subscribers, subscriber],
      }));
    });
    session.on("streamDestroyed", (event) => {
      // event.preventDefault();
      console.log("delete");
      setOpenvidu((p) => {
        console.log(p.subscribers);
        const streamManager = event.stream.streamManager;
        console.log(streamManager);
        return {
          ...p,
          subscribers: p.subscribers.filter((sub) => sub !== streamManager),
        };
      });
    });
    session.on("exception", (exception) => {
      console.warn(exception);
    });

    const token = await getToken(user.sessionId);
    session
      .connect(token, { clientData: user.username })
      .then(async () => {
        const publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });
        session.publish(publisher);
        // const devices = await OV.getDevices();
        // const videoDevices = devices.filter(device => device.kind === "videoinput");
        // const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        // const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
        setOpenvidu((p) => ({
          ...p,
          session: session,
          mainStreamManager: publisher,
          publisher: publisher,
        }));
      })
      .catch((error) => {
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  };

  return (
    <Div>
      {openvidu.session ? (
        <VideoDiv>
          <UserVideo>
            <StreamComponent streamManager={openvidu.mainStreamManager} />
          </UserVideo>
          <CallVideo>
            {openvidu.subscribers.map((sub, i) => (
              <StreamComponent key={i} streamManager={sub} />
            ))}
          </CallVideo>
          <button onClick={leaveSession}>연결 해제</button>
        </VideoDiv>
      ) : (
        <ButtonDiv>
          <input
            name="sessionId"
            value={user.sessionId || ""}
            onChange={handleUserChange}
          />
          <input
            name="username"
            value={user.username || ""}
            onChange={handleUserChange}
          />
          <button onClick={joinSession}>연결</button>
        </ButtonDiv>
      )}
    </Div>
  );
}

const Div = styled.div`
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 1000px;
  height: 100vh;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const UserVideo = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
  width: 300px;
  height: fit-content;
  border-radius: 8px;
  border: black 1px solid;
`;
const CallVideo = styled.div`
  width: 100%;
  height: fit-content;
  flex-grow: 1;
`;
