window.Startscreen = class Startscreen extends Phaser.Scene {
  constructor() {
    super({ key: 'Startscreen' });
  }

  preload() {
    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('Click', 'Assets/Click.mp3');

    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    this.load.image('Button', 'Assets/Button.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');
    this.load.spritesheet('Office_Design_3', 'Assets/Office_Design_Sprites/Office_Design_3.png');

    this.load.image('player', 'Assets/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.anims.create({
      key:"Office_Design_3_anim",
      frames:this.anims.generateFrameNumbers("Office_Design_3",{ start:0,end:5}),
      frameRate:10,
      repeat:-1
    });

    // --- Add animated background and scale to full canvas ---
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

    //this.player = this.physics.add.sprite(100, 100, 'player');
    //this.player.setCollideWorldBounds(true);

    //this.workstation = this.physics.add.staticImage(400, 300, null);
    //this.workstation.setSize(64, 64).setVisible(false);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.physics.add.overlap(this.player, this.workstation, this.handleWorkstationInteraction, null, this);

    this.createDialogueUI();

    const introText = "Secure Flame Game\n\nPress 'Continue' to begin.";
    this.showDialogue(introText, () => {
      this.showStartOptions();
    });

    //this.anims.create({
      //key: 'run',
      //frameRate: 10,
      //repeat: -1
    //});
  }

  update() {
    //const speed = 150;
    //const { up, down, left, right } = this.cursors;
    //const body = this.player.body;

    //body.setVelocity(0);

    //if (up.isDown) body.setVelocityY(-speed);
    //else if (down.isDown) body.setVelocityY(speed);

    //if (left.isDown) body.setVelocityX(-speed);
    //else if (right.isDown) body.setVelocityX(speed);

    //if (body.velocity.x !== 0 || body.velocity.y !== 0) {
      //this.player.anims.play('run', true);
    //} else {
      //this.player.anims.stop();
    //}

    if (this.dialogueContainer.visible) {
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
        this.scrollDialogue(-20);
      } else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))) {
        this.scrollDialogue(20);
      }
    }
  }

  handleWorkstationInteraction(player, workstation) {
    let saveData = window.loadGame?.();
    this.bgMusic.stop();

    if (saveData && saveData.currentScene) {
      this.scene.start(saveData.currentScene);
    } else {
      this.scene.start('LevelIntro');
    }
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
    this.dialogueContainer.alpha = 0; // Initially hidden
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
    });
    btnText.setOrigin(0.5);

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

  showStartOptions() {
    if (this.optionButtons) {
      this.optionButtons.forEach((btn) => btn.destroy());
    }
    this.optionButtons = [];

    let newGameBtn = this.add.image(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 + 100, 'Button').setInteractive();
    newGameBtn.setOrigin(0.5);
    let newGameText = this.add.text(newGameBtn.x, newGameBtn.y, 'New Game', {
      font: '18px Arial',
      fill: '#FFFFFF'
    });
    newGameText.setOrigin(0.5);
    let newGameContainer = this.add.container(newGameBtn.x, newGameBtn.y, [newGameBtn, newGameText]);
    this.optionButtons.push(newGameContainer);

    newGameBtn.on('pointerdown', () => {
      this.sound.play('Click');
      this.bgMusic.stop();
      this.scene.start('LevelIntro');
    });

    let loadGameBtn = this.add.image(this.cameras.main.width / 2 + 100, this.cameras.main.height / 2 + 100, 'Button').setInteractive();
    loadGameBtn.setOrigin(0.5);
    let loadGameText = this.add.text(loadGameBtn.x, loadGameBtn.y, 'Load Game', {
      font: '18px Arial',
      fill: '#FFFFFF'
    });
    loadGameText.setOrigin(0.5);
    let loadGameContainer = this.add.container(loadGameBtn.x, loadGameBtn.y, [loadGameBtn, loadGameText]);
    this.optionButtons.push(loadGameContainer);

    loadGameBtn.on('pointerdown', () => {
      this.sound.play('Click');
      let saveData = window.loadGame?.();
      if (saveData && saveData.currentScene) {
        this.bgMusic.stop();
        this.scene.start(saveData.currentScene);
      } else {
        alert('No saved game found.');
      }
    });
  }
};

