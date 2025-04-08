window.Level5 = class Level5 extends Level {
  constructor(){
    const parts = [
      new Question(
         "Level 5: BAMF is launching a large-scale data exfiltration campaign.",
         [
          new QuestionOption("Trigger full network lockdown and notify legal", true,  "Correct! Containment and legal are critical here." ),
          new QuestionOption("Delete the logs", false,  "Incorrect. That removes your forensic trail." ),
          new QuestionOption("Ignore and go to lunch", false,  "Incorrect. Time is everything during breaches." ),
          new QuestionOption("Ask the attacker to stop", false,  "That won’t work."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "You detect unauthorized access to sensitive records.",
         [
          new QuestionOption("Disable the user account and report immediately", true,  "Correct! Cut access and escalate." ),
          new QuestionOption("Change your own password", false,  "Incorrect. That doesn’t fix the breach." ),
          new QuestionOption("Log it and move on", false,  "Incorrect. Passive monitoring fails here." ),
          new QuestionOption("Announce it on social media", false,  "Disastrous. That’s confidential."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "You find evidence of BAMF exfiltrating encrypted data. What's your move?",
         [
          new QuestionOption("Shut down exfil paths and review firewall policies", true,  "Correct! Block and audit the route." ),
          new QuestionOption("Send an email to warn the team", false,  "Too slow and informal for this attack." ),
          new QuestionOption("Try to decrypt their data", false,  "Not your job or responsibility." ),
          new QuestionOption("Turn off the SIEM system", false,  "Never disable your eyes and ears."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "The CISO asks for a formal incident report.",
         [
          new QuestionOption("Generate detailed logs and breach summary", true,  "Correct! Document everything precisely." ),
          new QuestionOption("Just say 'It’s handled'", false,  "Incorrect. Documentation is mandatory." ),
          new QuestionOption("Tell them it was a false alarm", false,  "Incorrect. That’s dishonest." ),
          new QuestionOption("Blame another department", false,  "That’s not professional or effective."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "How do you ensure breaches are detected earlier in the future?",
         [
          new QuestionOption("Enhance IDS rules and run regular threat hunting", true,  "Correct! Proactivity and improvement are key." ),
          new QuestionOption("Turn off alerts at night", false,  "Incorrect. Attacks happen anytime." ),
          new QuestionOption("Disable logging to save storage", false,  "Incorrect. You need logs for visibility." ),
          new QuestionOption("Rely solely on antivirus", false,  "Incorrect. Antivirus is only one layer."),
        ],
        "UPDATE ME!!!!"
      ),
    ];
    super(5, parts);
  }
}