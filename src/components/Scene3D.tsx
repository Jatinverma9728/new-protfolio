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
      <Suspense fallback={<div>Loading...</div>}>
        <LazySpline
          scene="https://prod.spline.design/FdCkav61e7Zyz90s/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            willChange: "transform", // Optimize GPU rendering
            transform: "translateZ(0)", // Force GPU acceleration
          }}
        />
      </Suspense>
    </div>
  );
});

Scene3D.displayName = "Scene3D";

export default Scene3D;
