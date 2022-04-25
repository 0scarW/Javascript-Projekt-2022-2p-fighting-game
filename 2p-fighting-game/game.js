const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

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
    x: 0,
    y: 0,
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
  imageSrc: "./PNG/MartialHero/Sprites/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 165,
  },
  sprites: {
    idle: {
      imageSrc: "./PNG/MartialHero/Sprites/Idle.png",
      framesMax: 8,
    },
    idleBack: {
      imageSrc: "./PNG/MartialHero/Sprites/IdleBack.png",
      framesMax: 8,
    },
    runBack: {
      imageSrc: "./PNG/MartialHero/Sprites/RunBack.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./PNG/MartialHero/Sprites/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./PNG/MartialHero/Sprites/Jump.png",
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
      imageSrc: "./PNG/MartialHero/Sprites/Attack2.png",
      framesMax: 6,
    },
    attack1Back: {
      imageSrc: "./PNG/MartialHero/Sprites/Attack1Back.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./PNG/MartialHero/Sprites/TakeHit.png",
      framesMax: 4,
    },
    takeHitBack: {
      imageSrc: "./PNG/MartialHero/Sprites/TakeHitBack.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./PNG/MartialHero/Sprites/Death.png",
      framesMax: 6,
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
});

const enemy = new fighter({
  position: {
    x: 400,
    y: 100,
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
    y: 180,
  },
  sprites: {
    idle: {
      imageSrc: "./PNG/MartialHero2/Sprites/Idle.png",
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
      imageSrc: "./PNG/MartialHero2/Sprites/Attack2.png",
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
      imageSrc: "./PNG/MartialHero2/Sprites/Death.png",
      framesMax: 7,
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
});

console.log(player);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
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

  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  //shop.update();
  c.fillStyle = "rgb(0, 0, 0, 0.3";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Player movment
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.swithSprite("runBack");
  } else if (keys.d.pressed && player.lastKey === "d") {
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
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.swithSprite("runBack");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
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
    enemy.takesHit();
    player.isAttacking = false;

    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
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
    player.takesHit();
    enemy.isAttacking = false;
    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
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

animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        if (player.position.y == 330) {
          player.jumps = 2;
          player.velocity.y = -20;
          player.jumps--;
        } else if (player.jumps == 1) {
          player.velocity.y = -15;
          player.jumps--;
        }
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (enemy.position.y == 330) {
          enemy.jumps = 2;
          enemy.velocity.y = -20;
          enemy.jumps--;
        } else if (enemy.jumps == 1) {
          enemy.velocity.y = -15;
          enemy.jumps--;
        }
        break;
      case "ArrowDown":
        enemy.attack();
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

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
