const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './images/flapetronset.png';

// Réglages général
let gamePlaying = false;
const gravity = .5;
const speed = 6.1;
const size = [51, 36];
const jump = -11;
const cTenth = (canvas.width / 10);

// Réglages d'obstacles
const wallWidth = 78;
const wallGap = 270;
const wallLoc = () => (Math.random() * ((canvas.height - (wallGap + wallWidth)) - wallWidth)) + wallWidth;


let index = 0;
let bestScore = 0;
let actualScore = 0;
let obstacles = [];
let flight;
let flyHeight;

const setup = () => {
    actualScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] / 2);
    
    obstacles = Array(3).fill().map((a, i) => [canvas.width + (i * (wallGap + wallWidth)), wallLoc()]);
}


const render = () => {
    index++;

    // Background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 
    0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 
    0, canvas.width, canvas.height);

    if(gamePlaying) {

        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);

    } else {
        // Player
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);

        // Texte
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
        ctx.fillText('Cliquez pour jouer', 48, 535);
        ctx.font = "bold 30px courier";
    }

    // Obstacles
    if(gamePlaying) {
        obstacles.map(obstacle => {
            obstacle[0] -= speed;

            // Haut
            ctx.drawImage(img, 432, 588 - obstacle[1], wallWidth, obstacle[1], obstacle[0], 0, wallWidth, obstacle[1]);
            // Bas
            ctx.drawImage(img, 432 + wallWidth, 108, wallWidth, canvas.height - obstacle[1] + wallGap, 
            obstacle[0], obstacle[1] + wallGap, wallWidth, canvas.height - obstacle[1] + wallGap);

            if(obstacle[0] <= -wallWidth) {
                actualScore++
                bestScore = Math.max(bestScore, actualScore);

                // Suppression & Création
                obstacles = [...obstacles.slice(1), [obstacles[obstacles.length-1][0] + wallGap + wallWidth, wallLoc()]];
            }

            // Échec - Fin de partie
            if([
                obstacle[0] <= cTenth + size[0],
                obstacle[0] + wallWidth >= cTenth,
                obstacle[1] > flyHeight || obstacle[1] + wallGap < flyHeight + size[1]
            ].every(elem => elem)) {
                gamePlaying = false;
                setup();
            }
        })
    };

    document.querySelector('#bestScore').innerHTML = `Meilleur : ${bestScore}`;
    document.querySelector('#actualScore').innerHTML = `Actuel : ${actualScore}`;

    window.requestAnimationFrame(render);
};

setup();
img.onload = render;
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;