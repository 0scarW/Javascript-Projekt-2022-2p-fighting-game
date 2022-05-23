const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Används för att veta main loopen ska köras
let play = false;

// Används för att koontrollera om man ska se kontrollerna eller inte
let controlbg = false;

//Canvas dimensioner
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//Bakgrundsbilden, skapad som ett objekt
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./PNG/bulkhead-wallsx3.png",
});

//Diversa divs göms och visas, samt mainloopen och timern startas
function game() {
  play = true;
  document.getElementById("menuContainerbg").style.display = "none";
  document.getElementById("menuContainer").style.display = "none";
  document.getElementById("mediumContainer").style.display = "block";
  animate();
  decreaseTimer();
}

//Objekt som innehåller att spelar info
const player = new fighter({
  position: {
    x: 1024 / 2 - 350,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  direction: 1,
  imageSrc: "./PNG/MartialHero/Sprites/Idle-sheet.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 170,
  },
  sprites: {
    idle: {
      imageSrc: "./PNG/MartialHero/Sprites/Idle-sheet.png",
      framesMax: 8,
    },
    idleBack: {
      imageSrc: "./PNG/MartialHero/Sprites/Idle-Back.png",
      framesMax: 8,
    },
    runBack: {
      imageSrc: "./PNG/MartialHero/Sprites/Run-sheet-sheet.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./PNG/MartialHero/Sprites/Run-sheet.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./PNG/MartialHero/Sprites/Jump-sheet.png",
      framesMax: 2,
    },
    jumpBack: {
      imageSrc: "./PNG/MartialHero/Sprites/JumpBack.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./PNG/MartialHero/Sprites/Fall.png",
      framesMax: 2,
    },
    fallBack: {
      imageSrc: "./PNG/MartialHero/Sprites/FallBack.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./PNG/MartialHero/Sprites/Attack1.png",
      framesMax: 7,
    },
    attack1Back: {
      imageSrc: "./PNG/MartialHero/Sprites/Attack1back.png",
      framesMax: 7,
    },
    takeHit: {
      imageSrc: "./PNG/MartialHero/Sprites/TakeHit-sheet.png",
      framesMax: 4,
    },
    takeHitBack: {
      imageSrc: "./PNG/MartialHero/Sprites/TakeHitBack-sheet.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./PNG/MartialHero/Sprites/Death-sheet.png",
      framesMax: 32,
    },
    parry: {
      imageSrc: "./PNG/MartialHero/Sprites/Parry1.png",
      framesMax: 4,
    },
    parryBack: {
      imageSrc: "./PNG/MartialHero/Sprites/Parry1-sheet.png",
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: 75,
      y: 35,
    },
    width: 175,
    height: 50,
  },
  staminaID: "#playerStamina",
});

//Objekt som innehåller att spelar info
const enemy = new fighter({
  position: {
    x: 1024 / 2 + 350,
    y: 330,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  direction: 1,
  imageSrc: "./PNG/MartialHero2/Sprites/IdleBack.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 185,
  },
  sprites: {
    idle: {
      imageSrc: "./PNG/MartialHero2/Sprites/Idle-sheet.png",
      framesMax: 4,
    },
    idleBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/IdleBack.png",
      framesMax: 4,
    },
    runBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/RunBack.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./PNG/MartialHero2/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./PNG/MartialHero2/Sprites/Jump.png",
      framesMax: 2,
    },
    jumpBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/JumpBack.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./PNG/MartialHero2/Sprites/Fall.png",
      framesMax: 2,
    },
    fallBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/FallBack.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./PNG/MartialHero2/Sprites/Attack1.png",
      framesMax: 4,
    },
    attack1Back: {
      imageSrc: "./PNG/MartialHero2/Sprites/Attack1Back.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./PNG/MartialHero2/Sprites/TakeHit.png",
      framesMax: 3,
    },
    takeHitBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/TakeHitBack.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./PNG/MartialHero2/Sprites/Death-sheet.png",
      framesMax: 24,
    },
    parry: {
      imageSrc: "./PNG/MartialHero2/Sprites/parry.png",
      framesMax: 4,
    },
    parryBack: {
      imageSrc: "./PNG/MartialHero2/Sprites/parryback.png",
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 47,
    },
    width: 175,
    height: 50,
  },
  staminaID: "#enemyStamina",
});

//Alla olika tangenter man kan använda
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  o: {
    pressed: false,
  },
};

//Kollar om tangent är neddtryckt
window.addEventListener("keydown", (event) => {
  if (!player.move) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "s":
        //kollar om man kan hoppa två gånger
        if (player.position.y == 330) {
          player.jumps = 2;
          player.velocity.y = -20;
          player.jumps--;
        } else if (player.jumps == 1) {
          player.velocity.y = -15;
          player.jumps--;
        }
        break;
      case "w":
        player.attack();
        break;
      case "q":
        keys.q.pressed = true;
        player.lastKey = "q";
        break;
    }
  }
  if (!enemy.move) {
    switch (event.key) {
      case "l":
        keys.l.pressed = true;
        enemy.lastKey = "l";
        break;
      case "j":
        keys.j.pressed = true;
        enemy.lastKey = "j";
        break;
      case "k":
        //kollar om man kan hoppa två gånger
        if (enemy.position.y == 330) {
          enemy.jumps = 2;
          enemy.velocity.y = -20;
          enemy.jumps--;
        } else if (enemy.jumps == 1) {
          enemy.velocity.y = -15;
          enemy.jumps--;
        }
        break;
      case "i":
        enemy.attack();
        break;
      case "o":
        keys.o.pressed = true;
        enemy.lastKey = "o";
        break;
    }
  }
});

//Kollar om tangent är neddtryckt
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    case "l":
      keys.l.pressed = false;
      break;
    case "j":
      keys.j.pressed = false;
      break;
  }
});
