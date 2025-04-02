window.Level4 = class Level4 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level4' });
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
        storyText: "Level 4: BAMF is attempting to steal user credentials using keyloggers.",
        options: [
          { text: "Deploy endpoint detection and educate users", correct: true, feedback: "Correct! Awareness and tools are essential to stop this." },
          { text: "Ignore it and hope it goes away", correct: false, feedback: "Incorrect. Inaction enables threats." },
          { text: "Install more keyboards", correct: false, feedback: "Incorrect. That’s not even a fix." },
          { text: "Post signs about security", correct: false, feedback: "Incorrect. That’s not direct action." }
        ]
      },
      {
        storyText: "Suspicious software is detected on multiple devices.",
        options: [
          { text: "Quarantine systems and analyze threats", correct: true, feedback: "Correct! Isolation prevents further spread." },
          { text: "Restart the devices", correct: false, feedback: "Incorrect. Restarting won’t remove malware." },
          { text: "Email the malware creator", correct: false, feedback: "Incorrect and risky." },
          { text: "Download random removal tools", correct: false, feedback: "Incorrect. That can make it worse." }
        ]
      },
      {
        storyText: "A user reports odd pop-ups and slow performance.",
        options: [
          { text: "Scan for spyware and malware", correct: true, feedback: "Correct! This is typical of infection." },
          { text: "Tell them to ignore it", correct: false, feedback: "Incorrect. That delays response." },
          { text: "Delete system32", correct: false, feedback: "Seriously? That breaks the machine." },
          { text: "Ask if they want a new computer", correct: false, feedback: "Not the right approach." }
        ]
      },
      {
        storyText: "Your EDR system sends a critical alert from a workstation.",
        options: [
          { text: "Contain the device and trigger forensic review", correct: true, feedback: "Correct! Lock it down and investigate." },
          { text: "Turn off the EDR", correct: false, feedback: "Incorrect. That removes your eyes." },
          { text: "Ignore the alert", correct: false, feedback: "Incorrect. Never ignore alerts." },
          { text: "Give the user admin rights", correct: false, feedback: "Terrible idea. Don’t do that." }
        ]
      },
      {
        storyText: "How do you prevent credential theft proactively?",
        options: [
          { text: "Enforce strong password policies and MFA", correct: true, feedback: "Correct! Prevention is better than cure." },
          { text: "Give everyone sticky notes", correct: false, feedback: "Incorrect. That weakens security." },
          { text: "Disable antivirus", correct: false, feedback: "Incorrect. That exposes the system." },
          { text: "Use '123456' as default", correct: false, feedback: "Incorrect. That's a hacker's dream." }
        ]
      }
    ];

    this.triggerBAMFAlert();
  }

  update() {
    // Movement disabled, since we’re using animated backgrounds
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
              this.scene.start('Level5');
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
      this.showDialogue("Hint: Malware must be quarantined, credentials must be protected, and EDR is your friend.", () => {
        this.showBAMFOptions();
      });
    });
    this.optionButtons.push(hintButton);
  }
};






  


