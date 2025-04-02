// CISOScene.js
window.CISOScene = class CISOScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CISOScene' });
    this.dialogueScrollOffset = 0;
  }

  preload() {
    // this.load.image('Office_Design_3', 'Assets/Office Design Sprites/Office_Design_3.png');
    this.load.spritesheet("Office_Design_3", "Assets/Office_Design_Sprites/Office_Design_3.png", {
      frameWidth:512,
      frameHeight:544,
      endFrame:6
    });

    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    this.load.image('Button', 'Assets/Button.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');

    this.load.spritesheet('CISO_idle', 'CISO_Character/CISO_idle_.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // this.load.spritesheet('CISO_walk_up', 'CISO_Character/CISO_walk_back.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('CISO_walk_down', 'CISO_Character/CISO_walk_forward.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('CISO_walk_left', 'CISO_Character/CISO_walk_left.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('CISO_walk_right', 'CISO_Character/CISO_walk_right.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.anims.create({
      key:"Office_Design_3_anim",
      frames:this.anims.generateFrameNumbers("Office_Design_3",{start:0,end:5}),
      frameRate:10,
      repeat:-1
    })
    const background = this.add.sprite(centerX,centerY,"Office_Design_3").setOrigin(0.5)
      
    background.play("Office_Design_3_anim");

    this.bgMusic = this.sound.add('Background_music', { loop: true, volume: 0.5 });
    this.bgMusic.play();

    // this.anims.create({ key: 'walk_up', frames: this.anims.generateFrameNumbers('CISO_walk_up', { start: 0, end: 7 }), frameRate: 8, repeat: -1 });
    // this.anims.create({ key: 'walk_down', frames: this.anims.generateFrameNumbers('CISO_walk_down', { start: 0, end: 7 }), frameRate: 8, repeat: -1 });
    // this.anims.create({ key: 'walk_left', frames: this.anims.generateFrameNumbers('CISO_walk_left', { start: 0, end: 7 }), frameRate: 8, repeat: -1 });
    // this.anims.create({ key: 'walk_right', frames: this.anims.generateFrameNumbers('CISO_walk_right', { start: 0, end: 7 }), frameRate: 8, repeat: -1 });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('CISO_idle', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.ciso = this.add.sprite(centerX, centerY, 'CISO_idle').setAlpha(0);
    this.ciso.play('idle');

    this.createDialogueUI();

    this.tweens.add({
      targets: this.ciso,
      alpha: 1,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.showDialogue("The CISO appears urgently. 'We need all hands on deck. BAMF is escalating. Prepare everyone.'", () => {
          this.fadeOutCISO();
        });
      }
    });
  }

  update() {
    if (this.dialogueContainer.visible) {
      const keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      const keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      if (Phaser.Input.Keyboard.JustDown(keyUp)) this.scrollDialogue(-20);
      else if (Phaser.Input.Keyboard.JustDown(keyDown)) this.scrollDialogue(20);
    }
  }

  fadeOutCISO() {
    this.tweens.add({
      targets: this.ciso,
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.bgMusic.stop();
        this.scene.start('LevelIntro');
      }
    });
  }

  createDialogueUI() {
    let boxWidth = this.cameras.main.width - 100;
    let boxHeight = 150;
    let boxX = (this.cameras.main.width - boxWidth) / 2;
    let boxY = this.cameras.main.height - boxHeight - 20;

    this.dialogueBackground = this.add.image(0, 0, 'Dialogue_Box').setOrigin(0);
    this.dialogueBackground.displayWidth = boxWidth;
    this.dialogueBackground.displayHeight = boxHeight;

    this.dialogueContainer = this.add.container(boxX, boxY, [this.dialogueBackground]);

    let maskShape = this.make.graphics();
    maskShape.fillRect(0, 0, boxWidth, boxHeight);
    let mask = maskShape.createGeometryMask();

    this.dialogueText = this.add.text(10, 10, '', {
      font: '20px Arial',
      fill: '#FFFFFF',
      wordWrap: { width: boxWidth - 20 }
    });
    this.dialogueText.setMask(mask);
    this.dialogueContainer.add(this.dialogueText);

    this.dialogueScrollOffset = 0;
    this.scrollbar = this.add.image(boxWidth - 20, 10, 'Scrollbar').setScale(0.5);
    this.dialogueContainer.add(this.scrollbar);

    this.dialogueContainer.setVisible(false);
    this.dialogueContainer.alpha = 0;
  }

  scrollDialogue(delta) {
    let textHeight = this.dialogueText.height;
    let boxHeight = this.dialogueBackground.displayHeight;
    this.dialogueScrollOffset = Phaser.Math.Clamp(
      this.dialogueScrollOffset + delta,
      0,
      Math.max(0, textHeight - boxHeight + 20)
    );
    this.dialogueText.y = 10 - this.dialogueScrollOffset;
  }

  showDialogue(text, callback) {
    this.dialogueText.setText(text);
    this.dialogueScrollOffset = 0;
    this.dialogueText.y = 10;

    this.dialogueContainer.setVisible(true);
    this.tweens.add({
      targets: this.dialogueContainer,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });

    let btnX = this.dialogueBackground.displayWidth - 80;
    let btnY = this.dialogueBackground.displayHeight - 30;
    let continueBtn = this.add.image(btnX, btnY, 'Button').setInteractive();
    continueBtn.setOrigin(0.5);
    let btnText = this.add.text(btnX, btnY, 'Continue', {
      font: '18px Arial',
      fill: '#00FF00'
    }).setOrigin(0.5);

    let buttonContainer = this.add.container(0, 0, [continueBtn, btnText]);
    buttonContainer.setPosition(btnX, btnY);
    this.dialogueContainer.add(buttonContainer);

    continueBtn.on('pointerdown', () => {
      this.tweens.add({
        targets: this.dialogueContainer,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          this.dialogueContainer.setVisible(false);
          buttonContainer.destroy();
          if (callback) callback();
        }
      });
    });
  }
};

