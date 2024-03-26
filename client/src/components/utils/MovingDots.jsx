/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const MovingDots = ({ number = 10, speed = 1 }) => {
  const [dots, setDots] = useState([])

  useEffect(() => {
    const numberOfDots = number
    const vel = speed
    const containerWidth = 800
    const containerHeight = 600

    const createDots = () => {
      const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
        id: index,
        bottom: Math.random() * containerHeight, // Posición inicial en la parte inferior
        left: Math.random() * containerWidth,
        size: Math.random() * 0.2 + 3,
        directionX: Math.random() < 0.5 ? 1 : -1,
        directionY: -1, // Movimiento hacia arriba
        isVisible: true, // Siempre visibles al principio
      }))
      setDots(newDots)
    }

    const moveDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => {
          let newBottom = dot.bottom + dot.directionY * vel

          if (newBottom < 0 || newBottom > containerHeight - dot.size) {
            dot.directionY *= -1
          }

          return {
            ...dot,
            bottom: newBottom,
          }
        })
      )
    }

    const intervalId = setInterval(() => {
      moveDots()
    }, 20) // Reducir el intervalo para un movimiento más fluido

    createDots()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <div className=''>
        {dots.map(
          (dot) =>
            dot.isVisible && (
              <div
                key={dot.id}
                className='rounded-full absolute bg-gray-300 blur-0 animate-bounce'
                style={{
                  bottom: dot.bottom,
                  left: dot.left,
                  width: dot.size,
                  height: dot.size,
                  boxShadow: '0 0 10px 5px rgba(29, 112, 212, 0.5)',
                }}
              ></div>
            )
        )}
      </div>
      <div className=''>
        {dots.map(
          (dot) =>
            dot.isVisible && (
              <div
                key={dot.id}
                className='rounded-full absolute bg-gray-300 blur-0 animate-bounce'
                style={{
                  top: dot.bottom,
                  right: dot.left,
                  width: dot.size,
                  height: dot.size,
                  boxShadow: '0 0 10px 5px rgba(255, 105, 180, 0.5)',
                }}
              ></div>
            )
        )}
      </div>
    </div>
  )
}

export default MovingDots
