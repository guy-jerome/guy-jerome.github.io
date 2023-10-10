const guessingGame = document.querySelector("#guessing-game");
const inputBox = document.querySelector("#input-box");
const guessBtn = document.querySelector("#guess-btn");
const response = document.querySelector("#response");

const login = document.querySelector("#login");
const userName = document.querySelector("#user-name");
const submitName = document.querySelector("#submit-name");
const nameResponse = document.querySelector("#name-response");

const gameOver = document.querySelector("#game-over");
const yesBtn = document.querySelector("#yes-btn")
const noBtn = document.querySelector("#no-btn")
const winning = document.querySelector("#winning")
const newLogin = document.querySelector("#new-login")
const yesNo = document.querySelector("#yes-no")
class Player {
    static players = []

    static currentPlayer;

    static validatePlayer(name) {
        for (const player of Player.players) {
            if (player.name === name) {
                return player; // Return the player object if found
            }
        }
        return false; // Return false if the player with the specified name is not found
    }
    static validateName(name){
        if(name){
            return true
        }else{
            return false
        }
    }
    

    constructor(name){
        this.name = name
        this.recordGuess = null;
        this.guessGames = []
        this.gameNumber = 0;
        Player.players.push(this)
    }
    addGame(game){
        //takes in an array
        this.guessGames.push(game)
        this.gameNumber++
    }
    getLastGame(){
        if (this.guessGames.length > 0){
            return this.guessGames[this.gameNumber - 1].guessNumber
        }else{
            return null
        }
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
        this.guessNumber = null
        this.gameNumber = Game.gamesNumber 
    }
    checkNumber(guess, player){
        if (guess > this.rand){
            return ["Guess Lower",false]
        } else if (guess < this.rand){
            return ["Guess Higher",false]
        } else{
            return [this.createWinMessage(player),true]
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
    createWinMessage(player){
        let lastGame = player.getLastGame();
        console.log(lastGame)
        let message = `YOU WON! YOU GUESSED ${this.guessNumber} TIMES, WITH THESE GUESSES ${this.guesses.join(", ")}!`
        if(lastGame === null){
            message += "This is your first game."
        }else if(lastGame < this.guessNumber){
            message += `You made ${this.guessNumber - lastGame} more guesses than last time`
        }else if (lastGame > this.guessNumber){
            message += `You made ${lastGame - this.guessNumber} less guesses than last time`
        }else if (lastGame === this.guessNumber){
            message += "You had the same number of guesses as last time"
        }
        return message

    }
    
}
submit = ()=>{
    if (Player.validateName(userName.value)){
        let player = Player.validatePlayer(userName.value)
        player ? Player.currentPlayer = player: Player.currentPlayer = new Player(userName.value)
        guessingGame.style.display = "block";
        login.style.display = "none";
        Game.createGame()
    }else{
        nameResponse.textContent = "Invalid Name"
    }
        userName.value = ""

}

guess = 

submitName.addEventListener("click", submit)

userName.addEventListener("keydown", event=>{
    console.log("pressed")
    if (event.key === "Enter" || event.keyCode === 13){
        console.log("pressed")
        submit();
    }
})

guessBtn.addEventListener("click", ()=>{
    
    if (Game.currentGame.validateInput(inputBox.value)){
        Game.currentGame.updateGuess(inputBox.value)
        let answer = Game.currentGame.checkNumber(inputBox.value, Player.currentPlayer)
        response.textContent = answer[0]
        if (answer[1]){
            Player.currentPlayer.addGame(Game.currentGame)
            guessingGame.style.display = "none";
            gameOver.style.display = "block";
            winning.textContent = answer[0]
            response.textContent = ""
        }
    }else{
        response.textContent = Game.currentGame.error
    }
    inputBox.value = "";
} )


newLogin.addEventListener("click", ()=>{
    gameOver.style.display = "none";
    login.style.display = "block";
    winning.textContent = "";
    
})

yesNo.addEventListener("click", (event)=>{
    if (event.target === yesBtn){
        gameOver.style.display = "none";
        guessingGame.style.display = "block";
        Game.createGame()
    } else if (event.target === noBtn){
        gameOver.style.display = "none";
    }

})




guessingGame.style.display = "none";
gameOver.style.display = "none";

