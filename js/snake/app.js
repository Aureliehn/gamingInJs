// preparation du canvas

const canvas = document.getElementById('canvas');
// méthode associée à la 2D
const ctx = canvas.getContext('2d');



// Var


// vitesse sur x
vx = 10;
// vitesse sur y
vy= 0;
// pomme x
let pommeX= 0;
// pomme y
let pommeY=0;

// dessiner le serpent
// dans le tableau le 1er objet = tête du snake, chaque objet correspond à un morceau (un carré avec sa position x y)
let snake = [{x:140, y:150},{x:130, y:150},{x:120, y:150},{x:110, y:150},]
let score = 0;

let bugDirection = false;

function animation(){

    setTimeout(function(){

        bugDirection= false;

        nettoieCanvas();

        dessinePomme();

        faireAvancerSerpent();

        if(finDuJeu()){
            recommencer();
            return;
        }

        dessineLeSerpent();
        // recusion
        animation();

        

    },100);

}
animation();
creerPomme();

function nettoieCanvas(){
    // dessiner le carré
    // remplissage (fillRect=remplir un rectangle)
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height);
    // coup de crayon contour
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0, canvas.clientWidth, canvas.height);
}

function dessineLesMorceaux(morceau){
    ctx.fillStyle = "#00fe14";
    ctx.fillRect(morceau.x, morceau.y, 10,10);
    ctx.strokeStyle= "black";
    ctx.strokeRect(morceau.x, morceau.y, 10, 10);

}
function dessineLeSerpent(){
    snake.forEach(morceau =>{
        dessineLesMorceaux(morceau);
    })
}
dessineLeSerpent();
// avancer horizontalement
// ajouter une tete enlever une queue
function faireAvancerSerpent(){
    const head= {x: snake[0].x +vx, y: snake[0].y +vy};
    snake.unshift(head);
    
    const serpentMangePomme = snake[0].x === pommeX && snake [0].y === pommeY;
    if(serpentMangePomme) {
        score += 10;
        document.getElementById('score').innerHTML = score;

        creerPomme();
    } else {
        snake.pop();
    }

}

dessineLeSerpent();

document.addEventListener('keydown', changerDirection);
function changerDirection(event){
    if(bugDirection) return;
    bugDirection= true;

    console.log(event);
    const fleche_Gauche = 37;
    const fleche_Droite =39;
    const fleche_Bas= 40 ;
    const fleche_haut= 38;

    const direction =event.keyCode;

    const monter = vy === -10;
    const descendre = vy === 10;
    const droite = vx === 10;
    const gauche = vx === -10;

    if(direction === fleche_Gauche && !droite ) { vx = -10; vy=0; }
    if(direction === fleche_haut && !descendre ) { vx = 0; vy= -10; }
    if(direction === fleche_Droite && !gauche ) { vx = 10; vy= 0; }
    if(direction === fleche_Bas && !monter ) { vx = 0; vy = 10; }
}

function random(){
    return Math.round((Math.random()*290)/10)*10;
}
function creerPomme(){
    pommeX = random();
    pommeY=random();
    console.log (pommeY, pommeX);

    snake.forEach(function(part){
        const serpentSurPomme = part.x == pommeX && part.y == pommeY;
        if(serpentSurPomme){
            creerPomme();
        }
    })
}

function dessinePomme(){

    ctx.fillStyle ='red';
    ctx.strokeStyle = 'darkred';
    ctx.beginPath();
    ctx.fillRect(pommeX, pommeY, 10, 10);
    ctx.arc(pommeX + 5, pommeY +5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

}

function finDuJeu(){
    let snakeSansTete= snake.slice(1,-1);
    let mordu = false;
    snakeSansTete.forEach(morceau=>{
        if(morceau.x==snake[0].x && morceau.y === snake[0].y)
        mordu = true;
    }
        )
    const toucheMurGauche = snake[0].x<-1;
    const toucheMurDroite = snake[0].x >canvas.width -10;
    const toucheMurTop = snake[0].y <-1;
    const toucheMurBottom = snake[0].y >canvas.height -10;


    let gameOver = false;

    if (mordu || toucheMurBottom || toucheMurDroite || toucheMurGauche || toucheMurTop){
    gameOver= true;
}
        return gameOver;
}

function recommencer(){
    const restart= document.getElementById('recommencer');
    restart.style.display='block';

    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 32) {
            document.location.reload(true);
        }
    })
}
  