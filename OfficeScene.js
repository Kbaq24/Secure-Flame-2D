window.OfficeScene = class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OfficeScene' });
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
    this.load.image('arrow', 'Assets/arrow.png');
    this.load.image('Scrollbar', 'Assets/Scrollbar.png');
    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('Click', 'Assets/Click.mp3');
    this.load.audio('Right', 'Assets/Right.wav');
    this.load.audio('Wrong', 'Assets/Wrong.wav');
    // this.load.audio('Interact_with_Characters', 'Assets/Interact_with_Characters.wav');
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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createDialogueUI();

    this.storyParts = [
      {
        storyText: "NPC: Hey, how was your weekend? Anything exciting?",
        options: [
          { text: "Nothing special, just errands and catching up on some shows", correct: true, feedback: "That sounds typical. But now, things are about to get intense." },
          { text: "I went skydiving!", correct: false, feedback: "Maybe a bit too adventurous for an office conversation." }
        ]
      },
      {
        storyText: "NPC: Sounds about…",
        options: [
          { text: "Wait for the CISO to interrupt", correct: true, feedback: "Right on cue, the CISO appears with urgent news." }
        ]
      }
    ];

    this.triggerOfficeDialogue();
  }

  update() {
    if (this.dialogueContainer.visible) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.scrollDialogue(-20);
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
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
    this.dialogueContainer.alpha = 0; // Start transparent for fade-in
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

  triggerOfficeDialogue() {
    // this.sound.play('Interact_with_Characters');
    let dialogueText = this.storyParts[this.part].storyText;
    this.showDialogue(dialogueText, () => {
      this.showOfficeOptions();
    });
  }

  showOfficeOptions() {
    if (this.optionButtons) {
      this.optionButtons.forEach(btn => btn.destroy());
    }
    this.optionButtons = [];
    let options = this.storyParts[this.part].options;
    Phaser.Utils.Array.Shuffle(options);

    options.forEach((option, index) => {
      let optY = 60 + index * 40;
      let arrowIcon = this.add.image(10, optY, 'arrow').setScale(0.5);
      let optText = this.add.text(40, optY - 10, option.text, {
        font: '18px Arial',
        fill: '#00FF00'
      }).setInteractive();

      optText.on('pointerdown', () => {
        let soundKey = option.correct ? 'Right' : 'Wrong';
        this.sound.play(soundKey);
        this.showDialogue("Consequence: " + option.feedback, () => {
          if (option.correct) {
            this.part++;
            if (this.part < this.storyParts.length) {
              this.triggerOfficeDialogue();
            } else {
              this.bgMusic.stop();
              this.scene.start('LevelIntro');
            }
          } else {
            this.showOfficeOptions();
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
      this.showDialogue("Hint: Keep your responses simple and honest.", () => {
        this.showOfficeOptions();
      });
    });
    this.optionButtons.push(hintButton);
  }
};






  