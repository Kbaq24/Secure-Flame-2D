window.WelcomeScene = class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WelcomeScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    
        // Title Text
        const text = this.add.text(centerX, centerY - 100, 'Secure Flame', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            backgroundColor: '#000000',
        }).setOrigin(0.5, 0.5); // Center text
    
        // Start Button
        const startButton = this.add.text(centerX, centerY + 100, 'Start', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            backgroundColor: '#555555',
            padding: { x: 10, y: 5 } // Adds padding for better clickability
        })
        .setOrigin(0.5, 0.5) // Center button
        .setInteractive();
    
        startButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
    
}