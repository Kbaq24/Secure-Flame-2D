window.Level5 = class Level5 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level5' });
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
        storyText: "Level 5: BAMF is launching a large-scale data exfiltration campaign.",
        options: [
          { text: "Trigger full network lockdown and notify legal", correct: true, feedback: "Correct! Containment and legal are critical here." },
          { text: "Delete the logs", correct: false, feedback: "Incorrect. That removes your forensic trail." },
          { text: "Ignore and go to lunch", correct: false, feedback: "Incorrect. Time is everything during breaches." },
          { text: "Ask the attacker to stop", correct: false, feedback: "That won’t work." }
        ]
      },
      {
        storyText: "You detect unauthorized access to sensitive records.",
        options: [
          { text: "Disable the user account and report immediately", correct: true, feedback: "Correct! Cut access and escalate." },
          { text: "Change your own password", correct: false, feedback: "Incorrect. That doesn’t fix the breach." },
          { text: "Log it and move on", correct: false, feedback: "Incorrect. Passive monitoring fails here." },
          { text: "Announce it on social media", correct: false, feedback: "Disastrous. That’s confidential." }
        ]
      },
      {
        storyText: "You find evidence of BAMF exfiltrating encrypted data. What's your move?",
        options: [
          { text: "Shut down exfil paths and review firewall policies", correct: true, feedback: "Correct! Block and audit the route." },
          { text: "Send an email to warn the team", correct: false, feedback: "Too slow and informal for this attack." },
          { text: "Try to decrypt their data", correct: false, feedback: "Not your job or responsibility." },
          { text: "Turn off the SIEM system", correct: false, feedback: "Never disable your eyes and ears." }
        ]
      },
      {
        storyText: "The CISO asks for a formal incident report.",
        options: [
          { text: "Generate detailed logs and breach summary", correct: true, feedback: "Correct! Document everything precisely." },
          { text: "Just say 'It’s handled'", correct: false, feedback: "Incorrect. Documentation is mandatory." },
          { text: "Tell them it was a false alarm", correct: false, feedback: "Incorrect. That’s dishonest." },
          { text: "Blame another department", correct: false, feedback: "That’s not professional or effective." }
        ]
      },
      {
        storyText: "How do you ensure breaches are detected earlier in the future?",
        options: [
          { text: "Enhance IDS rules and run regular threat hunting", correct: true, feedback: "Correct! Proactivity and improvement are key." },
          { text: "Turn off alerts at night", correct: false, feedback: "Incorrect. Attacks happen anytime." },
          { text: "Disable logging to save storage", correct: false, feedback: "Incorrect. You need logs for visibility." },
          { text: "Rely solely on antivirus", correct: false, feedback: "Incorrect. Antivirus is only one layer." }
        ]
      }
    ];

    this.triggerBAMFAlert();
  }

  update() {
    // No movement needed
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
              this.scene.start('BonusLevel');
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
      this.showDialogue("Hint: Contain fast, document accurately, and improve defenses proactively.", () => {
        this.showBAMFOptions();
      });
    });
    this.optionButtons.push(hintButton);
  }
};





  

