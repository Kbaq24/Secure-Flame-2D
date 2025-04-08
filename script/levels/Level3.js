window.Level3 = class Level3 extends Level {
  constructor(){
    const levels =  [
      new Question(
         "Level 3: BAMF is attacking internal switches to gain network-wide access.",
         [
          new QuestionOption("Isolate affected segments and apply ACLs",  true,  "Correct! Blocking unauthorized access at switch level is essential."),
          new QuestionOption("Restart the switches",  false,  "Incorrect. That’s a short-term disruption, not a solution."),
          new QuestionOption("Unplug the server",  false,  "Incorrect. That won’t stop lateral movement."),
          new QuestionOption("Notify the media",  false,  "Incorrect. That's not your role or effective right now."),
        ],
        "UPDATE ME!!!"
     ),
      new Question(
         "A core switch shows abnormal MAC address table flooding.",
         [
          new QuestionOption("Enable port security and log activity",  true,  "Correct! Port security limits flood attacks."),
          new QuestionOption("Ignore it",  false,  "Incorrect. That enables network chaos."),
          new QuestionOption("Open more ports",  false,  "Incorrect. That weakens your defenses."),
          new QuestionOption("Increase switch fan speed",  false,  "Incorrect. Not related to flooding."),
        ],
        "UPDATE ME!!!"
     ),
      new Question(
         "You suspect BAMF is spoofing IPs. How do you respond?",
         [
          new QuestionOption("Implement DHCP snooping and dynamic ARP inspection",  true,  "Correct! These stop IP spoofing attacks effectively."),
          new QuestionOption("Disable DNS",  false,  "Incorrect. DNS isn’t the vector here."),
          new QuestionOption("Restart DHCP services",  false,  "Incorrect. That doesn't address spoofing."),
          new QuestionOption("Ping Google",  false,  "Incorrect. That won't reveal spoofing."),
        ],
        "UPDATE ME!!!"
     ),
      new Question(
         "The attacker is trying VLAN hopping between departments.",
         [
          new QuestionOption("Ensure proper trunk configurations and disable unused ports",  true,  "Correct! Misconfigured trunks are vulnerable."),
          new QuestionOption("Delete all VLANs",  false,  "Incorrect. You need segmentation, not removal."),
          new QuestionOption("Assign everyone to the same VLAN",  false,  "Incorrect. That eliminates segmentation."),
          new QuestionOption("Ignore it",  false,  "Incorrect. That’s not a defensive strategy."),
        ],
        "UPDATE ME!!!"
     ),
      new Question(
         "What helps detect unusual traffic patterns in switches?",
         [
          new QuestionOption("Enable SNMP traps and NetFlow monitoring",  true,  "Correct! These tools monitor and alert on anomalies."),
          new QuestionOption("Turn off switch LEDs",  false,  "Incorrect. That’s cosmetic."),
          new QuestionOption("Install antivirus on switches",  false,  "Incorrect. Not applicable."),
          new QuestionOption("Upgrade Ethernet cables",  false,  "Incorrect. That doesn't prevent attacks."),
        ],
        "UPDATE ME!!!"
      )
    ];
    super(3, levels);
  }
}