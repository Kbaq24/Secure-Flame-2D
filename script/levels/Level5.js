window.Level5 = class Level5 extends Level {
  constructor(){
    const parts = [
      new Question(
        "Level 5: BAMF is launching a large-scale data exfiltration campaign.",
        [
          new QuestionOption("Trigger full network lockdown and notify legal", 10, "Correct! Containment and legal are critical here."),
          new QuestionOption("Delete the logs", -20, "Incorrect. That removes your forensic trail."),
          new QuestionOption("Ignore and go to lunch", -10, "Incorrect. Time is everything during breaches."),
          new QuestionOption("Ask the attacker to stop", -5, "That won’t work.")
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
        "You detect unauthorized access to sensitive records.",
        [
          new QuestionOption("Disable the user account and report immediately", 10, "Correct! Cut access and escalate."),
          new QuestionOption("Change your own password", -5, "Incorrect. That doesn’t fix the breach."),
          new QuestionOption("Log it and move on", -10, "Incorrect. Passive monitoring fails here."),
          new QuestionOption("Announce it on social media", -20, "Disastrous. That’s confidential.")
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
        "You find evidence of BAMF exfiltrating encrypted data. What's your move?",
        [
          new QuestionOption("Shut down exfil paths and review firewall policies", 10, "Correct! Block and audit the route."),
          new QuestionOption("Send an email to warn the team", -5, "Too slow and informal for this attack."),
          new QuestionOption("Try to decrypt their data", -10, "Not your job or responsibility."),
          new QuestionOption("Turn off the SIEM system", -20, "Never disable your eyes and ears.")
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
        "The CISO asks for a formal incident report.",
        [
          new QuestionOption("Generate detailed logs and breach summary", 10, "Correct! Document everything precisely."),
          new QuestionOption("Just say 'It’s handled'", -5, "Incorrect. Documentation is mandatory."),
          new QuestionOption("Tell them it was a false alarm", -20, "Incorrect. That’s dishonest."),
          new QuestionOption("Blame another department", -10, "That’s not professional or effective.")
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
        "How do you ensure breaches are detected earlier in the future?",
        [
          new QuestionOption("Enhance IDS rules and run regular threat hunting", 10, "Correct! Proactivity and improvement are key."),
          new QuestionOption("Turn off alerts at night", -10, "Incorrect. Attacks happen anytime."),
          new QuestionOption("Disable logging to save storage", -20, "Incorrect. You need logs for visibility."),
          new QuestionOption("Rely solely on antivirus", -5, "Incorrect. Antivirus is only one layer.")
        ],
        "UPDATE ME!!!!"
      )
    ];
    super(5, parts);
  }
}