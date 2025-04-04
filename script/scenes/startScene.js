window.StartScene = class StartScene extends Scene {
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
    this.showDialogue(this.messages, () => {
      this.scene.start('Level1');
    });
  }
}