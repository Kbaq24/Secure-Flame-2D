class Level extends GameScene
{
	/**
	 * 
	 * @param {number} level
	 * @param {Question[]} storyParts 
	 */
	constructor(level, storyParts)
	{
		super(
		{
			key: `Level${level}`
		});
		this.storyParts = storyParts;
		this.score = 0;
		this.part = 0;
        this.level = level;
		this.totalLevels = 5;
	}

	create(){
		super.create();
		this.score = Phaser.Math.Clamp((window.scores[this.level-2] ?? 75)+20,20,75);
		this.createScoreBar();
		this.triggerBAMFAlert();
		console.log(window.scores)

		
	}
	preload()
	{
		super.preload();
		this.load.audio('Right', './assets/audio/sound_effects/Right.wav');
		this.load.audio('Wrong', './assets/audio/sound_effects/Wrong.wav');
		this.load.audio('BAMF_Alert', './assets/audio/sound_effects/BAMF_Alert.wav');
		this.load.audio('Level_Complete', './assets/audio/sound_effects/Level_Complete.wav');
	}
	interpolateColor(num, low, medium, high) {
		num = Phaser.Math.Clamp(num, 0, 100);
	  
		let startColor, endColor, t;
	  
		if (num <= 50) {
		  startColor = Phaser.Display.Color.ValueToColor(low);
		  endColor = Phaser.Display.Color.ValueToColor(medium);
		  t = num / 50;
		} else {
		  startColor = Phaser.Display.Color.ValueToColor(medium);
		  endColor = Phaser.Display.Color.ValueToColor(high);
		  t = (num - 50) / 50;
		}
	  
		const r = Phaser.Math.Interpolation.Linear([startColor.red, endColor.red], t);
		const g = Phaser.Math.Interpolation.Linear([startColor.green, endColor.green], t);
		const b = Phaser.Math.Interpolation.Linear([startColor.blue, endColor.blue], t);
	  
		return Phaser.Display.Color.GetColor(r, g, b);
	  }
	  
	createScoreBar(){
		const x = 450;
		const y = 50;
		const width = 300;
		const height = 30;
		// Background bar (e.g., grey)
		this.scoreBarBg = this.add.rectangle(x, y, width, height, 0x555555)
		.setOrigin(0, 0);
  
		// Fill bar (e.g., green, will be resized later)
		this.scoreBarFill = this.add.rectangle(x, y, 0, height, 0x00ff00)
			.setOrigin(0, 0);

		this.scoreBarText = this.add.text(x + width / 2, y + height / 2, `${this.score}%`, {
			font: '16px Arial',
			fill: '#000000'
		}).setOrigin(0.5, 0.5);
		this.setScoreBar();
	}
	getScoreBarColor(){
		return this.interpolateColor(this.score, 0xFF0000, 0xFFFF00, 0x00FF00);
	}
	setScoreBar(){
		this.score = Phaser.Math.Clamp(this.score, 0, 100);
		this.scoreBarFill.width = this.score / 100 * this.scoreBarBg.width;
		this.scoreBarFill.setFillStyle(this.getScoreBarColor());
		this.scoreBarText.setText(`${this.score}%`);
	}
	triggerBAMFAlert()
	{
		console.log("Triggering BAMF Alert");
		if(this.level == 1){
			this.sound.play('BAMF_Alert', {volume: 0.4 });
		}
		console.log(this.storyParts)
		this.showDialogue(this.storyParts, () =>
		{
			console.log("Dialogue complete");
		});
	}

	removeBAMFOptions()
	{
		if (this.optionButtons) this.optionButtons.forEach(btn => btn.destroy());
	}
	showBAMFOptions(callback)
	{
		this.removeBAMFOptions();
		this.continueBtn.setVisible(false);
		this.dialogueText.setText('');
		this.optionButtons = [];
		let options = this.storyParts[this.part].options;
		Phaser.Utils.Array.Shuffle(options);
		options.forEach((option, index) =>
		{
			let optX, optY;
			console.log(option.text)

			if (index % 2 === 0)
			{
				optX = 100;
			}
			else
			{
				optX = 350;
			}
			if (index >= 2)
			{
				optY = 50;
			}
			else
			{
				optY = 100;
			}

			let optText = this.add.text(optX, optY - 10, option.text,
			{
				font: '18px Arial',
				fill: '#00FF00',
				wordWrap:
				{
					width: 250,
					useAdvancedWrap: true
				}
			}).setInteractive();


			// Add interaction for the option text
			optText.on('pointerdown', () =>
			{
				this.sound.play(option.score > 0 ? 'Right' : 'Wrong', {volume: 0.4 });
				
				this.score += option.score * this.storyParts[this.part].multiplier;
				if(this.score <= 0){
					window.scores.push(0);
					this.scene.start('GameOverScene');
					this.scene.stop(this.scene.key);

					return;
				} else {
					this.showDialogue(this.storyParts, callback, option.feedback, this.part + 1)
				}
				this.setScoreBar();
			});

			// Add the option text and arrow to the container
			this.dialogueContainer.add(optText);

			// Push the option buttons for further reference (optional)
			this.optionButtons.push(optText);
		});
		let btnX = this.dialogueBackground.displayWidth - 80;
		let btnY = this.dialogueBackground.displayHeight - 30;

		const hintButton = this.createMenuButton(btnX, btnY, "Need a hint?", () => {
			this.showDialogue(this.storyParts, callback, this.storyParts[this.part].hint, this.part);
			this.sound.play('Click');
		})

		this.dialogueContainer.add(hintButton);
		
		this.optionButtons.push(hintButton);
	}
	showDialogue(array, callback, feedback = null, index = 0)
	{
		console.log(array)
		if (this.part >= this.storyParts.length)
		{
			this.onLevelComplete();
            return;
		}
		this.removeBAMFOptions();
		this.continueBtn.setVisible(true);

		this.currentlyTyping = true;
		this.dialogueText.setText('');
		const text = feedback ?? array[index].storyText;
		if (this.fastText)
		{
			this.currentlyTyping = false;
			this.dialogueText.setText(text);
		}
		else
		{
			console.log(feedback)
			const characters = text.split(/(?<=\n)|/);
			characters.forEach((char, index) =>
			{
				this.time.delayedCall(index * 50, () =>
				{
					let currentText = this.dialogueText.text;
					this.dialogueText.setText(currentText + char);
					if (index === characters.length - 1) this.currentlyTyping = false;
				});
			})
		}

		this.continueBtn.setInteractive();

		this.dialogueContainer.setVisible(true);

		this.tweens.add(
		{
			targets: this.dialogueContainer,
			alpha: 1,
			duration: 300,
			ease: 'Power2'
		});

		const onContinueClick = () =>
		{
			if (this.currentlyTyping) return;
			if (feedback && !feedback.toLowerCase().includes("hint"))
			{
				this.part++;
				this.showDialogue(this.storyParts, callback, null, this.part);
			}
			else
			{
				this.showBAMFOptions(callback);
			}
			this.continueBtn.off('pointerdown', onContinueClick);
		};
		this.continueBtn.on('pointerdown', onContinueClick);
	}

    onLevelComplete(){
        this.sound.play('Level_Complete', {volume: 0.4 });
        console.log("Level Complete")
		window.scores.push(this.score);
		if(this.level >= this.totalLevels){
			this.scene.start('WinScene')
		}else {
			this.scene.start('Level'+(this.level+1));
		}
		this.scene.stop(this.scene.key);
    }
}