class QuestionOption {
    /**
     * 
     * @param {string} text 
     * @param {number} score 
     * @param {string} feedback 
     */
    constructor(text, score, feedback) {
      this.text = text;
      this.score = score;
      this.feedback = feedback;
    }
}

class Question {
    /**
     * 
     * @param {string} storyText 
     * @param {QuestionOption[]} options 
     * @param {string} hint 
     * @param {number} [multiplier=1] 
     */
    constructor(storyText, options, hint,multiplier=1) {
        this.storyText = storyText;
        this.options = options;
        this.hint = hint;
        this.multiplier = multiplier;
    }
}