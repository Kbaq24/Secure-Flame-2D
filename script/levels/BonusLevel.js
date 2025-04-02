window.BonusLevel = class BonusLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'BonusLevel' });
    this.part = 0;
    this.dialogueScrollOffset = 0;
  }

  preload() {
    // this.load.image('Office_Design_3', 'Assets/Office_Design_Sprites/Office_Design_3.png');
    this.load.spritesheet("Office_Design_3", "Assets/Office_Design_Sprites/Office_Design_3.png", {
      frameWidth:512,
      frameHeight:544,
      endFrame:6
    });

    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');
    this.load.image('arrow', 'Assets/arrow.png');
    this.load.image('Button', 'Assets/Button.png');

    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('End_Game', 'Assets/End_Game.wav');
    this.load.audio('Click', 'Assets/Click.mp3');
    this.load.audio('Right', 'Assets/Right.wav');
    this.load.audio('Wrong', 'Assets/Wrong.wav');
    this.load.audio('Next_Level', 'Assets/Next_Level.wav');
    // this.load.spritesheet('player', 'Assets/player.png', { frameWidth: 32, frameHeight: 32 });
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

    // this.player = this.physics.add.sprite(100, 100, 'player');
    // this.player.setCollideWorldBounds(true);

    // this.physics.add.collider(this.player, this.furnitureGroup);
    // this.cursors = this.input.keyboard.createCursorKeys();

    this.createDialogueUI();

    this.storyParts = [
      {
        storyText: "Bonus Level:\nFinally! After a long, exhausting day, you gather your things. BAMF is defeated, and you can finally head home.\n\nTake a moment to appreciate the calm before you leave.",
        options: [
          { text: "Leave the office", correct: true, feedback: "Correct! You've earned a break. Time to head home." }
        ]
      }
    ];

    this.triggerBonusDialogue();
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
      duration: 300,
      ease: 'Power2'
    });

    let btnX = this.dialogueBackground.displayWidth - 80;
    let btnY = this.dialogueBackground.displayHeight - 30;
    let continueBtn = this.add.image(btnX, btnY, 'Button').setInteractive();
    continueBtn.setOrigin(0.5);
    let btnText = this.add.text(btnX, btnY, 'Continue', { font: '18px Arial', fill: '#00FF00' });
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

  triggerBonusDialogue() {
    this.sound.play('Next_Level');
    let dialogueText = this.storyParts[this.part].storyText;
    this.showDialogue(dialogueText, () => {
      this.showBonusOptions();
    });
  }

  showBonusOptions() {
    if (this.optionButtons) {
      this.optionButtons.forEach(btn => btn.destroy());
    }
    this.optionButtons = [];

    let options = this.storyParts[this.part].options;
    Phaser.Utils.Array.Shuffle(options);

    options.forEach((option, index) => {
      let optY = 60 + index * 40;
      let arrowIcon = this.add.image(10, optY, 'arrow').setScale(0.5);
      let optText = this.add.text(40, optY - 10, option.text, { font: '18px Arial', fill: '#00FF00' }).setInteractive();

      optText.on('pointerdown', () => {
        let soundKey = option.correct ? 'Right' : 'Wrong';
        this.sound.play(soundKey);
        this.showDialogue("Consequence: " + option.feedback, () => {
          if (option.correct) {
            this.sound.play('End_Game');
            this.bgMusic.stop();
            this.scene.start('CongratulationsScene');
          } else {
            this.showBonusOptions();
          }
        });
      });

      this.optionButtons.push(arrowIcon, optText);
    });

    let hintButton = this.add.text(10, this.dialogueBackground.displayHeight - 30, "Need a Hint?", {
      font: '18px Arial',
      fill: '#FFD700'
    }).setInteractive();

    hintButton.on('pointerdown', () => {
      this.showDialogue("Hint: It's time to leave—your hard work paid off!", () => {
        this.showBonusOptions();
      });
    });

    this.optionButtons.push(hintButton);
  }
};




  
