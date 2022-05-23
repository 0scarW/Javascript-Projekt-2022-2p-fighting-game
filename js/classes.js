class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  //animerar bilder
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  // håller koll på vilken frame som visas
  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    direction,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    staminaID,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.health = 100;
    this.color = color;
    this.isAttacking;
    this.direction = direction;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.dead = false;
    this.jumps = 2;
    this.stamina = 100;
    this.staminaID = staminaID;
    this.move = false;

    for (const sprite in sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }
  update() {
    this.draw();
    // Ifall man är död kan man inte göra något
    if (!this.dead) {
      this.animateFrames();
      this.staminaRegeneration();
    }

    //ändrar attackbox position
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    //ändrar position beroende på hastighet
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravitation
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += gravity;
    }
  }

  staminaRegeneration() {
    if (this.stamina >= 100) {
      this.stamina = 100;
      return;
    } else {
      this.stamina += 0.25;
      this.animateStamina();
    }
  }

  animateStamina() {
    gsap.to(this.staminaID, {
      width: this.stamina + "%",
    });
  }

  //Drar lite stamina när man attackerar och beroende på direction spelas olika animationer upp
  attack() {
    if (this.stamina - 33 >= 0) {
      this.stamina -= 33;
      this.animateStamina();
      if (this.direction == 0) {
        this.swithSprite("attack1");
      } else {
        this.swithSprite("attack1Back");
      }
      this.isAttacking = true;
    } else {
      return;
    }
  }

  //Om man blir träffad avgör funktionen om man ska ta skada eller inte och om man dör.
  takesHit() {
    if (timer <= 0) {
      pass;
    }
    this.health -= 20;

    if (this.health <= 0) {
      this.velocity.x = 0;
      this.swithSprite("death");
    } else {
      if (this.direction == 0) {
        this.swithSprite("takeHit");
      } else if (this.direction < 0) {
        this.swithSprite("takeHitBack");
      }
    }
  }

  //ändrar animationerna
  swithSprite(sprite) {
    //Nedanstående if-statements är som en hierarki vilka som prioriteras
    if (this.image === this.sprites.death.image) {
      this.move = true;
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    if (
      (this.image === this.sprites.parry.image &&
        this.framesCurrent < this.sprites.parry.framesMax - 1) ||
      (this.image === this.sprites.parryBack.image &&
        this.framesCurrent < this.sprites.parryBack.framesMax - 1)
    )
      return;
    if (
      (this.image === this.sprites.attack1.image &&
        this.framesCurrent < this.sprites.attack1.framesMax - 1) ||
      (this.image === this.sprites.attack1Back.image &&
        this.framesCurrent < this.sprites.attack1Back.framesMax - 1)
    )
      return;

    if (
      (this.image === this.sprites.takeHit.image &&
        this.framesCurrent < this.sprites.takeHit.framesMax - 1) ||
      (this.image === this.sprites.takeHitBack.image &&
        this.framesCurrent < this.sprites.takeHitBack.framesMax - 1)
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
        }
        break;
      case "idleBack":
        if (this.image !== this.sprites.idleBack.image) {
          this.image = this.sprites.idleBack.image;
          this.framesMax = this.sprites.idleBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "runBack":
        if (this.image !== this.sprites.runBack.image) {
          this.image = this.sprites.runBack.image;
          this.framesMax = this.sprites.runBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jumpBack":
        if (this.image !== this.sprites.jumpBack.image) {
          this.image = this.sprites.jumpBack.image;
          this.framesMax = this.sprites.jumpBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fallBack":
        if (this.image !== this.sprites.fallBack.image) {
          this.image = this.sprites.fallBack.image;
          this.framesMax = this.sprites.fallBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1Back":
        if (this.image !== this.sprites.attack1Back.image) {
          this.image = this.sprites.attack1Back.image;
          this.framesMax = this.sprites.attack1Back.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHitBack":
        if (this.image !== this.sprites.takeHitBack.image) {
          this.image = this.sprites.takeHitBack.image;
          this.framesMax = this.sprites.takeHitBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "parry":
        if (this.image !== this.sprites.parry.image) {
          this.image = this.sprites.parry.image;
          this.framesMax = this.sprites.parry.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "parryBack":
        if (this.image !== this.sprites.parryBack.image) {
          this.image = this.sprites.parryBack.image;
          this.framesMax = this.sprites.parryBack.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
