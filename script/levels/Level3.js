window.Level3 = class Level3 extends Level {
  constructor(){
    const levels = [
      new Question(
        "Level 3: BAMF is attacking internal switches to gain network-wide access.",
        [
          new QuestionOption("Isolate affected segments and apply ACLs", 10, "Correct! Blocking unauthorized access at switch level is essential."),
          new QuestionOption("Restart the switches", -5, "Incorrect. That’s a short-term disruption, not a solution."),
          new QuestionOption("Unplug the server", -10, "Incorrect. That won’t stop lateral movement."),
          new QuestionOption("Notify the media", -20, "Incorrect. That's not your role or effective right now."),
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "A core switch shows abnormal MAC address table flooding.",
        [
          new QuestionOption("Enable port security and log activity", 10, "Correct! Port security limits flood attacks."),
          new QuestionOption("Ignore it", -20, "Incorrect. That enables network chaos."),
          new QuestionOption("Open more ports", -10, "Incorrect. That weakens your defenses."),
          new QuestionOption("Increase switch fan speed", -5, "Incorrect. Not related to flooding."),
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "You suspect BAMF is spoofing IPs. How do you respond?",
        [
          new QuestionOption("Implement DHCP snooping and dynamic ARP inspection", 10, "Correct! These stop IP spoofing attacks effectively."),
          new QuestionOption("Disable DNS", -5, "Incorrect. DNS isn’t the vector here."),
          new QuestionOption("Restart DHCP services", -10, "Incorrect. That doesn't address spoofing."),
          new QuestionOption("Ping Google", -20, "Incorrect. That won't reveal spoofing."),
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "The attacker is trying VLAN hopping between departments.",
        [
          new QuestionOption("Ensure proper trunk configurations and disable unused ports", 10, "Correct! Misconfigured trunks are vulnerable."),
          new QuestionOption("Delete all VLANs", -10, "Incorrect. You need segmentation, not removal."),
          new QuestionOption("Assign everyone to the same VLAN", -5, "Incorrect. That eliminates segmentation."),
          new QuestionOption("Ignore it", -20, "Incorrect. That’s not a defensive strategy."),
        ],
        "UPDATE ME!!!"
      ),
      new Question(
        "What helps detect unusual traffic patterns in switches?",
        [
          new QuestionOption("Enable SNMP traps and NetFlow monitoring", 10, "Correct! These tools monitor and alert on anomalies."),
          new QuestionOption("Turn off switch LEDs", -5, "Incorrect. That’s cosmetic."),
          new QuestionOption("Install antivirus on switches", -10, "Incorrect. Not applicable."),
          new QuestionOption("Upgrade Ethernet cables", -20, "Incorrect. That doesn't prevent attacks."),
        ],
        "UPDATE ME!!!"
      )
    ];
    super(3, levels);
  }
}