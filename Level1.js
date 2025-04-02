window.Level1 = class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
    this.part = 0;
    this.dialogueScrollOffset = 0;
  }

  preload() {
    console.log("Preloading")
    // this.load.image('Office_Design_3', 'Assets/Office_Design_Sprites/Office_Design_3.png');
    
    this.load.spritesheet("Office_Design_3","Assets/Office_Design_Sprites/Office_Design_3.png", {
      frameWidth:512,
      frameHeight:544,
      endFrame:6
    })
    // this.load.image('Dual_monitors', 'Assets/Dual_monitors.png');
    // this.load.image('Desk', 'Assets/Desk.png');
    // this.load.image('Couch', 'Assets/Couch.png');
    // this.load.image('Lamp', 'Assets/Lamp.png');
    // this.load.image('Office_computer', 'Assets/Office_computer.png');
    // this.load.image('Office_chair', 'Assets/Office_chair.png');
    // this.load.image('Office_Desk', 'Assets/Office_Desk.png');
    // this.load.image('Printer_station', 'Assets/Printer_station.png');
    // this.load.image('Printer', 'Assets/Printer.png');
    // this.load.image('Stack_of_papers', 'Assets/Stack_of_papers.png');
    // this.load.image('Vending_Machine', 'Assets/Vending_Machine.png');
    // this.load.image('Watercooler', 'Assets/Watercooler.png');
    // this.load.image('White_desk', 'Assets/White_desk.png');
    // this.load.image('Whiteboard', 'Assets/Whiteboard.png');
    this.load.image('Dialogue_Box', 'Assets/Dialogue_Box.png');
    // this.load.image('Banner', 'Assets/Banner.png');
    // this.load.image('Button', 'Assets/Button.png');
    // this.load.image('Scrollbar', 'Assets/Scrollbar.png');
    this.load.image('arrow', 'Assets/arrow.png');
    this.load.audio('Background_music', 'Assets/Background_music.wav');
    this.load.audio('Right', 'Assets/Right.wav');
    this.load.audio('Wrong', 'Assets/Wrong.wav');
    this.load.audio('BAMF_Alert', 'Assets/BAMF_alert.wav');
    this.load.audio('Footstep', 'Assets/Footstep.wav');
    // this.load.audio('Interact_with_Characters', 'Assets/Interact_with_Characters.wav');
    this.load.audio('Click', 'Assets/Click.mp3');
    this.load.audio('Keyboard', 'Assets/Keyboard.wav');
    this.load.audio('Level_Complete', 'Assets/Level_Complete.wav');
    this.load.audio('Next_Level', 'Assets/Next_Level.wav');
    // this.load.spritesheet('player', 'Assets/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    // this.add.image(centerX, centerY, 'Office_Design_2').setOrigin(0.5);

    // this.bgMusic = this.sound.add('Background_music', { loop: true, volume: 0.5 });
    // this.bgMusic.play();
    this.anims.create({
      key:"Office_Design_3_anim",
      frames:this.anims.generateFrameNumbers("Office_Design_3",{start:0,end:5}),
      frameRate:10,
      repeat:-1
    })
    const background = this.add.sprite(centerX,centerY,"Office_Design_3").setOrigin(0.5)
      
    background.play("Office_Design_3_anim");
    // this.furnitureGroup = this.physics.add.staticGroup();
    // this.furnitureGroup.create(150, 400, 'Desk');
    // this.furnitureGroup.create(250, 420, 'Office_chair');
    // this.furnitureGroup.create(350, 380, 'Office_Desk');
    // this.furnitureGroup.create(450, 410, 'Printer_station');
    // this.furnitureGroup.create(500, 390, 'Printer');
    // this.furnitureGroup.create(200, 500, 'Stack_of_papers');
    // this.furnitureGroup.create(400, 520, 'Vending_Machine');
    // this.furnitureGroup.create(550, 500, 'Watercooler');
    // this.furnitureGroup.create(300, 350, 'White_desk');
    // this.furnitureGroup.create(600, 320, 'Whiteboard');
    // this.furnitureGroup.create(700, 400, 'Dual_monitors');
    // this.furnitureGroup.create(650, 450, 'Couch');
    // this.furnitureGroup.create(100, 480, 'Lamp');
    // this.furnitureGroup.create(750, 380, 'Office_computer');

    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.furnitureGroup);

    this.cursors = this.input.keyboard.createCursorKeys();  
    this.createDialogueUI();

    this.storyParts = [
      {
        storyText: "Level 1: A strange alert appears on your screen—BAMF is targeting the network.",
        options: [
          { text: "Notify IT and disconnect", correct: true, feedback: "Correct! Alerting IT immediately helps contain the threat." },
          { text: "Disconnect without notifying", correct: false, feedback: "Incorrect. IT must be informed." },
          { text: "Ignore the alert", correct: false, feedback: "Incorrect. This allows the threat to spread." },
          { text: "Try to fix it alone", correct: false, feedback: "Incorrect. You could worsen the situation." }
        ]
      },
      {
        storyText: "You see failed login attempts from unknown locations. What do you do?",
        options: [
          { text: "Lock all access immediately", correct: true, feedback: "Correct! Quick lockdown prevents data leaks." },
          { text: "Wait to see if more attempts happen", correct: false, feedback: "Incorrect: passive observation wastes critical time." },
          { text: "Log out and go home", correct: false, feedback: "Incorrect. That’s neglecting duty!" },
          { text: "Message your friend about it", correct: false, feedback: "Incorrect. That violates policy and distracts others." }
        ]
      },
      {
        storyText: "An email claims to be from your boss but has a suspicious link.",
        options: [
          { text: "Verify the email with your boss directly", correct: true, feedback: "Correct! Phishing detection is key." },
          { text: "Click the link out of curiosity", correct: false, feedback: "Incorrect. You could trigger a malware download." },
          { text: "Forward it to your team", correct: false, feedback: "Incorrect. You’re helping the threat spread." },
          { text: "Report it to HR", correct: false, feedback: "Not quite. This is an IT matter." }
        ]
      },
      {
        storyText: "BAMF is now attempting DNS spoofing. What’s the best mitigation?",
        options: [
          { text: "Enforce DNSSEC and alert admins", correct: true, feedback: "Correct! DNSSEC helps protect against spoofing." },
          { text: "Unplug the modem", correct: false, feedback: "Incorrect. That won't fix DNS issues." },
          { text: "Ignore it", correct: false, feedback: "Incorrect. That leaves the system vulnerable." },
          { text: "Block Google DNS", correct: false, feedback: "Incorrect. It’s not related." }
        ]
      },
      {
        storyText: "You’re prompted to install a software update from an unverified source.",
        options: [
          { text: "Decline and notify IT", correct: true, feedback: "Correct! Only IT-approved software should be installed." },
          { text: "Accept it to avoid delay", correct: false, feedback: "Incorrect. That's dangerous." },
          { text: "Check Reddit for advice", correct: false, feedback: "Incorrect. Reddit is not a secure resource." },
          { text: "Try it out on a test PC", correct: false, feedback: "Incorrect. Still risky without approval." }
        ]
      }
    ];

    this.triggerBAMFAlert();
  }

  update() {
    if (!this.dialogueContainer.visible) {
      this.player.setVelocity(0);
      if (this.cursors.left.isDown) this.player.setVelocityX(-100);
      else if (this.cursors.right.isDown) this.player.setVelocityX(100);
      if (this.cursors.up.isDown) this.player.setVelocityY(-100);
      else if (this.cursors.down.isDown) this.player.setVelocityY(100);
    } else {
      this.player.setVelocity(0);
    }

    if (this.dialogueContainer.visible) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.scrollDialogue(-20);
      else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.scrollDialogue(20);
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
    this.dialogueText = this.add.text(10, 10, '', { font: '20px Arial', fill: '#FFFFFF', wordWrap: { width: boxWidth - 20 } });
    this.dialogueText.setMask(mask);
    this.dialogueContainer.add(this.dialogueText);
    this.dialogueScrollOffset = 0;
    this.scrollbar = this.add.image(boxWidth - 20, 10, 'Scrollbar').setScale(0.5);
    this.dialogueContainer.add(this.scrollbar);
    this.setDialogueBox(false)
    // this.toggleDialogueBox()
    // console.log(this.setVis)
  }

  toggleDialogueBox(){
    this.dialogueBackground.visible = !this.dialogueBackground.visible
  }

  setDialogueBox(value){
    this.dialogueBackground.visible = value
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
      this.dialogueContainer.setVisible(false);
      buttonContainer.destroy();
      if (callback) callback();
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
              this.scene.start('Level2');
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

    let hintButton = this.add.text(10, this.dialogueBackground.displayHeight - 30, "Need a Hint?", { font: '18px Arial', fill: '#FFD700' }).setInteractive();
    hintButton.on('pointerdown', () => {
      this.showDialogue("Hint: Always consider alerting the proper team, verifying identity, and stopping the threat at the source.", () => {
        this.showBAMFOptions();
      });
    });
    this.optionButtons.push(hintButton);
  }
};




