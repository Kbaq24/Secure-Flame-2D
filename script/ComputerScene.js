window.ComputerScene = class ComputerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ComputerScene' });
    this.dialogueScrollOffset = 0;
  }

  preload() {
    this.load.audio('During_BAMF_event', 'Assets/During_BAMF_event.wav');
    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    this.load.image('Button', 'Assets/Button.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    const centerY = this.cameras.main.height / 2;

    this.sound.play('During_BAMF_event', { volume: 1.0, delay: 0.05 });

    this.createDialogueUI();

    this.showDialogue(
      "BAMF event triggered: Your computer has detected an incoming attack.\nPlease choose an action to respond:",
      () => {
        this.showOptions();
      }
    );
  }

  update() {
    if (this.dialogueContainer.visible) {
      const keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      const keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      if (Phaser.Input.Keyboard.JustDown(keyUp)) {
        this.scrollDialogue(-20);
      } else if (Phaser.Input.Keyboard.JustDown(keyDown)) {
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

  showOptions() {
    const options = [
      "1. Initiate Countermeasures",
      "2. Run a System Scan",
      "3. Alert IT Support"
    ];

    const formatted = options.join("\n");

    this.showDialogue(formatted, () => {
      this.showContinueButton();
    });
  }

  showContinueButton() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height - 50;

    let continueBtn = this.add.text(centerX, centerY, 'Continue', {
      font: '24px Arial',
      fill: '#00FF00',
      backgroundColor: '#444444',
      padding: { x: 10, y: 5 }
    })
      .setOrigin(0.5)
      .setInteractive();

    continueBtn.on('pointerdown', () => {
      // this.sound.stopAll(); // if BAMF sound is looping
      this.scene.start('Level4'); // Or whatever the next scene should be
    });
  }
};


  