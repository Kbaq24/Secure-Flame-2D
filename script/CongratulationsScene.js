window.CongratulationsScene = class CongratulationsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CongratulationsScene' });
    this.dialogueScrollOffset = 0;
  }

  preload() {
    // Load congratulatory image or effects if needed in future
    // this.load.image('Victory_Background', 'Assets/Victory.png');
    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    this.load.image('Button', 'Assets/Button.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');
    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('Click', 'Assets/Click.mp3');
    this.load.audio('Level_Complete', 'Assets/Level_Complete.wav');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Stop background music if playing
    // if (this.bgMusic) this.bgMusic.stop();
    this.bgMusic = this.sound.add('Background_music', { loop: true, volume: 0.4 });
    this.bgMusic.play();

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // this.add.image(centerX, centerY, 'Victory_Background').setOrigin(0.5);
    this.add.text(centerX, 100, "Secure Flame Complete!", {
      font: "32px Arial",
      fill: "#FFD700"
    }).setOrigin(0.5);

    this.createDialogueUI();

    let finalMessage =
      "Congratulations!\n\nYou have successfully defended against the BAMF attacks and secured the network.\n" +
      "Your dedication and quick thinking have saved the day!\n\nYour firewall configuration knowledge will help protect the digital future.";

    this.showDialogue(finalMessage, () => {
      this.showRestartOption();
    });
  }

  update() {
    if (this.dialogueContainer.visible) {
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
        this.scrollDialogue(-20);
      } else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))) {
        this.scrollDialogue(20);
      }
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
    this.dialogueContainer.alpha = 0;
  }

  scrollDialogue(delta) {
    let textHeight = this.dialogueText.height;
    let boxHeight = this.dialogueBackground.displayHeight;
    this.dialogueScrollOffset = Phaser.Math.Clamp(this.dialogueScrollOffset + delta, 0, Math.max(0, textHeight - boxHeight + 20));
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
      duration: 400,
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
      this.sound.play('Click');
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

  showRestartOption() {
    let btnX = this.dialogueBackground.displayWidth - 80;
    let btnY = this.dialogueBackground.displayHeight - 30;

    let restartBtn = this.add.image(btnX, btnY, 'Button').setInteractive();
    restartBtn.setOrigin(0.5);

    let btnText = this.add.text(btnX, btnY, 'Restart', {
      font: '18px Arial',
      fill: '#00FF00'
    }).setOrigin(0.5);

    let container = this.add.container(this.dialogueContainer.x + btnX, this.dialogueContainer.y + btnY, [restartBtn, btnText]);
    this.dialogueContainer.add(container);

    restartBtn.on('pointerdown', () => {
      this.bgMusic.stop();
      this.scene.start('Startscreen');
    });
  }
};




  