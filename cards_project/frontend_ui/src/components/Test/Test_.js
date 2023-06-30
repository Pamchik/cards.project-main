import React, { useEffect, useState, useRef } from "react";
import DiscriptionList from "../Blocks/DiscriptionList";
import TotalBlockCheckBox from "../Blocks/TotalBlockCheckBox";
import BlockCheckBoxTest from "../UI/CheckBox/BlockCheckBox";
// import './App.css';

function Test() {

  // const ref = useRef(null);

  const handleClick = () => {
    // get checkbox value with ref
    // console.log(ref.current.checked);
  };

  const effects = [
    { id: "1", name: "Javascript", value: "Javascript" },
    { id: "2", name: "Python", value: "Python" },
    { id: "3", name: "Java", value: "Java" },
    { id: "4", name: "Kotlin", value: "Kotlin" },
    { id: "5", name: "Dart", value: "Dart" },
    { id: "6", name: "C#", value: "C#" },
  ];
  const defaultValue = ["4", "2", "1", "5"]
  useEffect(() => {
    const checked = defaultValue.includes(effects.id);
    console.log(checked)
  }, []);

return (

  <div className="card-body">

          {effects.map((item, index) => {
            return (
              <div className="card-checkbox">
              <label className="card-checkbox__label">{item.value}
                <input
                  className="card-checkbox__input"  
                  // ref={ref}
                  defaultChecked={true}
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                />
                <span className="card-checkbox__element"></span>
              </label>
              </div>
            );
          })}


      <br />

      <button onClick={handleClick}>Click</button>
    </div>

)
}

export default Test;