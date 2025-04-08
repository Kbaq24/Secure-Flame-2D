window.Level1 = class Level1 extends Level {
  constructor() {
    const levels = [
      new Question(
        "Level 1: A strange alert appears on your screen—BAMF is targeting the network.",
        [
          new QuestionOption("Notify IT and disconnect", 10, "Correct! Alerting IT immediately helps contain the threat."),
          new QuestionOption("Disconnect without notifying", -5, "Incorrect. IT must be informed."),
          new QuestionOption("Ignore the alert", -20, "Incorrect. This allows the threat to spread."),
          new QuestionOption("Try to fix it alone", -10, "Incorrect. You could worsen the situation.")
        ],
        "Hint: Always consider alerting the proper team, verifying identity, and stopping the threat at the source."
      ),
      new Question(
        "You see failed login attempts from unknown locations. What do you do?",
        [
          new QuestionOption("Lock all access immediately", 10, "Correct! Quick lockdown prevents data leaks."),
          new QuestionOption("Wait to see if more attempts happen", -5, "Incorrect: passive observation wastes critical time."),
          new QuestionOption("Log out and go home", -20, "Incorrect. That’s neglecting duty!"),
          new QuestionOption("Message your friend about it", -20, "Incorrect. That violates policy and distracts others.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "An email claims to be from your boss but has a suspicious link.",
        [
          new QuestionOption("Verify the email with your boss directly", 10, "Correct! Phishing detection is key."),
          new QuestionOption("Click the link out of curiosity", -15, "Incorrect. You could trigger a malware download."),
          new QuestionOption("Forward it to your team", -25, "Incorrect. You’re helping the threat spread."),
          new QuestionOption("Report it to HR", -5, "Not quite. This is an IT matter.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "BAMF is now attempting DNS spoofing. What’s the best mitigation?",
        [
          new QuestionOption("Enforce DNSSEC and alert admins", 10, "Correct! DNSSEC helps protect against spoofing."),
          new QuestionOption("Unplug the modem", -10, "Incorrect. That won't fix DNS issues."),
          new QuestionOption("Ignore it", -20, "Incorrect. That leaves the system vulnerable."),
          new QuestionOption("Block Google DNS", -15, "Incorrect. It’s not related.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You’re prompted to install a software update from an unverified source.",
        [
          new QuestionOption("Decline and notify IT", 10, "Correct! Only IT-approved software should be installed."),
          new QuestionOption("Accept it to avoid delay", -20, "Incorrect. That's dangerous."),
          new QuestionOption("Check Reddit for advice", -15, "Incorrect. Reddit is not a secure resource."),
          new QuestionOption("Try it out on a test PC", -5, "Incorrect. Still risky without approval.")
        ],
        "UPDATE ME!!!"
      )
    ];
    super(1, levels);
  }
};




