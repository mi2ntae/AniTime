import { useCombobox } from "downshift";
import { keyframes, styled, css } from "styled-components";

export default function SelectSearchType({ items, placeholder, setValue }) {
  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem === "제목") setValue("title");
      if (selectedItem === "보호소명") setValue("name");
    },
  });

  return (
    <div
      style={{
        flex: "1",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SelectBoxInput
          readOnly
          placeholder={placeholder}
          {...getInputProps()}
          isOpen={isOpen}
        />
      </div>

      {/* <OptionBox {...getMenuProps()} isOpen={isOpen}>
        {items.map((item, index) => (
          <OptionElement
            {...getItemProps({ item, index })}
            key={index}
            style={{ background: index === highlightedIndex && "#F7F8FA" }}
          >
            {item}
          </OptionElement>
        ))}
      </OptionBox> */}
      {isOpen && (
        <OptionBox {...getMenuProps()} isOpen={isOpen}>
          {items.map((item, index) => (
            <OptionElement
              {...getItemProps({ item, index })}
              key={index}
              style={{ background: index === highlightedIndex && "#F7F8FA" }}
            >
              {item}
            </OptionElement>
          ))}
        </OptionBox>
      )}
    </div>
  );
}

const SelectBoxInput = styled.input`
  display: flex;
  flex: 1;
  // max-width: 100%;
  height: 48px;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  cursor: default;
  border: 0;
  border-radius: 8px 0px 0px 8px;
  max-width: 176px;

  color: #35383b;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 48px 0px 24px;
  background-image: url(${(props) =>
    props.isOpen
      ? "/icons/ic_arrow_top_black.svg"
      : "/icons/ic_arrow_bottom_gray.svg"});
  background-repeat: no-repeat;
  background-position: calc(100% - 24px) center;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #35383b;
  }
`;

const OptionBox = styled.ul`
  list-style-type: none;
  margin: 0px;

  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  // box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #caced3;
  padding: 6px;
  position: absolute;
  cursor: pointer;
  top: 62px;
  left: 0px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
  z-index: 999;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${fadeInAnimation} 0.5s forwards
        `
      : "none"}; // css 헬퍼를 사용하여 keyframes를 감싸줍니다.
`;

const OptionElement = styled.li`
  color: #3d3d3d;
  display: flex;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  height: 34px;
  padding: 0px 14px 0px 14px;
  box-sizing: border-box;
  overflow-y: auto;
  border-radius: 10px;

  &:hover {
    background-color: #e8ebee;
  }
`;

const fadeInAnimation = keyframes`
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
    opacity: 0.5;
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
`;
