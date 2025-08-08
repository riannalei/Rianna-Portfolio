export const transforms = [
    { x: -0.5, y: -0.5, rotationZ: -5 },
    { x: 0.5, y: -1, rotationZ: 10 },
    { x: -1, y: 0, rotationZ: -15 },
    { x: 1, y: 0.5, rotationZ: 20 },
    { x: -0.5, y: 1, rotationZ: -10 },
    { x: 0.5, y: -0.5, rotationZ: 15 },
    { x: -1, y: -1, rotationZ: -20 },
    { x: 1, y: 1, rotationZ: 25 },
    { x: -0.5, y: 0.5, rotationZ: -15 },
    { x: 0.5, y: -1, rotationZ: 10 },
    { x: -1, y: 0, rotationZ: -25 },
    { x: 1, y: -0.5, rotationZ: 20 },
    { x: -0.5, y: 1, rotationZ: -10 },
    { x: 0.5, y: 0.5, rotationZ: 15 },
    { x: -1, y: -1, rotationZ: -30 },
    { x: 1, y: 1, rotationZ: 35 },
    { x: -0.5, y: -0.5, rotationZ: -15 },
    { x: 0.5, y: 1, rotationZ: 20 },
    { x: -1, y: 0.5, rotationZ: -25 },
    { x: 1, y: -1, rotationZ: 30 },
    { x: -0.5, y: 0, rotationZ: -10 },
    { x: 0.5, y: -0.5, rotationZ: 25 },
    { x: -1, y: 1, rotationZ: -20 },
    { x: 1, y: 0.5, rotationZ: 15 },
    { x: -0.5, y: -1, rotationZ: -25 },
    { x: 0.5, y: 0, rotationZ: 30 },
    { x: -1, y: -0.5, rotationZ: -35 },
    { x: 1, y: 1, rotationZ: 40 },
    { x: -0.5, y: 0.5, rotationZ: -15 },
    { x: 0.5, y: -1, rotationZ: 20 }
];

export const disperse = {
    open: (i) => ({
        x: transforms[i % transforms.length].x + "em",
        y: transforms[i % transforms.length].y + "em",
        rotateZ: transforms[i % transforms.length].rotationZ,
        transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1]},
        zIndex: 1
    }),
    closed: {
        x: 0,
        y: 0,
        rotateZ: 0,
        transition: {duration: 0.75, ease: [0.33, 1, 0.68, 1]},
        zIndex: 0
    }
};