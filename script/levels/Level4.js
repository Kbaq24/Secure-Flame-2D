window.Level4 = class Level4 extends Level {
  constructor(){
    const levels = [
      new Question(
         "Level 4: BAMF is attempting to steal user credentials using keyloggers.",
         [
          new Option("Deploy endpoint detection and educate users",  true,  "Correct! Awareness and tools are essential to stop this." ),
          new Option("Ignore it and hope it goes away",  false,  "Incorrect. Inaction enables threats." ),
          new Option("Install more keyboards",  false,  "Incorrect. That’s not even a fix." ),
          new Option("Post signs about security",  false,  "Incorrect. That’s not direct action.")
        ]
      ),
      new Question(
         "Suspicious software is detected on multiple devices.",
         [
          new Option("Quarantine systems and analyze threats",  true,  "Correct! Isolation prevents further spread." ),
          new Option("Restart the devices",  false,  "Incorrect. Restarting won’t remove malware." ),
          new Option("Email the malware creator",  false,  "Incorrect and risky." ),
          new Option("Download random removal tools",  false,  "Incorrect. That can make it worse." )
        ]
      ),
      new Question(
         "A user reports odd pop-ups and slow performance.",
         [
          new Option("Scan for spyware and malware",  true,  "Correct! This is typical of infection." ),
          new Option("Tell them to ignore it",  false,  "Incorrect. That delays response." ),
          new Option("Delete system32",  false,  "Seriously? That breaks the machine." ),
          new Option("Ask if they want a new computer",  false,  "Not the right approach." )
        ]
      ),
      new Question(
         "Your EDR system sends a critical alert from a workstation.",
         [
          new Option("Contain the device and trigger forensic review",  true,  "Correct! Lock it down and investigate." ),
          new Option("Turn off the EDR",  false,  "Incorrect. That removes your eyes." ),
          new Option("Ignore the alert",  false,  "Incorrect. Never ignore alerts." ),
          new Option("Give the user admin rights",  false,  "Terrible idea. Don’t do that." )
        ]
      ),
      new Question(
         "How do you prevent credential theft proactively?",
         [
          new Option("Enforce strong password policies and MFA",  true,  "Correct! Prevention is better than cure." ),
          new Option("Give everyone sticky notes",  false,  "Incorrect. That weakens security." ),
          new Option("Disable antivirus",  false,  "Incorrect. That exposes the system." ),
          new Option("Use '123456' as default",  false,  "Incorrect. That's a hacker's dream." )
        ]
      ),
    ];

    super(4, levels)
  }
}