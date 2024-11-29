
let game;

const cardImages = {
    "2-C":"img/png/2_of_clubs.png",
    "2-D":"img/png/2_of_diamonds.png",
    "2-H":"img/png/2_of_hearts.png",
    "2-S":"img/png/2_of_spades.png",
    "3-C":"img/png/3_of_clubs.png",
    "3-D":"img/png/3_of_diamonds.png",
    "3-H":"img/png/3_of_hearts.png",
    "3-S":"img/png/3_of_spades.png",
    "4-C":"img/png/4_of_clubs.png",
    "4-D":"img/png/4_of_diamonds.png",
    "4-H":"img/png/4_of_hearts.png",
    "4-S":"img/png/4_of_spades.png",
    "5-C":"img/png/5_of_clubs.png",
    "5-D":"img/png/5_of_diamonds.png",
    "5-H":"img/png/5_of_hearts.png",
    "5-S":"img/png/5_of_spades.png",
    "6-C":"img/png/6_of_clubs.png",
    "6-D":"img/png/6_of_diamonds.png",
    "6-H":"img/png/6_of_hearts.png",
    "6-S":"img/png/6_of_spades.png",
    "7-C":"img/png/7_of_clubs.png",
    "7-D":"img/png/7_of_diamonds.png",
    "7-H":"img/png/7_of_hearts.png",
    "7-S":"img/png/7_of_spades.png",
    "8-C":"img/png/8_of_clubs.png",
    "8-D":"img/png/8_of_diamonds.png",
    "8-H":"img/png/8_of_hearts.png",
    "8-S":"img/png/8_of_spades.png",
    "9-C":"img/png/9_of_clubs.png",
    "9-D":"img/png/9_of_diamonds.png",
    "9-H":"img/png/9_of_hearts.png",
    "9-S":"img/png/9_of_spades.png",
    "10-C":"img/png/10_of_clubs.png",
    "10-D":"img/png/10_of_diamonds.png",
    "10-H":"img/png/10_of_hearts.png",
    "10-S":"img/png/10_of_spades.png",
    "A-C":"img/png/ace_of_clubs.png",
    "A-D":"img/png/ace_of_diamonds.png",
    "A-H":"img/png/ace_of_hearts.png",
    "A-S":"img/png/ace_of_spades.png",
    "J-C":"img/png/jack_of_clubs.png",
    "J-D":"img/png/jack_of_diamonds.png",
    "J-H":"img/png/jack_of_hearts.png",
    "J-S":"img/png/jack_of_spades.png",
    "K-C":"img/png/king_of_clubs.png",
    "K-D":"img/png/king_of_diamonds.png",
    "K-H":"img/png/king_of_hearts.png",
    "K-S":"img/png/king_of_spades.png",
    "Q-C":"img/png/queen_of_clubs.png",
    "Q-D":"img/png/queen_of_diamonds.png",
    "Q-H":"img/png/queen_of_hearts.png",
    "Q-S":"img/png/queen_of_spades.png",
    "X":"img/png/card_back.png"
    
}

function new_game()
{
    // Limpa o resultado anterior
    const resultsElement = document.getElementById("results");
    resultsElement.textContent = "";
    //Inicio de jogo
    game = new Blackjack();
    console.log("Game has been initialized");

    game.newDeck();
    game.shuffle();

    // Dá-se duas cartas ao jogador e dealer
    game.dealerCards.push(game.deck.pop());
    game.dealerCards.push("X");
    game.yourCards.push(game.deck.pop());
    game.yourCards.push(game.deck.pop());
    console.log("Arrays preenchidos");

    //Update na interface
    update_dealer();
    console.log("dealer hand updated!");
    console.log(game.dealerCards);
    update_player();
    console.log("Player hand updated!");
    console.log(game.yourCards);

    // Calcula e mostra a soma das cartas iniciais do jogador
    const playerInitialSum = game.getCardsValue(game.yourCards[0]) + game.getCardsValue(game.yourCards[1]);
    game.yourSum = playerInitialSum;
    document.getElementById("your-sum").textContent = playerInitialSum;

    // Mostra o valor da primeira carta do dealer
    const dealerInitialSum = game.getCardsValue(game.dealerCards[0]);
    game.dealerSum = dealerInitialSum;
    document.getElementById("dealer-sum").textContent = dealerInitialSum;

    window.document.getElementsByClassName("gameButt").disabled = false;
}

/**
 * Este método é responsável por atualizar a UI do dealer.
 */
function update_dealer()
{
    //Buscamos as cartas e a soma dos pontos
    const dealeSumElement = document.getElementById("dealer-sum");
    const dealerCardsElement = document.getElementById("dealer-cards");

    dealeSumElement.textContent = "";
    dealerCardsElement.innerHTML = "";

    //Demonstramos as cartas do dealer
    for( let i = 0; i < game.dealerCards.length; i++)
    {
        const card = game.dealerCards[i];
        const cardElement = document.createElement("img");
        cardElement.src = cardImages[card];
        dealerCardsElement.appendChild(cardElement);
    }

    //Se a segunda carta for "X" demosntra a carta com "X"
    if(game.dealerCards[1] === "X")
    {
        const hiddenCardElement = document.createElement("img");
        hiddenCardElement.src = cardImages["X"];
        dealerCardsElement.replaceChild(hiddenCardElement,dealerCardsElement.childNodes[1]);
    }

    //Mostramos os pontos do dealer
    if(game.dealerSum !== "")
    {
        dealeSumElement.textContent = game.dealerSum;
    }
    else
    {
        console.log("Valor de pontos(D) nulo");
    }
}

/**
 * Este método é responsável por atualizar a UI do player.
 */
function update_player()
{
    //Buscamos as cartas e a soma dos pontos
    const yourSumElement = document.getElementById("your-sum");
    const yourCardsElement = document.getElementById("your-cards");

    yourSumElement.textContent = "";
    yourCardsElement.innerHTML = "";

    //Demonstramos as cartas do player
    for(let j = 0; j < game.yourCards.length; j++)
    {
        const card = game.yourCards[j];
        const cardElement = document.createElement("img");
        cardElement.src = cardImages[card];
        yourCardsElement.appendChild(cardElement);
    }

    if(game.yourSum !== "")
    {
        yourSumElement.textContent = game.yourSum;
    }
    else
    {
        console.log("Valor de pontos(P) nulo");
    }
}

function dealer_new_card()
{
    const gameState = game.dealer_Move();
    update_dealer();
}

function player_new_card()
{
    const gameState = game.player_Move();
    update_player();
}

/**
 * Este método é responsável por realizar a ultima jogada do dealer e assim finalizar o jogo.
 */
function dealer_finish()
{
    //Revela a carta virada
    if(game.dealerCards[1] === "X")
    {
        game.dealerCards[1] = game.deck.pop();
        const cardValue = game.getCardsValue(game.dealerCards[1])
        game.dealerSum += cardValue
    }
    //O delaer continua a jogar cartas até que a pontuação seja 17
    while(game.dealerSum < 17)
    {
        game.dealer_Move();
    }

    //Verificamos o resultado do jogo
    const gameState = game.get_game_state();

    // Atualizamos o elemento HTML com o resultado
    const resultsElement = document.getElementById("results");
    resultsElement.textContent = gameState;

    update_dealer();

    return gameState;
}