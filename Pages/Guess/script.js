const inputBox = document.querySelector("#input-box");
const guessBtn = document.querySelector("#guess-btn");
const response = document.querySelector("#response");

class Player {
    static players = []

    static currentPlayer;

    static validatePlayer(name){
        Player.players.forEach((player)=>{
            if (player.name === name) return true
        })
        return false
    }

    constructor(name){
        this.name = name
        this.recordGuess = null;
        this.guessGames = {};
        this.gameNumber = 1;
        Player.players.push(this)
    }
    addGame(game){
        //takes in an array
        this.guessGames[`game${this.gameNumber}`] = game
        this.gameNumber++
    }
}

class Game {
    static currentGame;
    static gamesNumber = 1;
    static games = {}
    static createGame(){
        Game.games[`game${this.gamesNumber}`] = new Game()
        Game.currentGame = Game.games[`game${this.gamesNumber}`]
        Game.gamesNumber++
    }
    constructor(){
        this.rand = 50//Math.floor(Math.random() * (101 - 1)+ 1);
        this.error = "Invalid Answer"
        this.guesses = []
        this.guessNumber = 0
        this.gameNumber = Game.gamesNumber 
    }
    checkNumber(guess){
        if (guess > this.rand){
            return ["Guess Lower",false]
        } else if (guess < this.rand){
            return ["Guess Heigher",false]
        } else{
            return [this.createWinMessage(),true]
        }
    }
    validateInput(input){
        return parseInt(input) ? true:false
    }
    updateGuess(guess){
        this.addGuess(guess)
        this.setGuessNumber()
    }
    addGuess(guess){
        this.guesses.push(guess)
    }
    setGuessNumber(){
        this.guessNumber = this.guesses.length
    }
    setRandom(num){
        this.rand = num
    }
    createWinMessage(){
        return `YOU WON! YOU GUESSED ${this.guessNumber} TIMES, WITH THESE GUESSES ${this.guesses.join(", ")}`
    }
    
}


player = new Player("Bob")
Player.currentPlayer = player
Game.createGame()

guessBtn.addEventListener("click", ()=>{
    
    if (Game.currentGame.validateInput(inputBox.value)){
        Game.currentGame.updateGuess(inputBox.value)
        let answer = Game.currentGame.checkNumber(inputBox.value)
        response.textContent = answer[0]
        if (answer[1]){
            console.log(Game.currentGame)
            Player.currentPlayer.addGame(Game.currentGame)
            Game.createGame()
        }
    }else{
        response.textContent = Game.currentGame.error
    }
    inputBox.value = "";
} )




// let guessGame = true;
// let players = [];
// let currentPlayer;
// while(guessGame){
//   let rand = Math.floor(Math.random() * (101 - 1)+ 1);
//   let playing = true;
//   let guessArr = [];
//   let name = prompt("What is your name?");
//   currentPlayer = null;

//   for (let i of players){
//     if(i.name === name){
//       currentPlayer = i;
//       break;
//     }
//   }

//   if (currentPlayer === null){
//     let player = {
//       name:name,
//       previousScore:0
//     }
//     currentPlayer = player;
//     players.push(player);
//   }


//   while(playing){
//     let message = "";
//     let guess = prompt("Guess a Number between 1-100:");
//     guess = parseInt(guess);
//     if(guess === NaN || guess > 100 || guess < 1){
//       message = `Invalid Guess ${name}! Please Guess Again!`
//     }
//     else if (guess === rand){
//       guessArr.push(guess)
//       if (currentPlayer.previousScore === 0){
//         message = `Correct ${name}! It only took you ${guessArr.length} guesses! and your guesses were ${guessArr.join(", ")}!`
//       } 
//       else if (currentPlayer.previousScore < guessArr.length){
//           message = `Correct ${name}! It only took you ${guessArr.length} guesses! and your guesses were ${guessArr.join(", ")}! You had ${guessArr.length - currentPlayer.previousScore} more guesses than last time`
//       } 
//       else if (currentPlayer.previousScore > guessArr.length){
//           message = `Correct ${name}! It only took you ${guessArr.length} guesses! and your guesses were ${guessArr.join(", ")}! You had ${currentPlayer.previousScore - guessArr.length} less guesses than last time`
//       }
//       else{
//           message = `Correct ${name}! It only took you ${guessArr.length} guesses! and your guesses were ${guessArr.join(", ")}! You had the same number of guesses than last time`
//       }
//       currentPlayer.previousScore = guessArr.length;
//       playing = false;
//     }
//     else if (guess > rand){
//       guessArr.push(guess)
//       message = `You need to guess lower ${name}.`
//     }else{
//       guessArr.push(guess)
//       message = `You need to guess higher ${name}.`
//     }
    
//     alert(message)
//   }

//   let question = prompt("do you want to play again? Yes or No")
//   if (question.toUpperCase() === "NO"){
//     alert("Thanks for Playing")
//     guessGame = false
//   }
// }