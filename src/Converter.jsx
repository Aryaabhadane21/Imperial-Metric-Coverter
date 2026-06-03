import { useState } from "react";
import "./converter.css";

const categories = {
  Temperature: {
    icon: "🌡",
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert(val, from, to) {
      let c =
        from === "Celsius"
          ? val
          : from === "Fahrenheit"
          ? (val - 32) * (5 / 9)
          : val - 273.15;
      if (to === "Celsius") return c;
      if (to === "Fahrenheit") return (c * 9) / 5 + 32;
      return c + 273.15;
    },
  },
  Length: {
    icon: "📐",
    units: ["Kilometers", "Miles", "Meters", "Feet"],
    toBase: { Kilometers: 1000, Miles: 1609.34, Meters: 1, Feet: 0.3048 },
    convert(val, from, to) {
      return (val * this.toBase[from]) / this.toBase[to];
    },
  },
  Weight: {
    icon: "⚖️",
    units: ["Kilograms", "Pounds", "Grams", "Ounces"],
    toBase: { Kilograms: 1000, Pounds: 453.592, Grams: 1, Ounces: 28.3495 },
    convert(val, from, to) {
      return (val * this.toBase[from]) / this.toBase[to];
    },
  },
  Speed: {
    icon: "⚡",
    units: ["km/h", "mph", "m/s", "knots"],
    toBase: { "km/h": 1 / 3.6, mph: 0.44704, "m/s": 1, knots: 0.514444 },
    convert(val, from, to) {
      return (val * this.toBase[from]) / this.toBase[to];
    },
  },
}; 

export default function Converter() {
  const [activeCat, setActiveCat] = useState("Temperature");
  const [value, setValue] = useState("0");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);

  const cat = categories[activeCat];
  const numVal = parseFloat(value) || 0;
  const result = isNaN(numVal)
    ? "—"
    : cat
        .convert(numVal, cat.units[from], cat.units[to])
        .toFixed(4)
        .replace(/\.?0+$/, "");

  function changeCategory(name) {
    setActiveCat(name);
    setValue("0");
    setFrom(0);
    setTo(1);
  }

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-title">Categories</div>
        {Object.entries(categories).map(([name, { icon }]) => (
          <button
            key={name}
            className={`cat-btn ${activeCat === name ? "active" : ""}`}
            onClick={() => changeCategory(name)}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}
      </aside>

      <main className="main">
        <div className="card" key={activeCat}>
          <div className="card-eyebrow">Unit Converter</div>
          <h1 className="card-title">{activeCat}</h1>

          <input
            className="value-input"
            type="number"
            value={value}
            placeholder="Enter value"
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="selects">
            <div className="select-group">
              <label>From</label>
              <select value={from} onChange={(e) => setFrom(+e.target.value)}>
                {cat.units.map((u, i) => (
                  <option key={u} value={i}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <button className="swap-btn" onClick={swap} title="Swap">
              ⇄
            </button>
            <div className="select-group">
              <label>To</label>
              <select value={to} onChange={(e) => setTo(+e.target.value)}>
                {cat.units.map((u, i) => (
                  <option key={u} value={i}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="result-box">
            <span className="result-label">Result</span>
            <span>
              <span className="result-value">{result}</span>
              <span className="result-unit">{cat.units[to]}</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
