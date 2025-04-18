window.StartScene = class StartScene extends GameScene {
  constructor(){
    super({key: "StartScene"},
      [
        "Welcome to Secure Flame!",
        "In this game you will be working for a company as a cybersecurity analyst.",
        "Help your company make the best actions to protect your data.",
        "In this office, you'll face relentless cyberattacks by BAMF.",
        "Prepare to defend the network with quick thinking and decisive action.",
        "Your journey begins now..."
      ]
    );
  }
  create(){
    super.create();
    window.scores = []
    this.showDialogue(this.messages, () => {
      this.scene.start('Level1');
    });
    
    this.bgMusic = this.sound.add('Background_music', { loop: true, volume: 0.05 });
    this.bgMusic.play();
  }
}