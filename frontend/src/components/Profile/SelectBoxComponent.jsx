import { OptionBox, OptionElement, SelectBox } from "styled/styled";

export default function SelectBoxComponent({
  isExpand,
  setIsExpand,
  selected,
  setSelected,
  optionData,
}) {
  //   const [isExpand, setIsExpand] = useState(false);
  //   const [selected, setSelected] = useState("");
  //   const optionData = "";

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
      setIsExpand(true);
      setSelected((prev) => {
        const newIdx = () => {
          const oldIdx = optionData.indexOf(prev);
          if (e.keyCode === 38) {
            return oldIdx === 0 ? oldIdx : oldIdx - 1;
          }
          if (e.keyCode === 40) {
            return oldIdx === optionData.length - 1 ? oldIdx : oldIdx + 1;
          }
        };
        return optionData[newIdx()];
      });
    }
    if (e.keyCode === 13) {
      setIsExpand((prev) => !prev);
    }
  };

  const handleMouseDown = (e) => {
    e.preventdefault();
    if (e.target.matches(":focus")) {
      setIsExpand((prev) => !prev);
    } else {
      e.target.focus();
      setIsExpand(true);
    }
    return false;
  };

  return (
    <div
      onBlur={() => setIsExpand(false)}
      onKeyDown={() => {
        handleKeyDown();
      }}
      onMouseDown={handleMouseDown}
    >
      <div>
        <SelectBox
          name="select"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          {optionData.length > 0 &&
            optionData.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
        </SelectBox>
        <div>
          {isExpand && (
            <OptionBox>
              {optionData.length > 0 &&
                optionData.map((data, index) => {
                  return (
                    <OptionElement key={index}>
                      <button
                        id={data}
                        type="button"
                        onClick={() => {
                          setSelected(data);
                          setIsExpand(false);
                        }}
                      >
                        {data}
                      </button>
                    </OptionElement>
                  );
                })}
            </OptionBox>
          )}
        </div>
      </div>
    </div>
  );
}
