import Typewriter from "typewriter-effect";

const TypewriterText = () => {
  return (
    <div className="inline">
      <span className="text-gray-200">I'm </span>
      <span className="text-gray-200">Jatin </span>
      <span className="text-orange-500">Verma</span>
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
        }}
      />
    </div>
  );
};

export default TypewriterText;
