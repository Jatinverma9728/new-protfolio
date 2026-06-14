import Typewriter from "typewriter-effect";

const TypewriterText = () => {
  return (
    <div style={{ display: "inline" }}>
      <Typewriter
        options={{
          strings: [
            "Creative Developer",
            "UI/UX Designer",
            "Full Stack Developer",
            "AI Web Developer",
          ],
          autoStart: true,
          loop: true,
          delay: 50,
          deleteSpeed: 30,
          cursor: "|",
          wrapperClassName: "typewriter-wrapper",
          cursorClassName: "typewriter-cursor",
        }}
      />
    </div>
  );
};

export default TypewriterText;
