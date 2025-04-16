import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        particles: {
          color: {
            value: "#9CAF88",
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 0.4,
            straight: false,
            path: {
              enable: true,
              delay: {
                value: 0.1
              }
            }
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 25,
          },
          opacity: {
            value: 0.3,
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.1,
              sync: false
            }
          },
          shape: {
            type: "circle"
          },
          size: {
            value: { min: 5, max: 8 },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 3,
              sync: false
            }
          },
          blur: {
            enable: true,
            value: 8
          },
          shadow: {
            enable: true,
            color: "#9CAF88",
            blur: 15,
            offset: {
              x: 0,
              y: 0
            }
          },
          gradient: {
            enable: true,
            opacity: 0.5,
            type: "radial"
          }
        },
        detectRetina: true,
        background: {
          color: "transparent"
        }
      }}
    />
  );
} 