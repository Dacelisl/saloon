/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const FloatingDots = ({ number = 10, speed = 1 }) => {
  const [dots, setDots] = useState([])

  useEffect(() => {
    const numberOfDots = number // Ajusta según la cantidad de esferas que desees
    const vel = speed // Ajusta la velocidad de movimiento
    const containerWidth = 800 // Ajusta el ancho del contenedor
    const containerHeight = 600 // Ajusta la altura del contenedor

    const createDots = () => {
      const newDots = Array.from({ length: numberOfDots }, (_, index) => ({
        id: index,
        top: Math.random() * containerHeight,
        left: Math.random() * containerWidth,
        size: Math.random() * 0.2 + 3, // Tamaños aleatorios entre 10 y 30
        directionX: Math.random() < 0.5 ? 1 : -1,
        directionY: Math.random() < 0.5 ? 1 : -1,
        isVisible: Math.random() < 0.5, // Define si la esfera es visible inicialmente
      }))
      setDots(newDots)
    }

    const moveDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => {
          let newTop = dot.top + dot.directionY * vel
          let newLeft = dot.left + dot.directionX * vel

          // Verifica si la esfera está dentro de los límites del contenedor
          if (newTop < 0 || newTop > containerHeight - dot.size) {
            dot.directionY *= -1 // Invierte la dirección vertical
          }

          if (newLeft < 0 || newLeft > containerWidth - dot.size) {
            dot.directionX *= -1 // Invierte la dirección horizontal
          }

          return {
            ...dot,
            top: newTop,
            left: newLeft,
          }
        })
      )
    }

    const toggleVisibility = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          isVisible: Math.random() < 0.5, // Cambia la visibilidad aleatoriamente
        }))
      )
    }

    const intervalId = setInterval(() => {
      moveDots()
      toggleVisibility()
    }, 3000) // Ajusta el intervalo según la velocidad de movimiento y resplandor

    createDots()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <div className=''>
        {dots.map(
          (dot) =>
            dot.isVisible && (
              <div
                key={dot.id}
                className='rounded-full absolute bg-gray-300 blur-0 animate-bounce'
                style={{
                  top: dot.top,
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
                className='rounded-full absolute bg-slate-100  animate-pulse'
                style={{
                  bottom: dot.left,
                  right: dot.top,
                  width: dot.size,
                  height: dot.size,
                  boxShadow: '0 0 10px 5px rgba(255, 105, 180, 0.5)',
                }}
              ></div>
            )
        )}
      </div>
    </>
  )
}

export default FloatingDots
