window.Level4 = class Level4 extends Level {
  constructor(){
    const levels = [
      new Question(
         "Level 4: BAMF is attempting to steal user credentials using keyloggers.",
         [
          new QuestionOption("Deploy endpoint detection and educate users",  true,  "Correct! Awareness and tools are essential to stop this." ),
          new QuestionOption("Ignore it and hope it goes away",  false,  "Incorrect. Inaction enables threats." ),
          new QuestionOption("Install more keyboards",  false,  "Incorrect. That’s not even a fix." ),
          new QuestionOption("Post signs about security",  false,  "Incorrect. That’s not direct action.")
        ]
      ),
      new Question(
         "Suspicious software is detected on multiple devices.",
         [
          new QuestionOption("Quarantine systems and analyze threats",  true,  "Correct! Isolation prevents further spread." ),
          new QuestionOption("Restart the devices",  false,  "Incorrect. Restarting won’t remove malware." ),
          new QuestionOption("Email the malware creator",  false,  "Incorrect and risky." ),
          new QuestionOption("Download random removal tools",  false,  "Incorrect. That can make it worse." )
        ]
      ),
      new Question(
         "A user reports odd pop-ups and slow performance.",
         [
          new QuestionOption("Scan for spyware and malware",  true,  "Correct! This is typical of infection." ),
          new QuestionOption("Tell them to ignore it",  false,  "Incorrect. That delays response." ),
          new QuestionOption("Delete system32",  false,  "Seriously? That breaks the machine." ),
          new QuestionOption("Ask if they want a new computer",  false,  "Not the right approach." )
        ]
      ),
      new Question(
         "Your EDR system sends a critical alert from a workstation.",
         [
          new QuestionOption("Contain the device and trigger forensic review",  true,  "Correct! Lock it down and investigate." ),
          new QuestionOption("Turn off the EDR",  false,  "Incorrect. That removes your eyes." ),
          new QuestionOption("Ignore the alert",  false,  "Incorrect. Never ignore alerts." ),
          new QuestionOption("Give the user admin rights",  false,  "Terrible idea. Don’t do that." )
        ]
      ),
      new Question(
         "How do you prevent credential theft proactively?",
         [
          new QuestionOption("Enforce strong password policies and MFA",  true,  "Correct! Prevention is better than cure." ),
          new QuestionOption("Give everyone sticky notes",  false,  "Incorrect. That weakens security." ),
          new QuestionOption("Disable antivirus",  false,  "Incorrect. That exposes the system." ),
          new QuestionOption("Use '123456' as default",  false,  "Incorrect. That's a hacker's dream." )
        ]
      ),
    ];

    super(4, levels)
  }
}