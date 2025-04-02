window.main = class main extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    // Preload any main-specific assets here if necessary.
    // This scene relies on shared assets, so typically nothing is added here.
  }

  create() {
    // Fade in from black for transition effect.
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // Display the game splash title or welcome text.
    this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 50,
      "Secure Flame Game",
      {
        font: "40px Arial",
        fill: "#FF0000",
        align: "center"
      }
    ).setOrigin(0.5);

    // Optional: Subtitle or loading text
    this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 10,
      "Initializing firewall systems...",
      {
        font: "20px Arial",
        fill: "#FFFFFF",
        align: "center"
      }
    ).setOrigin(0.5);

    // Optional: Animated fade-in image or future logo
    // this.add.image(centerX, centerY + 100, 'YourLogo').setOrigin(0.5);

    // Optional: Loading animation or progress bar (future use)
    // this.loadBar = this.add.rectangle(centerX, centerY + 100, 200, 20, 0xffffff);

    // Wait and transition to LevelIntro scene or the appropriate scene later
    this.time.delayedCall(1500, () => {
      // Optionally switch to OfficeScene or LevelIntro
      this.scene.start('LevelIntro');
      // this.scene.start('Startscreen'); // ← If using Startscreen first
    });
  }
};





