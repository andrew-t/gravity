# gravity
A simple game where two players take turns blasting missiles at each other through a solar system.

## Physics Notes
This game uses entirely Newtonian physics. Quantum and relativistic effects are ignored.

The simulation uses Euler's method: every frame, the particles are advanced in a straight line, and then accelerated by the gravitational pull of all planets. The simulation updates whenever the browser redraws, so the faster your computer, the more accurate the simulation.

## History
This is the third version. The first was a DOS binary, now long-lost to the world (as far as I know; possibly I have a backup somewhere that includes it).

The second version was built years ago to teach myself jQuery, and so is all DOM elements being created and moving around on a giant `setInterval` loop. It is on the `gh-pages` branch, and hosted at [github.andrewt.net/gravity](http://github.andrewt.net/gravity).

This version is designed for modern browsers: it uses ES6, canvases, and `requestAnimationFrame` to run smoothly and crisply at any resolution, without the gameplay changing when the screen size does. It's hosted at [andrewt.net/gravity](https://www.andrewt.net/gravity).

