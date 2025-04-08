window.Level2 = class Level2 extends Level {
  constructor(){
    const levels = [
      new Question(
        "Level 2: BAMF launches a ransomware attack across shared drives.",
        [
          new QuestionOption("Disconnect affected systems and notify response team",  true,  "Correct! Isolating infected systems limits damage." ),
          new QuestionOption("Try deleting suspicious files manually",  false,  "Incorrect. That risks data loss and further spread." ),
          new QuestionOption("Broadcast a general warning",  false,  "Incorrect. Action is more effective than warnings." ),
          new QuestionOption("Unplug your computer and go home",  false,  "Incorrect. That’s evading responsibility." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "A user reports their screen is locked and demands ransom.",
        [
          new QuestionOption( "Do not pay and report to authorities",  true,  "Correct! Never negotiate with attackers." ),
          new QuestionOption( "Try to negotiate for less",  false,  "Incorrect. That encourages future attacks." ),
          new QuestionOption( "Restart the device",  false,  "Incorrect. That won't help with ransomware." ),
          new QuestionOption( "Ignore it, maybe it’ll fix itself",  false,  "Incorrect. Inaction worsens the situation." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You find logs showing lateral movement by BAMF through compromised accounts.",
        [
          new QuestionOption("Disable compromised accounts and investigate scope",  true,  "Correct! Containment is key."),
          new QuestionOption("Email users to change their passwords",  false,  "Incorrect. Not secure enough."),
          new QuestionOption("Reboot the network",  false,  "Incorrect. That’s disruptive and ineffective."),
          new QuestionOption("Change your admin password only",  false,  "Incorrect. You must address all access points.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "Backups are found to be incomplete. What’s the next step?",
        [
          new QuestionOption( "Report to IT leadership and start creating clean backups",  true,  "Correct! You need solid restore points." ),
          new QuestionOption( "Delete old backup logs",  false,  "Incorrect. You may lose important forensics." ),
          new QuestionOption( "Ignore and hope they're sufficient",  false,  "Incorrect. That risks data loss." ),
          new QuestionOption( "Wipe current systems entirely",  false,  "Incorrect. That’s drastic and premature." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "What long-term strategy helps protect against ransomware?",
        [
          new QuestionOption("Implement zero-trust access policies",  true,  "Correct! Least privilege and monitoring are effective."),
          new QuestionOption("Install more firewalls",  false,  "Incorrect. It’s not just perimeter defense."),
          new QuestionOption("Ban all email usage",  false,  "Incorrect. Not practical or effective."),
          new QuestionOption("Switch to paper records",  false,  "Incorrect. Not a scalable solution.")
        ],
        "UPDATE ME!!!"
    )
    ];
    super(2, levels)
  }
}






  






