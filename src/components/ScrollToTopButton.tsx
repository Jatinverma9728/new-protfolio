import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed right-6 bottom-24 z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-300`}
    >
      <button
        onClick={scrollToTop}
        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
