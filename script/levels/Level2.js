window.Level2 = class Level2 extends Level {
  constructor(){
    const levels = [
      new Question(
        "Level 2: BAMF launches a ransomware attack across shared drives.",
        [
          new Option("Disconnect affected systems and notify response team",  true,  "Correct! Isolating infected systems limits damage." ),
          new Option("Try deleting suspicious files manually",  false,  "Incorrect. That risks data loss and further spread." ),
          new Option("Broadcast a general warning",  false,  "Incorrect. Action is more effective than warnings." ),
          new Option("Unplug your computer and go home",  false,  "Incorrect. That’s evading responsibility." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "A user reports their screen is locked and demands ransom.",
        [
          new Option( "Do not pay and report to authorities",  true,  "Correct! Never negotiate with attackers." ),
          new Option( "Try to negotiate for less",  false,  "Incorrect. That encourages future attacks." ),
          new Option( "Restart the device",  false,  "Incorrect. That won't help with ransomware." ),
          new Option( "Ignore it, maybe it’ll fix itself",  false,  "Incorrect. Inaction worsens the situation." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You find logs showing lateral movement by BAMF through compromised accounts.",
        [
          new Option("Disable compromised accounts and investigate scope",  true,  "Correct! Containment is key."),
          new Option("Email users to change their passwords",  false,  "Incorrect. Not secure enough."),
          new Option("Reboot the network",  false,  "Incorrect. That’s disruptive and ineffective."),
          new Option("Change your admin password only",  false,  "Incorrect. You must address all access points.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "Backups are found to be incomplete. What’s the next step?",
        [
          new Option( "Report to IT leadership and start creating clean backups",  true,  "Correct! You need solid restore points." ),
          new Option( "Delete old backup logs",  false,  "Incorrect. You may lose important forensics." ),
          new Option( "Ignore and hope they're sufficient",  false,  "Incorrect. That risks data loss." ),
          new Option( "Wipe current systems entirely",  false,  "Incorrect. That’s drastic and premature." )
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "What long-term strategy helps protect against ransomware?",
        [
          new Option("Implement zero-trust access policies",  true,  "Correct! Least privilege and monitoring are effective."),
          new Option("Install more firewalls",  false,  "Incorrect. It’s not just perimeter defense."),
          new Option("Ban all email usage",  false,  "Incorrect. Not practical or effective."),
          new Option("Switch to paper records",  false,  "Incorrect. Not a scalable solution.")
        ],
        "UPDATE ME!!!"
    )
    ];
    super(2, levels)
  }
}






  






