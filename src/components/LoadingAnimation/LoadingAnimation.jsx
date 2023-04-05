import React from "react";
import {
  BarWave,
  FillingBottle,
  Hypnosis,
  SpinStretch,
} from "react-cssfx-loading";

const LoadingAnimation = () => {
  const size = "60px";
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        zIndex: 8000,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        height: "100%",
        width: "100vw",
        // backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <SpinStretch
          color="#007ACC"
          style={{
            opacity: 1,
          }}
          width={size}
          height={size}
          duration="2s"
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
