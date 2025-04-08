window.Level5 = class Level5 extends Level {
  constructor(){
    const parts = [
      new Question(
         "Level 5: BAMF is launching a large-scale data exfiltration campaign.",
         [
          new Option("Trigger full network lockdown and notify legal", true,  "Correct! Containment and legal are critical here." ),
          new Option("Delete the logs", false,  "Incorrect. That removes your forensic trail." ),
          new Option("Ignore and go to lunch", false,  "Incorrect. Time is everything during breaches." ),
          new Option("Ask the attacker to stop", false,  "That won’t work."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "You detect unauthorized access to sensitive records.",
         [
          new Option("Disable the user account and report immediately", true,  "Correct! Cut access and escalate." ),
          new Option("Change your own password", false,  "Incorrect. That doesn’t fix the breach." ),
          new Option("Log it and move on", false,  "Incorrect. Passive monitoring fails here." ),
          new Option("Announce it on social media", false,  "Disastrous. That’s confidential."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "You find evidence of BAMF exfiltrating encrypted data. What's your move?",
         [
          new Option("Shut down exfil paths and review firewall policies", true,  "Correct! Block and audit the route." ),
          new Option("Send an email to warn the team", false,  "Too slow and informal for this attack." ),
          new Option("Try to decrypt their data", false,  "Not your job or responsibility." ),
          new Option("Turn off the SIEM system", false,  "Never disable your eyes and ears."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "The CISO asks for a formal incident report.",
         [
          new Option("Generate detailed logs and breach summary", true,  "Correct! Document everything precisely." ),
          new Option("Just say 'It’s handled'", false,  "Incorrect. Documentation is mandatory." ),
          new Option("Tell them it was a false alarm", false,  "Incorrect. That’s dishonest." ),
          new Option("Blame another department", false,  "That’s not professional or effective."),
        ],
        "UPDATE ME!!!!"
      ),
      new Question(
         "How do you ensure breaches are detected earlier in the future?",
         [
          new Option("Enhance IDS rules and run regular threat hunting", true,  "Correct! Proactivity and improvement are key." ),
          new Option("Turn off alerts at night", false,  "Incorrect. Attacks happen anytime." ),
          new Option("Disable logging to save storage", false,  "Incorrect. You need logs for visibility." ),
          new Option("Rely solely on antivirus", false,  "Incorrect. Antivirus is only one layer."),
        ],
        "UPDATE ME!!!!"
      ),
    ];
    super(5, parts);
  }
}