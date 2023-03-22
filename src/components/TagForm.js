import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTag } from "../store/articleSlice";

function TagForm() {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState("");
  return (
    <div className="form__tag">
      <input
        className="form__input input--tags"
        type="text"
        placeholder="Tag"
        onChange={(event) => setValueInput(event.target.value)}
        value={valueInput}
      />

      <button
        className="button form__button form__button--add"
        onClick={(event) => {
          event.preventDefault();
          if (valueInput.trim() !== "") {
            dispatch(setTag({ valueInput }));
            setValueInput("");
          }
        }}
      >
        Add Tag
      </button>
    </div>
  );
}
export default TagForm;
