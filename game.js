const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let play = false;
let controlbg = false;

// PlaySound = function () {
//   var audio = new Audio("./audio/ChineseRapFull--lGFpyuuchg-192k-1646982255669.mp3");
//   audio.loop = true;
//   audio.play();
// }

// PlaySound()

// const docWidth =
//   window.innerWidth ||
//   document.documentElement.clientWidth ||
//   document.body.clientWidth;
// const docHeight =
//   window.innerHeight ||
//   document.documentElement.clientHeight ||
//   document.body.clientHeight;

// console.log(docWidth, docHeight);

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  //scale: 3,
  imageSrc: "./PNG/bulkhead-wallsx3.png",
});

// const shop = new Sprite({
//   position: {
//     x: 600,
//     y: 128,
//   },
//   imageSrc: "./PNG/shop.png",
//   scale: 2.75,
//   framesMax: 6,
// });

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
      framesMax: 7  ,
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

function animate() {
  if (keys.q.pressed && player.lastKey === "q" && player.stamina - 15 > 0) {
    player.stamina -= 0.75;
    setTimeout(() => {
      keys.q.pressed = false;
    }, 1000);
  }
  if (keys.o.pressed && enemy.lastKey === "o" && enemy.stamina - 15 > 0) {
    enemy.stamina -= 0.75;
    setTimeout(() => {
      keys.o.pressed = false;
    }, 1000);
  }

  if (player.position.x < enemy.position.x + enemy.width / 2) {
    player.direction = 0;
    player.attackBox.offset.x = 75;
    enemy.direction = -1;
    enemy.attackBox.offset.x = -165;
  } else if (player.position.x > enemy.position.x + enemy.width / 2) {
    player.direction = -1;
    player.attackBox.offset.x = -178;
    enemy.direction = 0;
    enemy.attackBox.offset.x = 65;
  }

  if (play) {
    window.requestAnimationFrame(animate);
  } else {
    document.getElementById("endMenuContainerbg").style.display = "block";
    document.getElementById("mediumContainer").style.display = "none";
  }

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  //shop.update();
  c.fillStyle = "rgb(0, 0, 0, 0.1";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Player movment
  if (keys.a.pressed && player.lastKey === "a" && player.position.x > 0) {
    player.velocity.x = -5;
    player.swithSprite("runBack");
  } else if (
    keys.d.pressed &&
    player.lastKey === "d" &&
    player.position.x < 960
  ) {
    player.velocity.x = 5;
    player.swithSprite("run");
  } else {
    if (player.direction == 0) {
      player.swithSprite("idle");
    } else if (player.direction < 0) {
      player.swithSprite("idleBack");
    }
  }

  if (player.velocity.y < 0) {
    if (player.direction == 0) {
      player.swithSprite("jump");
    } else if (player.direction < 0) {
      player.swithSprite("jumpBack");
    }
  } else if (player.velocity.y > 0) {
    if (player.direction == 0) {
      player.swithSprite("fall");
    } else if (player.direction < 0) {
      player.swithSprite("fallBack");
    }
  }

  //Enemy movment
  if (keys.j.pressed && enemy.lastKey === "j" && enemy.position.x > 0) {
    enemy.velocity.x = -5;
    enemy.swithSprite("runBack");
  } else if (
    keys.l.pressed &&
    enemy.lastKey === "l" &&
    enemy.position.x < 960
  ) {
    enemy.velocity.x = 5;
    enemy.swithSprite("run");
  } else {
    if (enemy.direction == 0) {
      enemy.swithSprite("idle");
    } else if (enemy.direction < 0) {
      enemy.swithSprite("idleBack");
    }
  }

  if (enemy.velocity.y < 0) {
    if (enemy.direction == 0) {
      enemy.swithSprite("jump");
    } else if (enemy.direction < 0) {
      enemy.swithSprite("jumpBack");
    }
  } else if (enemy.velocity.y > 0) {
    if (enemy.direction == 0) {
      enemy.swithSprite("fall");
    } else if (enemy.direction < 0) {
      enemy.swithSprite("fallBack");
    }
  }

  // detect collision and gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    if (keys.o.pressed && enemy.velocity.x == 0) {
      if (enemy.direction == 0) {
        enemy.swithSprite("parry");
      } else if (enemy.direction < 0) {
        enemy.swithSprite("parryBack");
      }
      enemy.stamina = 100;
      if (enemy.health <= 50) {
        enemy.health += 50;
        gsap.to("#enemyHealth", {
          width: enemy.health + "%",
        });
      }
      enemy.animateStamina();
      player.stamina = 0;
      player.animateStamina();
    } else {
      enemy.takesHit();
      player.isAttacking = false;
      gsap.to("#enemyHealth", {
        width: enemy.health + "%",
      });
    }
  }

  // playermisses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    if (keys.q.pressed && player.velocity.x == 0) {
      if (player.direction == 0) {
        player.swithSprite("parry");
      } else if (player.direction < 0) {
        player.swithSprite("parryBack");
      }
      player.stamina = 100;
      if (player.health <= 50) {
        player.health += 50;
        gsap.to("#playerHealth", {
          width: player.health + "%",
        });
      }
      player.animateStamina();
      enemy.stamina = 0;
      enemy.animateStamina();
    } else {
      player.takesHit();
      enemy.isAttacking = false;
      gsap.to("#playerHealth", {
        width: player.health + "%",
      });
    }
  }

  // enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

function game() {
  play = true;
  document.getElementById("menuContainerbg").style.display = "none";
  document.getElementById("menuContainer").style.display = "none";
  document.getElementById("mediumContainer").style.display = "block";
  animate();
  decreaseTimer();
}

function showControls() {
  if (!controlbg) {
    controlbg = true;
    document.getElementById("menuContainerbg").style.backgroundImage =
      "url('./PNG/bg/menu3-controlls.png')";
  } else {
    controlbg = false;
    document.getElementById("menuContainerbg").style.backgroundImage =
      "url('./PNG/bg/menu3.png')";
  }
}

function playAgain() {
  window.location.reload();
}

function quit() {
  window.close();
}

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
