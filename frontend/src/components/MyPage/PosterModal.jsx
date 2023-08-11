import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
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
  maxWidth: "70%",
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

const imageStyle = {
  maxWidth: "100%",
  overflowY: "auto",
};

export default function PosterModal({ image }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{
          padding: "8px 16px",
          backgroundColor: "#3994f0",
          color: "white",
          fontSize: "14px",
          fontWeight: 700,
          borderRadius: "12px",
        }}
        onClick={handleOpen}
      >
        후원공고 상세보기
      </Button>
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
              <Box sx={imageStyle} component="img" src={image} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
