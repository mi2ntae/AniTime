import { useCombobox } from "downshift";
import { keyframes, styled, css } from "styled-components";

export default function SelectBox({
  items,
  placeholder,
  setValue,
  initialSelectedItem,
}) {
  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items,
    onSelectedItemChange: ({ selectedItem }) => {
      setValue(selectedItem);
    },
    selectedItem: initialSelectedItem,
  });

  return (
    <div
      style={{
        flex: "1",
        position: "relative",
      }}
    >
      <SelectBoxInput
        readOnly
        placeholder={placeholder}
        {...getInputProps()}
        isOpen={isOpen}
      />
      {isOpen && (
        <OptionBox {...getMenuProps()} isOpen={isOpen}>
          {items.map((item, index) => (
            <OptionElement
              {...getItemProps({ item, index })}
              key={index}
              style={{ background: index === highlightedIndex && "#e8ebee" }}
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
  width: 100%;
  background-color: #f7f8fa;
  border-radius: 12px;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  cursor: default;

  color: #35383b;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 24px;

  border: ${({ isOpen }) =>
    isOpen || document.activeElement === this
      ? "1px solid var(--primary, #3994f0)"
      : "0.77px solid var(--lightgrey, #e8ebee)"};

  &:focus {
    outline: none;
    border: 1px solid var(--primary, #3994f0);
  }

  &::placeholder {
    color: #a7aeb4;
  }
`;

const OptionBox = styled.ul`
  list-style-type: none;
  margin: 0px;

  background-color: var(--lightestgrey, #f7f8fa);
  border: 0.77px solid var(--lightgrey, #e8ebee);
  border-radius: 12px;
  box-sizing: border-box;
  // padding: 0px 8px 0px 8px;
  padding: 0;
  position: absolute;
  cursor: pointer;
  top: 58px;
  left: 0px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
  z-index: 555;
  // animation: ${keyframes`
  //   from {
  //           clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
  //           opacity: 0.5;
  //         }
  //         to {
  //           clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  //           opacity: 1;
  //         }
  // `} 0.5s forwards;

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
  display: flex;
  width: 100%;
  align-items: center;
  height: 45px;
  padding: 0px 24px 0px 24px;
  box-sizing: border-box;
  overflow-y: auto;

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
