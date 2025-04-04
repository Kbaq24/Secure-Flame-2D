class Scene extends Phaser.Scene {
    /**
     * @param {object} config
     * @param {string[]} messages 
     */
    constructor(config, messages) {
      super(config);
      this.messages = messages;
    }
  
    currentMessage = 0;
    currentlyTyping = false;
  
    // TODO: Make toggleable, or set to false for production
    fastText = false;
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
  
      this.createDialogueUI();
  
      this.physics.add.overlap(this.player, this.workstation, this.handleWorkstationInteraction, null, this);
    }
  
    /**@deprecated */
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
  
      this.btnText = this.add.text(btnX, btnY, 'Continue', {
          font: '18px Arial',
          fill: '#00FF00'
      }).setOrigin(0.5);
      
      this.continueBtn = this.add.image(btnX, btnY, 'Button')
          .setOrigin(0.5)
          .setDisplaySize(this.btnText.width + padding, this.btnText.height + padding);
      this.btnText.setDepth(1)
  
      this.continueBtn.on('pointerover', () => {
        this.continueBtn.setTint(0x00FF00);
      });
      this.continueBtn.on('pointerout', () => { 
        this.continueBtn.clearTint();
      })
  
      this.dialogueContainer = this.add.container(boxX, boxY, [this.dialogueBackground, this.continueBtn, this.btnText]);
  
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
    }
};
  
  