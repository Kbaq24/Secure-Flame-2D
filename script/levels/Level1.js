window.Level1 = class Level1 extends Level {
  constructor() {
    const levels = [
      new Question(
        "Level 1: A strange alert appears on your screen—BAMF is targeting the network.",
        [
          new Option("Notify IT and disconnect", true, "Correct! Alerting IT immediately helps contain the threat."),
          new Option("Disconnect without notifying", false, "Incorrect. IT must be informed."),
          new Option("Ignore the alert", false, "Incorrect. This allows the threat to spread."),
          new Option("Try to fix it alone", false, "Incorrect. You could worsen the situation.")
        ],
        "Hint: Always consider alerting the proper team, verifying identity, and stopping the threat at the source."
      ),
      new Question(
        "You see failed login attempts from unknown locations. What do you do?",
        [
          new Option("Lock all access immediately", true, "Correct! Quick lockdown prevents data leaks."),
          new Option("Wait to see if more attempts happen", false, "Incorrect: passive observation wastes critical time."),
          new Option("Log out and go home", false, "Incorrect. That’s neglecting duty!"),
          new Option("Message your friend about it", false, "Incorrect. That violates policy and distracts others.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "An email claims to be from your boss but has a suspicious link.",
        [
          new Option("Verify the email with your boss directly", true, "Correct! Phishing detection is key."),
          new Option("Click the link out of curiosity", false, "Incorrect. You could trigger a malware download."),
          new Option("Forward it to your team", false, "Incorrect. You’re helping the threat spread."),
          new Option("Report it to HR", false, "Not quite. This is an IT matter.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "BAMF is now attempting DNS spoofing. What’s the best mitigation?",
        [
          new Option("Enforce DNSSEC and alert admins", true, "Correct! DNSSEC helps protect against spoofing."),
          new Option("Unplug the modem", false, "Incorrect. That won't fix DNS issues."),
          new Option("Ignore it", false, "Incorrect. That leaves the system vulnerable."),
          new Option("Block Google DNS", false, "Incorrect. It’s not related.")
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You’re prompted to install a software update from an unverified source.",
        [
          new Option("Decline and notify IT", true, "Correct! Only IT-approved software should be installed."),
          new Option("Accept it to avoid delay", false, "Incorrect. That's dangerous."),
          new Option("Check Reddit for advice", false, "Incorrect. Reddit is not a secure resource."),
          new Option("Try it out on a test PC", false, "Incorrect. Still risky without approval.")
        ],
        "UPDATE ME!!!"
      )
    ];
    super(1, levels);
  }

  create() {
    super.create();
    this.triggerBAMFAlert();
  }
};




