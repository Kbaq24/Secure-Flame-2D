window.WinScene = class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }
    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    
        // Title Text
        const text = this.add.text(centerX, centerY - 100, 'Game Over', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            backgroundColor: '#000000',
        }).setOrigin(0.5, 0.5); // Center text

        window.scores.forEach((element, index) => {
            const scoreText = this.add.text(centerX, centerY - 50 + (index * 30), `Score ${index + 1}: ${element}`, {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#FFFFFF',
                backgroundColor: '#000000',
            }).setOrigin(0.5, 0.5); // Center text
        });

        const bonusLevelRequirement = 10;
        const averageScore = window.scores.reduce((a, b) => a + b, 0) / window.scores.length;
        if(averageScore >= bonusLevelRequirement) {
            const bonusText = this.add.text(centerX, centerY + 150, 'Bonus Level Unlocked!', {
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#00FF00',
                backgroundColor: '#555555',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5, 0.5)
            .setInteractive();
            bonusText.on('pointerdown', () => {
                this.scene.start('BonusLevelScene');
            });
        }

        const startButton = this.add.text(centerX, centerY + 200, 'Try Again', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            backgroundColor: '#555555',
            padding: { x: 10, y: 5 }
        })
        .setOrigin(0.5, 0.5)
        .setInteractive();
    
        startButton.on('pointerdown', () => {
            this.scene.start('StartScene');
        });
    }
}