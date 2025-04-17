window.WelcomeScene = class WelcomeScene extends GameScene {
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
        }, 300, 60);

        this.createMenuButton(centerX, 380, '↓ Load Game', () => {
            // Load game logic here
            console.log('Load game clicked');
            console.error("Unimplimented Action: 'Load Game'")
        }, 300, 60);

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

};