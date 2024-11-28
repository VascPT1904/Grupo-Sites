// Blackjack object
const MAX_POINTS = 21;

class BlackJack {
    constructor() {
        this.dealer_cards = [];
        this.player_cards = [];
        this.dealerTurn = false;
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'Busted': false,
            'playerWon': false,
            'Blackjack': false,
            'dealerBlackJack': false,
            'draw': false
        };
        this.deck = [];

        this.new_deck = function () {
            const numNaipes = 4; 
            const numCartas = 13; 
        
            this.deck = [];
        
            for (let suit = 0; suit < numNaipes; suit++) {
                for (let rank = 1; rank <= numCartas; rank++) {
                    this.deck.push(rank);
                }
            }
        };

        this.shuffle = function () {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        };

        
    }

    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    get_player_cards() {
        return this.player_cards.slice();
    }

    setDealerTurn(val) {
        this.dealerTurn = val;
    }

    get_cards_value(cards) {
        let cont = 0;
        let numAces = 0;
    
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            if (card >= 2 && card <= 10) {
                cont += card;
            } else if (card >= 11 && card <= 13) {
                cont += 10;
            } else {
                cont += 11; 
                numAces++;
            }
        }
    
        
        while (cont > MAX_POINTS && numAces > 0) {
            cont -= 10; 
            numAces--;
        }
    
        return cont;
    }
    

    dealer_move() {
        const randcard = this.deck.pop();
        this.dealer_cards.push(randcard);
        return this.get_game_state();
    }

    player_move() {
        const randcard = this.deck.pop();
        this.player_cards.push(randcard);
        return this.get_game_state();
    }
    get_game_state() {
        const playerPoints = this.get_cards_value(this.player_cards);
        const dealerPoints = this.get_cards_value(this.dealer_cards);
        if (playerPoints===dealerPoints){
            this.state.draw=true;
        }
        if (playerPoints===21){
            this.state.Blackjack=true;
        }
        if(dealerPoints===21){
            this.state.dealerBlackJack=true; 
        }
        if(dealerPoints>21 || playerPoints>21){
            this.state.Busted=true;
        }
        if ((dealerPoints>=17 && dealerPoints<21)&&(playerPoints>dealerPoints)){
                this.state.playerWon=true;
                
            }
        if((dealerPoints>=17 && dealerPoints<21)&&(dealerPoints>playerPoints)){
                this.state.dealerWon=true;
                
        }
        if (this.state.draw ||this.state.Blackjack|| this.state.dealerBlackJack||this.state.Busted
            ||this.state.playerWon||this.state.dealerWon){
                this.state.gameEnded=true;
            }
        return this.state;
    } 
    

    card_image(card, image) {
        
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        
        const suitIndex = Math.floor(Math.random()*4);
        
        const imagePath = `img/png/${ranks[card-1]}_of_${suits[suitIndex]}.png`;
    
        const imageElement = document.createElement("img");
        imageElement.classList.add("card-image");
        imageElement.src = imagePath;
        document.getElementById(image).appendChild(imageElement);
    }
}
