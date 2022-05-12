import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Actual from "./actual";
import "./App.css";

const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/`;
export const instance = axios.create({
  baseURL: BASE_URL,
});

function App() {
  const [info, setInfo] = useState([]);
  const [date, setDate] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("uah");
  const [options, setOptions] = useState([]);

  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    (async function () {
      const res = await instance.get(`${from}.json`);
      setDate(res.data.date);
      setInfo(res.data[from]);
    })();
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert1();
    convert2();
  }, [info]);

  function convert1() {
    setSecondValue(firstValue * info[to]);
  }
  function convert2() {
    setFirstValue((info[from] / info[to]) * secondValue);
  }

  return (
    <div className="App">
      <div className="default">
        <div className="date">
          <span>{date}</span>
        </div>
        <Actual />
      </div>
      <div className="heading">
        <h1>Currency converter</h1>
      </div>
      <div className="container">
        <div className="first">
          <input
            type="number"
            placeholder="first"
            value={firstValue}
            onChange={(e) => {
              setFirstValue(e.target.value);
              setSecondValue(e.target.value * info[to]);
            }}
          />

          <Dropdown
            options={options}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>

        <div className="second">
          <input
            type="number"
            placeholder="second"
            value={secondValue}
            onChange={(e) => {
              setSecondValue(e.target.value);
              setFirstValue((info[from] / info[to]) * e.target.value);
            }}
          />
          <Dropdown
            options={options}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
