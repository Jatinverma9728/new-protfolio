import Spline from "@splinetool/react-spline";

export default function Scene3D() {
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
      <Spline
        scene="https://prod.spline.design/PEUuCFu8IXVsg67H/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
