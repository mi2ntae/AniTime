import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #E8EBEE",
  display: "flex",
  flexDirection: "row",
  width: "70%",
  maxWidth: "350px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#535A61",
    height: "1.5px",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    flex: 1,
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: 500,
    marginRight: theme.spacing(1),
    color: "#A7AEB4",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#7D848A",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#35383B",
      fontWeight: 700,
    },
  })
);

export default function LoginTab({ value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AntTabs value={value} onChange={handleChange}>
      <AntTab value="0" label="개인 회원" />
      <AntTab value="1" label="보호소 회원" sx={{ marginRight: 0 }} />
    </AntTabs>
  );
}
