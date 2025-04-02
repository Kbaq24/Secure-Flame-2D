window.StartScene = class Startscreen extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  currentMessage = 0;
  messages = [
    "Welcome to Secure Flame!",
    "In this game you will be working for a company as a cybersecurity analyst.",
    "Help your company make the best actions to protect your data.",
    "In this office, you'll face relentless cyberattacks by BAMF.",
    "Prepare to defend the network with quick thinking and decisive action.",
    "Your journey begins now..."
  ]
  currentlyTyping = false;

  // TODO: Make toggleable, or set to false for production
  fastText = true;
  preload() {
    this.load.audio('Background_music', 'assets/audio/music/Background_music.wav');
    this.load.audio('Click', 'assets/audio/sound_effects/Click.mp3');

    this.load.image('Dialogue_Box', 'assets/images/Dialogue_Box.png');
    this.load.image('Button', 'assets/images/Button.png');
    this.load.image('Scrollbar', 'assets/images/Scrollbar.png');
    this.load.spritesheet('Office_Design_3', 'assets/images/Office_Design_3.png',
      {
        frameWidth:512,
        frameHeight:544,
        endFrame:6
      }
    );
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
    this.bgMusic = this.sound.add('Background_music', { loop: true, volume: 0.05 });
    this.bgMusic.play();

    //this.player = this.physics.add.sprite(100, 100, 'player');
    //this.player.setCollideWorldBounds(true);

    //this.workstation = this.physics.add.staticImage(400, 300, null);
    //this.workstation.setSize(64, 64).setVisible(false);

    // this.cursors = this.input.keyboard.addKeys({
    //   up: Phaser.Input.Keyboard.KeyCodes.W,
    //   down: Phaser.Input.Keyboard.KeyCodes.S,
    //   left: Phaser.Input.Keyboard.KeyCodes.A,
    //   right: Phaser.Input.Keyboard.KeyCodes.D
    // });

    this.createDialogueUI();

    this.physics.add.overlap(this.player, this.workstation, this.handleWorkstationInteraction, null, this);


    this.showDialogue(this.messages, () => {
      this.scene.start('Level1');
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

    // if (this.dialogueContainer.visible) {
    //   if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
    //     this.scrollDialogue(-20);
    //   } else if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN))) {
    //     this.scrollDialogue(20);
    //   }
    // }
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

    let btnX = this.dialogueBackground.displayWidth - 80;
    let btnY = this.dialogueBackground.displayHeight - 30;
    let padding = 20; 

    let btnText = this.add.text(btnX, btnY, 'Continue', {
        font: '18px Arial',
        fill: '#00FF00'
    }).setOrigin(0.5);
    
    this.continueBtn = this.add.image(btnX, btnY, 'Button')
        .setOrigin(0.5)
        .setDisplaySize(btnText.width + padding, btnText.height + padding);
    btnText.setDepth(1)

    this.continueBtn.on('pointerover', () => {
      this.continueBtn.setTint(0x00FF00);
    });
    this.continueBtn.on('pointerout', () => { 
      this.continueBtn.clearTint();
    })

    this.dialogueContainer = this.add.container(boxX, boxY, [this.dialogueBackground, this.continueBtn, btnText]);

    // let maskShape = this.make.graphics();
    // maskShape.fillRect(0, 0, boxWidth, boxHeight);
    // let mask = maskShape.createGeometryMask();

    this.dialogueText = this.add.text(10, 10, '', {
      font: '20px Arial',
      fill: '#000000',
      wordWrap: { width: boxWidth - 175, useAdvancedWrap: true},
      padding: {x:80, y:15}
    });

    this.dialogueContainer.add(this.dialogueText);

    this.dialogueScrollOffset = 0;

    // this.scrollbar = this.add.image(boxWidth - 20, 10, 'Scrollbar').setScale(0.5);
    // this.dialogueContainer.add(this.scrollbar);
  }

  /**
   * 
   * @deprecated 
   */
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

  showDialogue(array, callback, index=0) {
    this.currentlyTyping = true;
    this.dialogueText.setText(''); 
    if(this.fastText){
      this.currentlyTyping = false;
      this.dialogueText.setText(array[index]);
    }else {
      const text = array[index];
      const characters = text.split(/(?<=\n)|/);
      characters.forEach((char, index) => {
        this.time.delayedCall(index * 50, () => {
          let currentText = this.dialogueText.text;
          this.dialogueText.setText(currentText + char);
          if(index === characters.length -1) this.currentlyTyping = false;
        });
      })
    }
  
    this.continueBtn.setInteractive();

    this.dialogueContainer.setVisible(true);

    this.tweens.add({
      targets: this.dialogueContainer,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });

    const onContinueClick = () => {
      if (this.currentlyTyping) return;
      this.sound.play('Click');
      let newIndex = index + 1;
      if (newIndex >= this.messages.length) {
          callback();
          this.dialogueText.setText('');
      } else {
          this.continueBtn.setInteractive(false); // Disable button while text is showing
          console.log(index);
          console.log(newIndex);  
          this.showDialogue(this.messages, callback, newIndex);
      }

      // Remove the event listener after the button is pressed
      this.continueBtn.off('pointerdown', onContinueClick);
    };
    this.continueBtn.on('pointerdown', onContinueClick);
    // let buttonContainer = this.add.container(0, 0, [continueBtn, btnText]);
    // buttonContainer.setPosition(btnX, btnY);
    // this.dialogueContainer.add(buttonContainer);

    // continueBtn.on('pointerdown', () => {
    //   this.tweens.add({
    //     targets: this.dialogueContainer,
    //     alpha: 0,
    //     duration: 300,
    //     ease: 'Power2',
    //     onComplete: () => {
    //       this.dialogueContainer.setVisible(false);
    //       buttonContainer.destroy();
    //       if (callback) callback();
    //     }
    //   });
    // });
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

