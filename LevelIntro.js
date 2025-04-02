window.LevelIntro = class LevelIntro extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelIntro' });
    this.dialogueScrollOffset = 0;
  }

  preload() {
    // If LevelIntro has any additional assets, load them here.
    // For this example, it reuses assets already loaded by other scenes.
  }

  create() {
    // --- Create Background ---
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.anims.create({
      key:"Office_Design_3_anim",
      frames:this.anims.generateFrameNumbers("Office_Design_3",{ start:0,end:5}),
      frameRate:10,
      repeat:-1
    });

    // --- Add animated background and scale to full canvas ---
    const background = this.add.image(centerX,centerY,"Office_Design_3").setOrigin(0.5)
    background.setDisplaySize(800, 600); // Match the canvas size exactly
    background.play("Office_Design_3_anim");

    // --- Setup Dialogue UI ---
    this.createDialogueUI();

    // --- Define the Intro Narrative ---
    let introText = "Welcome to Secure Flame Game!\n\nIn this office, you'll face relentless cyberattacks by BAMF. Prepare to defend the network with quick thinking and decisive action. Your journey begins now...";

    // --- Show the Intro Dialogue ---
    this.showDialogue(introText, () => {
      // After the intro dialogue is dismissed, transition to Level1.
      this.scene.start('Level1');
    });
  }

  update() {
    // --- Allow Dialogue Scrolling via Arrow Keys ---
    if (this.dialogueContainer.visible) {
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
        this.scrollDialogue(-20);
      } else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))) {
        this.scrollDialogue(20);
      }
    }
  }

  // --- Dialogue UI Creation ---
  createDialogueUI() {
    let boxWidth = this.cameras.main.width - 100;
    let boxHeight = 150;
    let boxX = (this.cameras.main.width - boxWidth) / 2;
    let boxY = this.cameras.main.height - boxHeight - 20;

    // Add dialogue box background using the dialogueBox asset and scale appropriately
    this.dialogueBackground = this.add.image(0, 0, 'Dialogue_Box').setOrigin(0);
    this.dialogueBackground.displayWidth = boxWidth;
    this.dialogueBackground.displayHeight = boxHeight;

    // Create the dialogue container and add the background
    this.dialogueContainer = this.add.container(boxX, boxY, [this.dialogueBackground]);

    // Create a graphics object for masking (to prevent text clipping)
    let maskShape = this.make.graphics();
    maskShape.fillRect(0, 0, boxWidth, boxHeight);
    let mask = maskShape.createGeometryMask();

    // Add dialogue text with padding and wordWrap; assign the mask
    this.dialogueText = this.add.text(10, 10, '', { font: '20px Arial', fill: '#FFFFFF', wordWrap: { width: boxWidth - 20 } });
    this.dialogueText.setMask(mask);
    this.dialogueContainer.add(this.dialogueText);

    // Initialize dialogue scroll offset
    this.dialogueScrollOffset = 0;

    // Add scrollbar graphic as a visual cue (positioned on the right side)
    this.scrollbar = this.add.image(boxWidth - 20, 10, 'Scrollbar').setScale(0.5);
    this.dialogueContainer.add(this.scrollbar);

    // Initially hide the dialogue container and start fully transparent
    this.dialogueContainer.setVisible(false);
    this.dialogueContainer.alpha = 0;
  }

  // --- Scroll Dialogue Text ---
  scrollDialogue(delta) {
    let textHeight = this.dialogueText.height;
    let boxHeight = this.dialogueBackground.displayHeight;
    this.dialogueScrollOffset = Phaser.Math.Clamp(this.dialogueScrollOffset + delta, 0, Math.max(0, textHeight - boxHeight + 20));
    this.dialogueText.y = 10 - this.dialogueScrollOffset;
  }

  // --- Show Dialogue with a Continue Button ---
  showDialogue(text, callback) {
    this.dialogueText.setText(text);
    this.dialogueScrollOffset = 0;
    this.dialogueText.y = 10;
    this.dialogueContainer.setVisible(true);

    // Fade in the dialogue container
    this.tweens.add({
      targets: this.dialogueContainer,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });

    // Create a "Continue" button using the Button asset
    let btnX = this.dialogueBackground.displayWidth - 80;
    let btnY = this.dialogueBackground.displayHeight - 30;
    let continueBtn = this.add.image(btnX, btnY, 'Button').setInteractive();
    continueBtn.setOrigin(0.5);
    let btnText = this.add.text(btnX, btnY, 'Continue', { font: '18px Arial', fill: '#00FF00' });
    btnText.setOrigin(0.5);

    // Group the button and text in a container so they move together
    let buttonContainer = this.add.container(0, 0, [continueBtn, btnText]);
    buttonContainer.setPosition(btnX, btnY);
    this.dialogueContainer.add(buttonContainer);

    continueBtn.on('pointerdown', () => {
      // Fade out the dialogue container
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







