//Kollar ifall spelarens attackbox överlappar med motståndarens
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

//Avgör vem som vinner, när tiden tagit slut slutar spelet efter 7 sekunder
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displaytext").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displaytext").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#displaytext").innerHTML = "Player 1 Wins";
  } else if (player.health < enemy.health) {
    document.querySelector("#displaytext").innerHTML = "Player 2 Wins";
  }
  setTimeout(() => {
    play = false;
  }, 7000);
}

// Hur många sekunder spelet är
let timer = 60;
let timerId;

// Gör så att timern räknas ned med en sekund och att det visas på skärmen
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  // slutar spelet baserat på tid
  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
    setTimeout(() => {
      play = false;
    }, 7000);
  }
}

//mainloopen
function animate() {
  //parry för spelare 1
  if (keys.q.pressed && player.lastKey === "q" && player.stamina - 15 > 0) {
    player.stamina -= 0.75;
    setTimeout(() => {
      keys.q.pressed = false;
    }, 1000);
  }
  //parry för spelare 2
  if (keys.o.pressed && enemy.lastKey === "o" && enemy.stamina - 15 > 0) {
    enemy.stamina -= 0.75;
    setTimeout(() => {
      keys.o.pressed = false;
    }, 1000);
  }

  //bestämer vilken rikting spelarena har
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

  //gör att animate loopas
  if (play) {
    window.requestAnimationFrame(animate);
  } else {
    document.getElementById("endMenuContainerbg").style.display = "block";
    document.getElementById("mediumContainer").style.display = "none";
  }

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgb(0, 0, 0, 0.1";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //uppdaterar
  background.update();
  player.update();
  enemy.update();
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Spelare 1 sidledes rörelse
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

  //spelare 1 hoppa
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

  //Spelare 2 sidledes rörelse
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

  //spelare 2 hoppa
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

  //Se om man träffar attack eller en parry
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

  // spelare 1 missar/attackerar inte längre
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  //Se om man träffar attack eller en parry
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

  // spelare 2 missar/attackerar inte längre
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // sluta spel baserat på hp
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

// funktion för att visa kontrollerna
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

// startar om sidan så man kan spela igen
function playAgain() {
  window.location.reload();
}

//stänger ner sidan om man inte vill spela mer
function quit() {
  window.close();
}
