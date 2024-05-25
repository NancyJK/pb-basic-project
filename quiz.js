import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import readlinesync from "readline-sync";

//Defining the Quiz Questions
const generalQuestions = [
  {
    question: "What is the most pupular programming language?",
    options: ["Python", "Java", "C++", "Javascript"],
    answer: 3,
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancover", "Ottawa", "Montreal"],
    answer: 2,
  },
  {
    question:
      "Who was the first Chancellor of the Federal Republic of Germany?",
    options: [
      "Konrad Adenauer",
      "Willy Brandt",
      "Helmut Kohl",
      "Angela Merkel",
    ],
    answer: 0,
  },
  {
    question: "Name the five oceans of the world.",
    options: [
      "Atlantic, Indian, Southern, Arctic, Pacific",
      "Atlantic, Indian, Caribbean, Arctic, Pacific",
      "Atlantic, Indian, Mediterranean, Arctic, Pacific",
      "Atlantic, Indian, Baltic, Arctic, Pacific",
    ],
    answer: 0,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Venus", "Saturn", "Jupiter"],
    answer: 3,
  },
];

const cssQuestions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
    ],
    answer: 0,
  },
  {
    question: "Which property is used to change the background color?",
    options: ["bgcolor", "color", "background-color", "all of the above"],
    answer: 2,
  },
  {
    question: "How do you add a background color for all <h1> elements?",
    options: [
      "all.h1 {background-color: #FFFFFF;}",
      "h1.all {background-color: #FFFFFF;}",
      "h1 {background-color: #FFFFFF;}",
      "None of the above",
    ],
    answer: 2,
  },
  {
    question: "What is the correct CSS syntax?",
    options: [
      "{body;color:black;}",
      "{body:color=black;}",
      "body:color=black;",
      "body {color: black;}",
    ],
    answer: 3,
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: [
      "// this is a comment",
      "/* this is a comment */",
      "// this is a comment //",
      "<!-- this is a comment -->",
    ],
    answer: 1,
  },
];

const htmlQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "None of the above",
    ],
    answer: 1,
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    options: ["<h1>", "<h6>", "<heading>", "<head>"],
    answer: 0,
  },
  {
    question: "What is the correct HTML for adding a background color?",
    options: [
      "<body style='background-color:yellow;'>",
      "<body bg='yellow'>",
      "<background>yellow</background>",
      "None of the above",
    ],
    answer: 0,
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    options: [
      "<a href='url' target='_blank'>",
      "<a href='url' new>",
      "<a href='url' target='new'>",
      "<a href='url' open>",
    ],
    answer: 0,
  },
  {
    question: "Which of these elements are all <table> elements?",
    options: [
      "<table><head><tfoot>",
      "<table><tr><td>",
      "<table><tr><tt>",
      "<table><caption><td>",
    ],
    answer: 1,
  },
];

const jsQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<script>", "<javascript>"],
    answer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    options: [
      "The <body> section",
      "Both the <head> section and the <body> section",
      "The <head> section",
      "None of the above",
    ],
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "<script href='xxx.js'>",
      "<script name='xxx.js'>",
      "<script src='xxx.js'>",
      "None of the above",
    ],
    answer: 2,
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: [
      "msg('Hello World');",
      "alertBox('Hello World');",
      "alert('Hello World');",
      "msgBox('Hello World');",
    ],
    answer: 2,
  },
];

class Quiz {
  constructor() {
    this.players = [];
    this.playersData = [];
    this.categories = {
      "General Knowledge": generalQuestions,
      CSS: cssQuestions,
      HTML: htmlQuestions,
      JavaScript: jsQuestions,
    };
  }

  updatePlayerData() {
    this.playersData.push(this.players[this.players.length - 1]);

    // Prepare data for the table
    let data = [["Name", "Score"]];
    for (let player of this.playersData) {
      data.push([player.name, player.score]);
    }

    // Output the table
    let output = "";
    let maxLength = 0; // To keep track of the longest line
    for (let row of data) {
      let line = row.join(" | ");
      output += line + "\n";
      if (line.length > maxLength) {
        maxLength = line.length;
      }
    }
    // Add separator lines
    output = output.replace(/\n/g, "\n" + "-".repeat(maxLength) + "\n");
    console.log(gradient("#8A2BE2", "#00FFFF", "#4169E1")(output));
  }

  playGame() {
    while (true) {
      this.welcomePlayer();
      let gameStatus = true;
      while (gameStatus) {
        let categoryChoice = this.chooseCategory();
        if (categoryChoice === "quit") {
          console.log(chalk.redBright("You have quit the game"));
          gameStatus = false;
          continue; // skip the rest of the loop
        }
        let questionResult = this.askQuestions();
        if (questionResult === "quit") {
          let playAgain = readlinesync.question(
            chalk.bgCyan("Do you want to play again? (y/n): ")
          );
          if (playAgain.toLowerCase() !== "y") {
            console.log(chalk.redBright("You have quit the game"));
            gameStatus = false;
          }
        }
        if (this.players[this.players.length - 1].score !== undefined) {
          this.findWinner();
          this.updatePlayerData(); // Update player data after each game
        }
      }
      let nextPlayer = readlinesync.question(
        chalk.bgCyan("Is there another player who wants to play? (y/n): ")
      );
      if (nextPlayer.toLowerCase() !== "y") {
        console.log(chalk.redBright("The game has ended."));
        return;
      }
    }
  }

  welcomePlayer() {
    console.log(
      gradient(
        "#8A2BE2",
        "#00FFFF"
      )("*******************************************")
    );
    console.log(
      gradient(
        "#8A2BE2",
        "#00FFFF"
      )("=        Welcome to the Quiz Game!        =")
    );
    console.log(
      gradient(
        "#8A2BE2",
        "#00FFFF"
      )("*******************************************")
    );
    let playerName = readlinesync.question(
      chalk.hex("#8A2BE2")("---------Please enter your name--------- ")
    );
    console.log(
      gradient(
        "#8A2BE2",
        "#00FFFF",
        "#4169E1"
      )(`Hello, ${playerName}! Let's start the game.`)
    );
    this.players.push({ name: playerName, score: 0 });
  }

  chooseCategory() {
    console.log(
      chalk.hex("#8A2BE2")("---------Please choose a category---------")
    );
    let keys = Object.keys(this.categories);
    for (let i = 0; i < keys.length; i++) {
      console.log(chalk.hex("#00FFFF")(`${i + 1}. ${keys[i]}`));
    }
    while (true) {
      let categoryIndex = readlinesync.question(
        chalk.hex("#8A2BE2")("Enter the number of your chosen category: ")
      );
      if (categoryIndex.toLocaleLowerCase() === "quit") {
        return "quit";
      }
      if (
        categoryIndex < 1 ||
        categoryIndex > keys.length ||
        isNaN(categoryIndex)
      ) {
        console.log(
          chalk.redBright("Invalid input. Please choose a valid category.")
        );
      } else {
        this.questions = this.categories[keys[categoryIndex - 1]];
        break;
      }
    }
  }

  askQuestions() {
    const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
    let questionCount = 0;
    for (let i = 0; i < this.questions.length; i++) {
      let questionText = chalk.bgCyanBright(this.questions[i].question);
      if (this.questions[i].options) {
        questionText +=
          "\n" +
          this.questions[i].options
            .map((option, index) =>
              gradient("#8A2BE2", "#00FFFF")(alphabets[index] + ". " + option)
            )
            .join("\n");
      }
      while (true) {
        let response = readlinesync.question(questionText + "\n");
        if (response.toLowerCase() === "quit") {
          console.log(
            chalk.redBright("You have quit the game. See you next time!")
          );
          return "quit";
        }
        if (
          this.questions[i].options &&
          (!isNaN(response) ||
            !["a", "b", "c", "d"].includes(response.toLowerCase()))
        ) {
          console.log(
            chalk.redBright("Invalid input. Please choose a valid answer.")
          );
        } else {
          this.checkAnswer(response, i, alphabets);
          break;
        }
      }
      questionCount++;
      if (questionCount % 3 === 0) {
        while (true) {
          let nextQuestion = readlinesync.question(
            chalk.hex("#00FFFF")(
              "Do you want to continue to the next question? (y/n): "
            )
          );
          if (nextQuestion.toLowerCase() === "n") {
            return "quit";
          } else if (nextQuestion.toLowerCase() === "y") {
            break;
          } else {
            console.log(
              chalk.redBright(
                "Invalid input. Please enter 'y' for yes or 'n' for no."
              )
            );
          }
        }
      }
    }
  }

  checkAnswer(response, questionIndex, alphabets) {
    let correctAnswer = this.questions[questionIndex].options
      ? this.questions[questionIndex].options[
          this.questions[questionIndex].answer
        ]
      : this.questions[questionIndex].answer;

    if (this.questions[questionIndex].options) {
      response.toLowerCase() === alphabets[this.questions[questionIndex].answer]
        ? this.updateScore(
            10,
            chalk.hex("#8A2BE2")("Correct! You gained 10 points.")
          )
        : this.updateScore(
            -5,
            chalk.hex("#8A2BE2")(
              "Wrong answer. You lost 5 points. The correct answer was: " +
                correctAnswer
            )
          );
    } else {
      response.toLowerCase() === correctAnswer.toLowerCase()
        ? this.updateScore(
            10,
            chalk.hex("#8A2BE2")("Correct🧠! You gained 10 points.")
          )
        : this.updateScore(
            -5,
            chalk.hex("#8A2BE2")(
              "Wrong answer. You lost 5 points. The correct answer was: " +
                correctAnswer
            )
          );
    }
  }

  findWinner() {
    let maxScore = -Infinity;
    let winner = null;
    console.log(chalk.hex("#8A2BE2")("Here are the final scores:"));
    for (let player of this.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        winner = player.name;
      }
    }
    let trophy = gradient("#8A2BE2", "#00FFFF", "#4169E1").multiline(
      [
        "   ___________",
        "  '._==_==_=_.'",
        "  .-\\:      /-.",
        " ( (|:      |) )",
        " '-.-\\:.__./-.-'",
        "   '-._____.-'",
      ].join("\n")
    );
    console.log(trophy);
  }
  updateScore(points, message) {
    this.players[this.players.length - 1].score += points;
    console.log(chalk.hex("#8A2BE2")(message));
  }
}

let quiz = new Quiz();
quiz.playGame();
console.log(quiz.playersData);
