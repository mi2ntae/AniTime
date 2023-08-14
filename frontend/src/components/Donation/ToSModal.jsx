import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  width: 700,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "block",
};

const scrollStyle = {
  maxWidth: "100%",
  maxHeight: "70vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    backgroundColor: "transparent", // 스크롤바의 전체 배경
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    // boxShadow: " 0 0 6px rgba(0,0,0,.3)",
    backgroundColor: "#E8EBEE", // 스크롤바 핸들의 색상
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "10px",
    // boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
    backgroundColor: "white", // 스크롤바의 트랙 배경
  },
};

export default function ToSModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [termsContent, setTermsContent] = React.useState("");

  React.useEffect(() => {
    fetch("/terms.txt")
      .then((response) => response.text())
      .then((data) => setTermsContent(data))
      .catch((error) => console.error("Error loading terms:", error));
  }, []);

  return (
    <div>
      <div
        style={{
          color: "#535A61",
          fontSize: "14px",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleOpen}
      >
        약관 확인하기
        <img src="/icons/arrow_right.svg" />
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={scrollStyle}>
              <Box sx={{ maxWidth: "100%", overflowY: "auto" }}>
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  모아이 이용약관
                </Typography>
                <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                  <pre style={{ whiteSpace: "pre-wrap" }}>{termsContent}</pre>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
