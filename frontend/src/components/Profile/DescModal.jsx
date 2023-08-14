import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { useSelector } from "react-redux";
import http from "api/commonHttp";

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
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: "12px",
};

export default function DescModal(desc) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const general = useSelector((state) => state.member);
  React.useEffect(() => {
    http.get(`profile/${general.memberNo}`).then((data) => {
      const input = data.data;
      if (input.length === 0 || input === null) {
        setOpen(true);
        return;
      }
    });
  }, []);

  return (
    <div>
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
            <Typography id="spring-modal-title" variant="h6" component="h2">
              잃어버린 나의 반려동물을 찾아보세요
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              실종된 동물의 정보를 입력하면, 애니타임이 보호소에 등록된 동물 중
              유사도가 높은 아이들을 찾아드려요.
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Button
                onClick={() => setOpen(false)}
                style={{
                  width: "140px",
                  height: "50px",
                  borderRadius: "12px",
                  border: "none",
                  color: "#3994f0",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                시작하기
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
