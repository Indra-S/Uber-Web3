import { useContext } from "react";
import { UberContext } from "../context/uberContext";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = MapboxGeocoder({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
});

const style = {
  wrapper: `pt-2`,
  searchHeader: `w-full font-bold text-left flex items-center text-3xl p-4 overflow-auto scrollbar-hide`,
  inputBoxes: `flex flex-col mb-4 relative`,
  inputBox: `h-10 mx-4 border-2 bg-[#eeeeee] flex items-center my-1 py-1 px-2`,
  focusedInputBox: `border-black`,
  svgContainer: `mx-1`,
  input: `my-2 rounded-2 p-2 outline-none border-none bg-transparent  h-full w-full`,
  verticalLine: `w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]`,
  suggestion: `absolute top-24 left-0 right-0 bg-white z-10 border border-gray-300 rounded-b-lg overflow-auto max-h-60 scrollbar-hide `,
  suggestion2: `absolute top-24 left-0 right-0 bg-white z-10 border border-gray-300 rounded-b-lg overflow-auto max-h-60 scrollbar-hide `,

};

const LocationSelector = () => {
  const [inFocus, setInFocus] = useState("from");
  const { pickup, setPickup, dropoff, setDropoff } = useContext(UberContext);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onInputChange = async (input) => {
    setLoading(true);

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: input,
          types: ["address"]
        })
        .send();

      const features = response.body.features;
      setSuggestions(features);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const onInputChange2 = async (input) => {
    setLoading2(true);

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: input,
          types: ["address"]
        })
        .send();

      const features = response.body.features;
      setSuggestions2(features);
    } catch (error) {
      console.error(error);
    }

    setLoading2(false);
  };

  function handleSuggestionClick(feature) {
    setPickup(feature.place_name);
    setSuggestions([]);
  }

  function handleSuggestion2Click(feature) {
    setDropoff(feature.place_name);
    setSuggestions2([]);
  }
  

  return (
    <div className={style.wrapper}>
      <div className={style.searchHeader}>
        {inFocus === "from" ? "Your Pick up loc?" : "Where to?"}
      </div>
      <div className={style.inputBoxes}>
        <div
          className={`${style.inputBox} ${
            inFocus === "from" && style.focusedInputBox
          }`}
        >
          <div className={style.svgContainer}>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          </div>
          <input
            className={style.input}
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              onInputChange(e.target.value);
            }}
            onFocus={() => setInFocus("from")}
          />
          {loading && <p>Loading suggestions...</p>}
          {suggestions.length > 0 && inFocus === "from" && (
            <ul className={style.suggestion}>
              {suggestions.map((feature) => (
                <li
                  key={feature.id}
                  onClick={() => handleSuggestionClick(feature)}
                >
                  {feature.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={style.verticalLine} />
        <div
          className={`${style.inputBox} ${
            inFocus === "to" && style.focusedInputBox
          }`}
        >
          <div className={style.svgContainer}>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 10h-4v4h4v-4zM7 7v10h10V7H7z"
              />
            </svg>
          </div>
          <input
            className={style.input}
            placeholder="Where to?"
            value={dropoff}
            onChange={(e) => {
              setDropoff(e.target.value);
              onInputChange2(e.target.value);
            }}
            onFocus={() => setInFocus("to")}
          />

          {loading && <p>Loading suggestions...</p>}
          {suggestions2.length > 0 && inFocus === "to" && (
            <ul className={style.suggestion2}>
              {suggestions2.map((feature) => (
                <li
                  key={feature.id}
                  onClick={() => handleSuggestion2Click(feature)}
                >
                  {feature.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
