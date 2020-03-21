import React from "react";
import reactDOM from "react-dom";
import Landing from "./../Components/Landing/Landing";

it("renders without crashing", () => {
  const div = document.createElement("div");
  reactDOM.render(<button></button>, div);
});
