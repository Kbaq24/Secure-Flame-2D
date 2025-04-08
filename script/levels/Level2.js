window.Level2 = class Level2 extends Level {
  constructor(){
    const levels = [
      new Question(
        "Level 2: BAMF launches a ransomware attack across shared drives.",
        [
          new QuestionOption("Disconnect affected systems and notify response team", 10, "Correct! Isolating infected systems limits damage."),
          new QuestionOption("Try deleting suspicious files manually", -10, "Incorrect. That risks data loss and further spread."),
          new QuestionOption("Broadcast a general warning", -5, "Incorrect. Action is more effective than warnings."),
          new QuestionOption("Unplug your computer and go home", -20, "Incorrect. That’s evading responsibility.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "A user reports their screen is locked and demands ransom.",
        [
          new QuestionOption("Do not pay and report to authorities", 10, "Correct! Never negotiate with attackers."),
          new QuestionOption("Try to negotiate for less", -10, "Incorrect. That encourages future attacks."),
          new QuestionOption("Restart the device", -5, "Incorrect. That won't help with ransomware."),
          new QuestionOption("Ignore it, maybe it’ll fix itself", -20, "Incorrect. Inaction worsens the situation.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You find logs showing lateral movement by BAMF through compromised accounts.",
        [
          new QuestionOption("Disable compromised accounts and investigate scope", 10, "Correct! Containment is key."),
          new QuestionOption("Email users to change their passwords", -5, "Incorrect. Not secure enough."),
          new QuestionOption("Reboot the network", -10, "Incorrect. That’s disruptive and ineffective."),
          new QuestionOption("Change your admin password only", -20, "Incorrect. You must address all access points.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "Backups are found to be incomplete. What’s the next step?",
        [
          new QuestionOption("Report to IT leadership and start creating clean backups", 10, "Correct! You need solid restore points."),
          new QuestionOption("Delete old backup logs", -10, "Incorrect. You may lose important forensics."),
          new QuestionOption("Ignore and hope they're sufficient", -5, "Incorrect. That risks data loss."),
          new QuestionOption("Wipe current systems entirely", -20, "Incorrect. That’s drastic and premature.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "What long-term strategy helps protect against ransomware?",
        [
          new QuestionOption("Implement zero-trust access policies", 10, "Correct! Least privilege and monitoring are effective."),
          new QuestionOption("Install more firewalls", -5, "Incorrect. It’s not just perimeter defense."),
          new QuestionOption("Ban all email usage", -10, "Incorrect. Not practical or effective."),
          new QuestionOption("Switch to paper records", -20, "Incorrect. Not a scalable solution.")
        ],
        "UPDATE ME!!!"
      )
    ];
    super(2, levels)
  }
}






  






