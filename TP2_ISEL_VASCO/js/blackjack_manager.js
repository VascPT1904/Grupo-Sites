//Blackjack oop

let game = null;
let player=0;
let dealer=0;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
    audioBlackjack_Dealer.pause();
    audioBlackjack_Dealer.currentTime = 0;
    audioBust.pause();
    audioBust.currentTime = 0;
    audioDraw.pause();
    audioDraw.currentTime = 0;
    audioYou_Lose.pause();
    audioYou_Lose.currentTime = 0;
    audioYou_Win.pause();
    audioYou_Win.currentTime = 0;
    audioBlackjack.pause();
    audioBlackjack.currentTime = 0;

    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("dealer-cards").innerHTML = "";
    buttons_initialization();

    game=new BlackJack();

    game.shuffle(game.new_deck());
    game.player_move();
    const lastPlayerCard = game.get_player_cards()[game.get_player_cards().length - 1];
    game.card_image(lastPlayerCard, "player-cards");
    game.player_move();
    const lastPlayerCard2 = game.get_player_cards()[game.get_player_cards().length - 1];
    game.card_image(lastPlayerCard2, "player-cards");
    game.dealer_move();
    const lastDealerCard = game.get_dealer_cards()[game.get_dealer_cards().length - 1];
    game.card_image(lastDealerCard, "dealer-cards");
    
    const back = document.createElement("img");
    back.src='img/png/card_back.png'
    back.classList.add("card-image");
    document.getElementById("dealer-cards").appendChild(back);

    

    update_player(game.player);
    update_dealer(game.dealer);
    document.getElementById("result").innerHTML = "";
    

    game.get_game_state();
    player=game.get_cards_value(game.get_player_cards());
    dealer=game.get_cards_value(game.get_dealer_cards());

    if (game.state.Blackjack) {
        document.getElementById("result").innerHTML = "BLACKJACK,You Win!";
        const cardImageElements = document.querySelectorAll('.card-image');
        cardImageElements.forEach((element) => {
            element.style.transform = 'rotateY(30deg)';
});
        finalize_buttons();
        audioBlackjack.play();
    }
    
    

}
function animation() {
    const cardImageElements = document.querySelectorAll('.card-image');
    cardImageElements.forEach((element) => {
        element.style.transform = 'rotateY(30deg)';
    });
}
function update_dealer(state) {
    dealer=game.get_cards_value(game.get_dealer_cards());
    document.getElementById("dealer-sum").innerHTML = ` ${dealer}`;
    
}

function update_player(state) {
    player=game.get_cards_value(game.get_player_cards());
    document.getElementById("player-sum").innerHTML = ` ${player}`;
}

function player_new_card() {
    dealer = game.get_cards_value(game.get_dealer_cards());
    if (dealer<17) {
        game.player_move();
        const lastPlayerCard = game.get_player_cards()[game.get_player_cards().length - 1];
        game.card_image(lastPlayerCard, "player-cards");
        update_player(game.player);
        game.get_game_state();
    }
    if (game.state.Busted) {
        document.getElementById("result").innerHTML = "You've Busted, You Lose!";
        animation();
        finalize_buttons();
        audioBust.play();
    }
    game.get_game_state();
    if (game.state.Blackjack) {
        document.getElementById("result").innerHTML = "BLACKJACK,You Win!";
        animation();
        finalize_buttons();
        audioBlackjack.play();
    }
    
}

function dealer_new_card() {
    dealer = game.get_cards_value(game.get_dealer_cards());
    player = game.get_cards_value(game.get_player_cards());
    if (dealer<17) {
        game.dealer_move();
        const lastDealerCard = game.get_dealer_cards()[game.get_dealer_cards().length - 1];
        game.card_image(lastDealerCard, "dealer-cards");
        update_dealer(game.dealer);
        game.get_game_state();
    }
    if (game.state.dealerBlackJack){
        document.getElementById("result").innerHTML = "Dealer Blackjack,You Lose!";
        animation();
        finalize_buttons();
        audioBlackjack_Dealer.play();
    }
    else if (game.state.Busted) {
        document.getElementById("result").innerHTML = "Dealer Bust,You Win!";
        animation();
        finalize_buttons();
        audioYou_Win.play();
    }
    else if (game.state.dealerWon) {
        document.getElementById("result").innerHTML = "Dealer Won,You Lose!";
        animation();
        finalize_buttons();
        audioYou_Lose.play();
    }
    else if (game.state.draw) {
        document.getElementById("result").innerHTML = "Draw";
        animation();
        finalize_buttons();
        audioDraw.play();
    }
    else if(game.state.playerWon){
        document.getElementById("result").innerHTML = "You Win!";
        animation();
        finalize_buttons();
        audioYou_Win.play();
    }
    
}


function dealer_finish() {
    const dealerCardsContainer = document.getElementById("dealer-cards");
    const cardImage = dealerCardsContainer.querySelector('img[src="img/png/card_back.png"]');
    
    if (cardImage) {
        dealerCardsContainer.removeChild(cardImage);
    }

    function continueDealerTurn() {
        
        if (dealer<17) {
            dealer_new_card();
            setTimeout(continueDealerTurn, 500); 
        } else {
            game.state.gameEnded===true;
            finalize_buttons();
        }
    }

    continueDealerTurn();
}



