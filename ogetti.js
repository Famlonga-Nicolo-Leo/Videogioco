const players = {
    p1: {
        x: 100,
        y: 300,
        width: 60,
        isBlocking: false,
        facing: 'right'
    },
    p2: {
        x: 700,
        y: 300,
        width: 60,
        height: 120,
        health: 100,
        isBlocking: false,
        facing: 'left'
    }
};

const controls = {
    p1: { left: 'a', right: 'd', up: 'w', block: 's'},
    p2: { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp'}
};