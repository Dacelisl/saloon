/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const FloatingDots = ({ number = 10, speed = 1 }) => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const numberOfDots = number;
    const vel = speed;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const createDots = () => {
      const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
        id: index,
        top: Math.random() * containerHeight,
        left: Math.random() * containerWidth,
        size: Math.random() * 0.2 + 3,
        directionX: Math.random() < 0.5 ? 1 : -1,
        directionY: Math.random() < 0.5 ? 1 : -1,
        isVisible: Math.random() < 0.5,
      }));
      setDots(newDots);
    };

    const moveDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => {
          let newTop = dot.top + dot.directionY * vel;
          let newLeft = dot.left + dot.directionX * vel;

          if (newTop < 0 || newTop > containerHeight - dot.size) {
            dot.directionY *= -1;
          }

          if (newLeft < 0 || newLeft > containerWidth - dot.size) {
            dot.directionX *= -1;
          }

          return {
            ...dot,
            top: newTop,
            left: newLeft,
          };
        })
      );
    };

    const toggleVisibility = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          isVisible: Math.random() < 0.5,
        }))
      );
    };

    const intervalId = setInterval(() => {
      moveDots();
      toggleVisibility();
    }, 3000);

    createDots();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {dots.map(
        (dot) =>
          dot.isVisible && (
            <div
              key={dot.id}
              className='rounded-full absolute bg-gray-300 blur-0 animate-bounce'
              style={{
                top: `${dot.top}px`,
                left: `${dot.left}px`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                boxShadow: '0 0 10px 5px rgba(29, 112, 212, 0.5)',
              }}
            ></div>
          )
      )}
      {dots.map(
        (dot) =>
          dot.isVisible && (
            <div
              key={dot.id}
              className='rounded-full absolute bg-slate-100  animate-pulse'
              style={{
                top: `${dot.top}px`,
                right: `${dot.left}px`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                boxShadow: '0 0 10px 5px rgba(255, 105, 180, 0.5)',
              }}
            ></div>
          )
      )}
      {dots.map(
        (dot) =>
          dot.isVisible && (
            <div
              key={dot.id}
              className='rounded-full absolute bg-slate-100  animate-pulse'
              style={{
                top: `${dot.top}px`,
                left: `${dot.left}px`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                boxShadow: '0 0 10px 5px rgba(188, 196, 206, 0.5)',
              }}
            ></div>
          )
      )}
    </>
  );
};

export default FloatingDots;
