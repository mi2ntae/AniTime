import { useState } from "react";
import { styled } from "styled-components";

export default function PasswordInput({ setPasseword }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "row", width: "100%", flex: 1 }}
    >
      <Input
        style={{ backgroundImage: "url('/icons/ic_lock.svg')" }}
        placeholder="비밀번호"
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
          height: "50px",
          backgroundColor: "#f7f8fa",
          borderWidth: "0.77px 0.77px 0.77px 0px",
          borderStyle: "solid",
          borderColor: "#e8ebee",
          borderRadius: "0px 12px 12px 0px",
          paddingRight: "24px",
        }}
      >
        <img src={showPassword ? "/icons/ic_eye_.svg" : "/icons/ic_eye.svg"} />
      </button>
    </div>
  );
}

const Input = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f7f8fa;
  border-radius: 12px 0px 0px 12px;
  border-width: 0.77px 0px 0.77px 0.77px;
  border-style: solid;
  border-color: #e8ebee;
  padding-left: 56px;
  font-size: 14px;
  font-weight: 400;
  outline: none;

  background-image: url("/icons/ic_lock.svg");
  background-repeat: no-repeat;
  background-position: 24px center;

  &::placeholder {
    color: var(--gray-scale-gray-1, #c1c1c1);
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #f7f8fa inset;
    background-image: url("/icons/ic_lock.svg");
    background-repeat: no-repeat;
    background-position: 24px center;
  }
`;
