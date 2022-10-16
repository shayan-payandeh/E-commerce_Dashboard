/* eslint-disable prettier/prettier */
import { ScaleLoader } from "react-spinners";
import React, { useState } from "react";

function Spinner() {
  const [loading] = useState(true);

  return (
    <div
      className="sweet-loading"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <ScaleLoader
        loading={loading}
        height={10}
        width={9}
        radius={50}
        color="blue"
      />
    </div>
  );
}

export default Spinner;
