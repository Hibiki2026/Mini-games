# MINI GAMES

8 games bundled locally under `games/`, played inside this site's game screen.

Open `index.html` through a static HTTP server. No build step or API key is required.
The GitHub Pages workflow publishes the collection on pushes to main.

Games: Suika, Garden-GNOME, pacman, floppy2048, Floppy-Bird, Tetris, block-blast, 2048.
Original source repositories: https://github.com/Hibiki2026
The imported game code retains its existing features and save behavior. Suika requires the Matter.js CDN used by its source.

The collection loads only the selected game, unloads it when returning to the lobby,
and supports category filters, direct game hashes, restart and fullscreen.
