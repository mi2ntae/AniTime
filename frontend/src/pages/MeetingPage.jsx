import { getToken } from "api/openvidu";
import DesertionDetail from "components/Desertion/DesertionDetail";
import MeetingFooter from "components/Meeting/MeetingFooter";
import MeetingHeader from "components/Meeting/MeetingHeader";
import OpenViduVideoComponent from "components/Meeting/OvVideo";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setDesertionNo } from "reducer/detailInfo";
import { styled } from "styled-components";

export default function MeetingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    sessionId: undefined,
    username: useSelector((state) => state.member.name),
  });
  const [meeting, setMeeting] = useState({
    meetNo: undefined,
    shelterNo: undefined,
    generalNo: undefined,
    desertionNo: undefined,
    url: undefined,
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
  const [control, setControl] = useState({
    video: false,
    mic: false,
    muted: false,
    volume: 0.2,
  });

  useEffect(() => {
    console.log("effect");
    // 로그인 유저 정보 확인 후 없으면 홈으로
    console.log(user.username);
    if (!user.username) navigate("/");
    // meeting 정보 받아오기
    {
      // const 범위(data 변수 이름 중복)때문에 사용하는 블록
      const data = {
        meetNo: 1,
        member: {
          memberNo: 2,
        },
        animal: {
          desertionNo: 447510202300017,
          shelterNo: 1,
        },
        reserveData: undefined,
        url: "imageUrl",
        reason: undefined,
      };
      // error일때 홈으로
      const {
        meetNo,
        member: { memberNo: generalNo },
        animal: { desertionNo, shelterNo },
        url,
      } = data;
      setMeeting((p) => ({
        ...p,
        meetNo,
        generalNo,
        desertionNo,
        shelterNo,
        url,
      }));
      // 동물 정보 세팅
      dispatch(setDesertionNo(desertionNo));
    }
    // sessionId 받아오기
    {
      const data = "sessionA";
      // sessionId 받아오는데 실패하면 홈으로
      if (!data) navigate("/");
      setUser((p) => ({ ...p, sessionId: data }));
    }
    return () => {
      leaveSession();
    };
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(meeting);
    joinSession();
  }, [user]);

  useEffect(() => {
    if (openvidu.publisher) {
      openvidu.publisher.publishAudio(control.mic);
      openvidu.publisher.publishVideo(control.video);
    }
  }, [control, openvidu.publisher]);

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
    navigate("/");
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
      // console.log("delete");
      setOpenvidu((p) => {
        const streamManager = event.stream.streamManager;
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
          audioSource: "communications", // The source of audio. If undefined default microphone
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
      <MeetingHeader tabOpen={tabOpen} handleTabOpen={setTabOpen} />
      {openvidu.session ? (
        <MainDiv>
          <VideoDiv>
            <UserVideo>
              <OpenViduVideoComponent
                streamManager={openvidu.mainStreamManager}
              />
            </UserVideo>
            <CallVideo>
              {
                openvidu.subscribers.map((sub, i) => (
                  <OpenViduVideoComponent
                    key={i}
                    streamManager={sub}
                    muted={control.muted}
                    volume={control.volume}
                  />
                ))[0]
              }
            </CallVideo>
          </VideoDiv>
          {(tabOpen.formTab || tabOpen.profileTab || tabOpen.chatTab) && (
            <SideDiv>
              <TabDiv hidden={!tabOpen.formTab}>{meeting.url}</TabDiv>
              <TabDiv hidden={!tabOpen.profileTab}>
                <DesertionDetail />
              </TabDiv>
              <TabDiv hidden={!tabOpen.chatTab}>
                <ChatUi />
              </TabDiv>
            </SideDiv>
          )}
        </MainDiv>
      ) : (
        <LoadingDiv>
          미팅 방에 접속하는 중입니다.
          <br />
          잠시만 기다려주세요
        </LoadingDiv>
      )}
      <MeetingFooter
        control={control}
        handleControl={setControl}
        close={leaveSession}
      />
    </Div>
  );
}

const Div = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  overflow: hidden;
`;

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const VideoDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const UserVideo = styled.div`
  position: absolute;
  top: 50px;
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

const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 0 0 400px;
  background-color: #ffffff;
`;

const TabDiv = styled.div`
  flex: 1 1 0;
  width: 100%;
  overflow-y: auto;
`;
