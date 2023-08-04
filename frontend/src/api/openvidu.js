import axios from "axios";

const APPLICATION_SERVER_URL = "https://i9a208.p.ssafy.io/";

export const getToken = async (mySessionId) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

const createSession = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "api/openvidu/sessions",
    { customSessionId: sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The sessionId
};

const createToken = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL +
      "api/openvidu/sessions/" +
      sessionId +
      "/connections",
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The token
};
