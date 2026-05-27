import { memo } from "react";

// Lazy load the Spline component

const Scene3D = memo(() => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the video covers the entire area
        }}
      >
        <source src="/1.mp4" type="video/mp4" />
        Background Video
      </video>
    </div>
  );
});

Scene3D.displayName = "Scene3D";

export default Scene3D;
