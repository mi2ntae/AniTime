import { getToken } from "api/openvidu";
import MeetingFooter from "components/Meeting/MeetingFooter";
import MeetingHeader from "components/Meeting/MeetingHeader";
import StreamComponent from "components/Meeting/StreamComponent";
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
  const [tabOpen, setTabOpen] = useState({
    formTab: false,
    profileTab: false,
    chatTab: false,
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
          resolution: "1260x720", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });
        session.publish(publisher);
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
          <MeetingHeader tabOpen={tabOpen} handleTabOpen={setTabOpen} />
          <UserVideo>
            <StreamComponent streamManager={openvidu.mainStreamManager} />
          </UserVideo>
          <CallVideo>
            {
              openvidu.subscribers.map((sub, i) => (
                <StreamComponent key={i} streamManager={sub} />
              ))[0]
            }
          </CallVideo>
          <button onClick={leaveSession}>연결 해제</button>
          <MeetingFooter />
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
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
  justify-content: center;
  align-items: center;
`;
const UserVideo = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
  width: 315px;
  height: 180px;
  border-radius: 8px;
  border: black 1px solid;
`;
const CallVideo = styled.div`
  width: fit-content;
  height: 100%;
  flex-grow: 1;
`;
