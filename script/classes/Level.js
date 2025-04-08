class Level extends Scene
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
		this.score = 75;
		this.fastText = true;
		this.part = 0;
        this.level = level;
	}

	create(){
		super.create();
		this.createScoreBar();
		this.triggerBAMFAlert();
	}
	preload()
	{
		super.preload();
		this.load.audio('Right', 'assets/audio/sound_effects/Right.wav');
		this.load.audio('Wrong', 'assets/audio/sound_effects/Wrong.wav');
		this.load.audio('BAMF_Alert', 'assets/audio/sound_effects/BAMF_alert.wav');
		this.load.audio('Level_Complete', 'assets/audio/sound_effects/Level_Complete.wav');
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
		this.scoreBarFill.width = this.score / 100 * this.scoreBarBg.width;
		this.scoreBarFill.setFillStyle(this.getScoreBarColor());
		this.scoreBarText.setText(`${this.score}%`);
	}
	triggerBAMFAlert()
	{
		console.log("Triggering BAMF Alert");
		this.sound.play('BAMF_Alert');
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
		this.btnText.setVisible(false);
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
				this.sound.play(option.correct ? 'Right' : 'Wrong');
				this.showDialogue(this.storyParts, callback, option.feedback, this.part + 1)
				this.score += option.score * this.storyParts[this.part].multiplier;
				this.setScoreBar();
			});

			// Add the option text and arrow to the container
			this.dialogueContainer.add(optText);

			// Push the option buttons for further reference (optional)
			this.optionButtons.push(optText);
		});
		let btnX = this.dialogueBackground.displayWidth - 80;
		let btnY = this.dialogueBackground.displayHeight - 30;

		let hintText = this.add.text(btnX, btnY, "Need a Hint?",
		{
			font: '18px Arial',
			fill: '#FFD700'
		}).setInteractive().setOrigin(0.5);

		let hintButton = this.add.image(btnX, btnY, 'Button')
			.setOrigin(0.5)
			.setDisplaySize(hintText.width + 20, hintText.height + 20);

		this.dialogueContainer.add(hintButton);
		this.dialogueContainer.add(hintText);
		hintText.on('pointerdown', () =>
		{
			// BUG: Hint button navigates to the next question after showing hint
			this.showDialogue(this.storyParts, callback, this.storyParts[this.part].hint, this.part);
			this.sound.play('Click');
		});
		this.optionButtons.push(hintButton);
		this.optionButtons.push(hintText);
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
		this.btnText.setVisible(true);

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
        this.sound.play('Level_Complete');
        console.log("Level Complete")
        this.scene.start('Level'+(this.level+1));
    }
}