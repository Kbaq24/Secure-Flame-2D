window.Level2 = class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
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
    this.load.image('Button', 'Assets/Button.png');

    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('Right', 'Assets/Right.wav');
    this.load.audio('Wrong', 'Assets/Wrong.wav');
    this.load.audio('Click', 'Assets/Click.mp3');
    this.load.audio('Level_Complete', 'Assets/Level_Complete.wav');
    this.load.audio('BAMF_Alert', 'Assets/BAMF_alert.wav');
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
    // this.cursors = this.input.keyboard.createCursorKeys();

    this.createDialogueUI();

    this.storyParts = [
      {
        storyText: "Level 2: BAMF launches a ransomware attack across shared drives.",
        options: [
          { text: "Disconnect affected systems and notify response team", correct: true, feedback: "Correct! Isolating infected systems limits damage." },
          { text: "Try deleting suspicious files manually", correct: false, feedback: "Incorrect. That risks data loss and further spread." },
          { text: "Broadcast a general warning", correct: false, feedback: "Incorrect. Action is more effective than warnings." },
          { text: "Unplug your computer and go home", correct: false, feedback: "Incorrect. That’s evading responsibility." }
        ]
      },
      {
        storyText: "A user reports their screen is locked and demands ransom.",
        options: [
          { text: "Do not pay and report to authorities", correct: true, feedback: "Correct! Never negotiate with attackers." },
          { text: "Try to negotiate for less", correct: false, feedback: "Incorrect. That encourages future attacks." },
          { text: "Restart the device", correct: false, feedback: "Incorrect. That won't help with ransomware." },
          { text: "Ignore it, maybe it’ll fix itself", correct: false, feedback: "Incorrect. Inaction worsens the situation." }
        ]
      },
      {
        storyText: "You find logs showing lateral movement by BAMF through compromised accounts.",
        options: [
          { text: "Disable compromised accounts and investigate scope", correct: true, feedback: "Correct! Containment is key." },
          { text: "Email users to change their passwords", correct: false, feedback: "Incorrect. Not secure enough." },
          { text: "Reboot the network", correct: false, feedback: "Incorrect. That’s disruptive and ineffective." },
          { text: "Change your admin password only", correct: false, feedback: "Incorrect. You must address all access points." }
        ]
      },
      {
        storyText: "Backups are found to be incomplete. What’s the next step?",
        options: [
          { text: "Report to IT leadership and start creating clean backups", correct: true, feedback: "Correct! You need solid restore points." },
          { text: "Delete old backup logs", correct: false, feedback: "Incorrect. You may lose important forensics." },
          { text: "Ignore and hope they're sufficient", correct: false, feedback: "Incorrect. That risks data loss." },
          { text: "Wipe current systems entirely", correct: false, feedback: "Incorrect. That’s drastic and premature." }
        ]
      },
      {
        storyText: "What long-term strategy helps protect against ransomware?",
        options: [
          { text: "Implement zero-trust access policies", correct: true, feedback: "Correct! Least privilege and monitoring are effective." },
          { text: "Install more firewalls", correct: false, feedback: "Incorrect. It’s not just perimeter defense." },
          { text: "Ban all email usage", correct: false, feedback: "Incorrect. Not practical or effective." },
          { text: "Switch to paper records", correct: false, feedback: "Incorrect. Not a scalable solution." }
        ]
      }
    ];

    this.triggerBAMFAlert();
  }

  update() {
    // Removed player movement since sprite isn't used
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

  triggerBAMFAlert() {
    this.sound.play('BAMF_Alert');
    let partData = this.storyParts[this.part];
    this.showDialogue(partData.storyText, () => this.showBAMFOptions());
  }

  showBAMFOptions() {
    if (this.optionButtons) this.optionButtons.forEach(btn => btn.destroy());
    this.optionButtons = [];

    let options = this.storyParts[this.part].options;
    Phaser.Utils.Array.Shuffle(options);

    options.forEach((option, index) => {
      let optY = 60 + index * 40;
      let arrowIcon = this.add.image(10, optY, 'arrow').setScale(0.5);
      let optText = this.add.text(40, optY - 10, option.text, { font: '18px Arial', fill: '#00FF00' }).setInteractive();

      optText.on('pointerdown', () => {
        this.sound.play(option.correct ? 'Right' : 'Wrong');
        this.showDialogue("Consequence: " + option.feedback, () => {
          if (option.correct) {
            this.part++;
            if (this.part >= this.storyParts.length) {
              this.sound.play('Level_Complete');
              this.bgMusic.stop();
              this.scene.start('Level3');
            } else {
              this.triggerBAMFAlert();
            }
          } else {
            this.showBAMFOptions();
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
      this.showDialogue("Hint: Contain threats early, report, and always follow procedure.", () => {
        this.showBAMFOptions();
      });
    });
    this.optionButtons.push(hintButton);
  }
};








  






