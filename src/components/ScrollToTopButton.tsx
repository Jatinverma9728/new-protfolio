import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <button
        onClick={scrollToTop}
        className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
