class Deck {
    constructor() {
        this.number = 12;
        this.deck = this.makeDeck();
    }

    makeDeck() {
        let deck = [];
        let faces = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
        let suits = ["💎","❤️","🐯","🪐"]
    
        faces.forEach((face,i) => {
            for (let suit of suits) {
                deck.push(new Card(face,suit,i+2));
            }
        })
        
        for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
    
        //borrowed from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    
        return deck;
    }
}

class Card {
    constructor(face,suit,value) {
        this.face = face;
        this.suit = suit;
        this.value = value;
    }

    burn() {
        console.log(`You are burning ${this.face} of ${this.suit}`)
    }
}


class Game {
    constructor() {
        this.deck = new Deck();
        this.deck = this.deck.deck;
        this.gameOver = false;
        this.player1Score = 0;
        this.player2Score = 0;
        this.round = 0;
        this.button = document.getElementById('next');
        this.button.addEventListener('click', () => {
            this.nextRound();
        })
    }


    renderCards() {
        let p1Z = document.getElementById(`player1`);
        let p2Z = document.getElementById(`player2`);
        let scores = document.getElementById('scores');

        p1Z.innerHTML = "";
        p2Z.innerHTML = "";

        let p1Card = this.deck.splice(0,1)[0];
        let p2Card = this.deck.splice(0,1)[0];


        if (p1Card.value === p2Card.value) {
            console.log("Tie")
        } else if (p1Card.value > p2Card.value) {
            this.player1Score++;
        } else {
            this.player2Score++;
        }

        scores.innerText = `Player 1: ${this.player1Score} | Player 2: ${this.player2Score}`

        let card1 = document.createElement('h2');
        let card2 = document.createElement('h2');

        card1.innerText = `${p1Card.face}${p1Card.suit}`;
        card1.setAttribute("class","beautifulCard");
        card2.innerText = `${p2Card.face}${p2Card.suit}`;
        card2.setAttribute("class","beautifulCard");

        p1Z.append(card1);
        p2Z.append(card2);

    }

    nextRound() {
        this.renderCards();
    }

    /*
        all 52 cards exists

        Show 2 piles of cards.
        
        display the top card of each person's pile
    
    */

}

let g = new Game();