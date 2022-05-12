import { useEffect, useState } from "react";
import { instance } from "./App";

function Actual() {
  const [usdUah, setUsdUah] = useState(0);
  const [eurUah, setEurUah] = useState(0);

  useEffect(() => {
    (async function () {
      const response = await instance.get(`usd.json`);
      setUsdUah(response.data.usd.uah);
    })();

    (async function () {
      const response = await instance.get(`eur.json`);
      setEurUah(response.data.eur.uah);
    })();
  });

  return (
    <div className="actual">
      <div className="usd_uah">
        <span>{1 + " " + "USD" + " = " + usdUah.toFixed(2) + " " + "UAH"}</span>
      </div>
      <div className="eur_uah">
        <span>{1 + " " + "EUR" + " = " + eurUah.toFixed(2) + " " + "UAH"}</span>
      </div>
    </div>
  );
}

export default Actual;
