window.WelcomeScene = class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WelcomeScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        // Set background color
        this.cameras.main.setBackgroundColor('#1a237e');

        // Create title text with pixel effect
        const title = this.add.text(centerX, 100, 'Secure\nFlame', {
            font: '64px "Press Start 2P"',
            color: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);


        // Create flame icon
        const flameIcon = this.add.text(centerX - 150, 80, '🔥', {
            font: '48px Arial',
            color: '#ff6b6b'
        }).setOrigin(0.5);

        // Add buttons
        this.createMenuButton(centerX, 300, '▶ New Game', () => {
            this.scene.start('StartScene');
        });

        this.createMenuButton(centerX, 380, '↓ Load Game', () => {
            // Load game logic here
            console.log('Load game clicked');
            console.error("Unimplimented Action: 'Load Game'")
        });

        // Add version text
        this.add.text(centerX, 550, 'Version 1.0.0', {
            font: '16px "Press Start 2P"',
            color: 'rgba(255, 255, 255, 0.5)'
        }).setOrigin(0.5);

        // Add subtle animation to the flame icon
        this.tweens.add({
            targets: flameIcon,
            y: 90,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} text 
     * @param {function} callback 
     * @returns 
     */
    createMenuButton(x, y, text, callback) {
        const button = this.add.container(x, y);
        // Button background
        const bg = this.add.rectangle(0, 0, 300, 60, 0xffffff);
        bg.setStrokeStyle(4, 0x000000);
        // Button text
        const buttonText = this.add.text(0, 0, text, {
            font: '24px "Press Start 2P"',
            color: '#000000'
        }).setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(300, 60);
        button.setInteractive();

        // Hover effects
        button.on('pointerover', () => {
            bg.setFillStyle(0xf0f0f0);
            buttonText.setTint(0x0000ff);
            this.tweens.add({
            targets: button,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 100
            });
        });

        button.on('pointerout', () => {
            bg.setFillStyle(0xffffff);
            buttonText.clearTint();
            this.tweens.add({
            targets: button,
            scaleX: 1,
            scaleY: 1,
            duration: 100
            });
        });

        button.on('pointerdown', () => {
            bg.setFillStyle(0xe0e0e0);
            this.tweens.add({
            targets: button,
            scaleX: 0.95,
            scaleY: 0.95,
            duration: 50,
            onComplete: () => {
                callback();
            }
            });
        });

        return button;
    }
};