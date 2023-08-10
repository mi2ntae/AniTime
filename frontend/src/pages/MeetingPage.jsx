import http from "api/commonHttp";
import { getToken } from "api/openvidu";
import AdoptionForm from "components/AdoptionForm/AdoptionForm";
import DesertionDetail from "components/Desertion/DesertionDetail";
import MeetingFooter from "components/Meeting/MeetingFooter";
import MeetingHeader from "components/Meeting/MeetingHeader";
import OpenViduVideoComponent from "components/Meeting/OvVideo";
import ChatUi from "components/MyPage/GeneralChatting/ChatUi";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setDesertionNo } from "reducer/detailInfo";
import { styled } from "styled-components";

export default function MeetingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meetingNo } = useParams();
  const login = useSelector((state) => state.member);

  const didMount = useRef(false);

  const [user, setUser] = useState({
    sessionId: undefined,
    username: undefined,
    userkind: undefined,
    userno: 0,
  });
  const [meeting, setMeeting] = useState({
    meetNo: undefined,
    shelterNo: undefined,
    generalNo: undefined,
    desertionNo: undefined,
    adoptionForm: undefined,
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
    // 로그인 유저 정보 확인 후 없으면 홈으로
    if (!login.token) {
      navigate("/");
      return;
    }
    setUser((p) => ({
      ...p,
      username: login.name,
      userkind: login.memberKind,
      userno: login.memberNo,
    }));
    // meeting 정보 받아오기
    http
      .get(`meet/shelter/${meetingNo}`)
      .then(({ data }) => {
        const { meet, adoptionForm } = data;
        // error일때 홈으로
        const {
          meetNo,
          member: { memberNo: generalNo },
          animal: { desertionNo, shelterNo },
          url,
        } = meet;
        setMeeting((p) => ({
          ...p,
          meetNo,
          generalNo,
          desertionNo,
          shelterNo,
          adoptionForm: adoptionForm,
        }));
        // 동물 정보 세팅
        dispatch(setDesertionNo(desertionNo));
        setUser((p) => ({ ...p, sessionId: url }));
        didMount.current = true;
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
    return () => {
      console.log("return");
      leaveSession();
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      if (!user.sessionId) {
        alert("잘못된 세션 아이디입니다");
        navigate("/");
      } else if (user.userkind === 0 && user.userno !== meeting.generalNo) {
        alert("당신의 미팅이 아닙니다");
        navigate("/");
      } else if (user.userkind === 1 && user.userno !== meeting.shelterNo) {
        alert("당신의 미팅이 아닙니다");
        navigate("/");
      } else {
        console.log("joinSession");
        joinSession();
      }
    }
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
          publishAudio: control.video, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: control.mic, // Whether you want to start publishing with your video enabled or not
          resolution: "1260x720", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: true, // Whether to mirror your local video or not
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
      <MeetingHeader
        tabOpen={tabOpen}
        handleTabOpen={setTabOpen}
        meetingNo={meetingNo}
      />
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
              <TabDiv hidden={!tabOpen.formTab}>
                <AdoptionForm url={meeting.adoptionForm} />
              </TabDiv>
              <TabDiv hidden={!tabOpen.profileTab}>
                <DesertionDetail readOnly={true} />
              </TabDiv>
              <TabDiv hidden={!tabOpen.chatTab} style={{ overflow: "hidden" }}>
                <ChatUi height={"100%"} />
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
