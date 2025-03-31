import { Suspense, lazy } from "react";
import { memo } from "react";

// Lazy load the Spline component
const LazySpline = lazy(() => import("@splinetool/react-spline"));

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
      <img
        src="/public/line-v-2.gif" // Path to your GIF in the public folder
        alt="Background GIF"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the GIF covers the entire area
        }}
      />
    </div>
  );
});

Scene3D.displayName = "Scene3D";

export default Scene3D;
