import * as React from "react";
import {css, styled} from "styled-components";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const messages = [
  { text: "ㅁㅁㄴㅇㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴ", time: "오후 03:45" ,sender: "shelter" },
  { text: "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ",  time: "오후 03:45", sender: "user" },
  { text: "ㅅㅄㅄㅄㅄㅄ",  time: "오후 04:55",sender: "shelter" },
  { text: "ㅁㄴ어라ㅣㅁㄴ어리ㅏㄴㅁ어ㅣㅏㄹㅇ너ㅣㅏ런ㅇ미ㅏ러ㅣㅏ러ㅣ",  time: "오후 04:56" ,sender: "shelter" },
  { text: "내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일내일은금요일",  time: "오후 05:07" ,sender: "user" }
];

export default function ChatUi() {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()!== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box sx={{ height: "600px", width: "50%", display: "flex",
     flexDirection: "column", border: "1px solid #ccc" }}>
        <Box sx={{height: "85px", width: "100%",backgroundColor:"#3994F0", 
       color: "white"}}>
            <Text>
            <Font1>태민동물병원</Font1>
            <Font2>010-2868-2108</Font2>
            </Text>
        </Box>
      <Box2>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
       </Box2>
      <Box sx={{ p: 2, backgroundColor: "background.default", borderTop:"1px solid #ccc" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="채팅 메시지를 입력하세요."
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ message }) => {
  const isShelter = message.sender === "shelter";

  return (
    <Box
     sx={{ display: "flex",
       justifyContent: isShelter ? "flex-start" : "flex-end",
       mb: 2.5}}
    >
        {message.text.trim() ? (
            <>
        {isShelter ? null : <Time>{message.time}</Time>}
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isShelter ? "#F7F8FA" : "#E1F0FF",
          maxWidth: "75%"
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
      {isShelter ? <Time>{message.time}</Time>: null}
      </>
      ) : null}
    </Box>

  );
};

const Font1 = styled.div`
    font-size: 15px;
`;
const Font2 = styled.div`
    font-size: 12px;
`;
const Text = styled.div`
    padding: 12px 15px 12px 25px;
`;
const Time = styled.span`
    font-size: 10px;
    display:flex;
    align-items: flex-end;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 1px;
`;
const Box2 = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 20px;
 ${css`
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;