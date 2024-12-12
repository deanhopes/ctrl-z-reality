"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const QuantumLoader = () => {
  const textRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadingTexts = [
    "Calibrating quantum stabilizers...",
    "Synchronizing your timeline variants...",
    "Reality shift ready. Choose wisely."
  ];

  const createEncryptionEffect = (element: HTMLDivElement, onComplete: () => void) => {
    const originalText = element.textContent || '';
    const glitchChars = '!<>-_\\/[]{}—=+*^?#_$%&@';
    const encryptionSpeed = 20;
    let iterations = 0;
    
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join('');
      
      iterations += 1/2;
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
        onComplete();
      }
    }, encryptionSpeed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      textRefs.current.forEach((textRef, index) => {
        // Ensure initial state
        gsap.set(textRef, { opacity: 0 });

        tl
          .to(textRef, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              createEncryptionEffect(textRef, () => {
                gsap.to(textRef, {
                  opacity: 0.7,
                  duration: 0.05,
                  repeat: 2,
                  yoyo: true,
                });
              });
            }
          })
          .to(textRef, {
            opacity: 1,
            duration: 1.5
          })
          .to(textRef, {
            opacity: 0.8,
            duration: 0.05,
            repeat: 2,
            yoyo: true
          })
          .to(textRef, {
            opacity: 0,
            duration: 0.2
          });
      });

      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-6">
        {loadingTexts.map((text, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) textRefs.current[index] = el;
            }}
            className="text-white font-mono text-2xl text-center whitespace-nowrap"
            aria-hidden="true"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuantumLoader;