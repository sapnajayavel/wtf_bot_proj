module.exports = {
    questions: [{"_id":"59168eec734d1d72a14664fe","id":2,"answerType":"list","ques":"Do you have any medical conditions?","ans":["Diabetes","Thyroid","BP","Ulcer","Cholesterol","Jaundice"]},{"_id":"59168f33734d1d72a1466521","id":3,"answerType":"list","ques":"Are you on any specific diet?","ans":["Low fat","No spice","Vegen Diet","Vegeterian"]},{"_id":"59168e2c734d1d72a14664d0","id":1,"answerType":"list","ques":"What are you allergic to?","ans":["Milk","Cheese","Butter"]}],
    getRandomGame: function() {
        var min = 0,
            max = this.questions.length - 1;
        var random = Math.floor(Math.random() * (max - min)) + min;
        return this.questions[random];
    }
}