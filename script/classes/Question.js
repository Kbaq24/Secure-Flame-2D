class Option {
    constructor(text, correct, feedback) {
      this.text = text;
      this.correct = correct;
      this.feedback = feedback;
    }
}

class Question {
    constructor(storyText, options, hint,score=1) {
        this.storyText = storyText;
        this.options = options;
        this.hint = hint;
        this.score = score;
    }
}