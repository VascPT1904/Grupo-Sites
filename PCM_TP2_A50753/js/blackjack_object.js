// blackjack_object.js (Model)
class Blackjack 
{
    constructor() 
    {
        this.dealerSum = 0;
        this.yourSum = 0;
        this.dealerAceCount = 0;
        this.yourAceCount = 0;
        this.hidden;
        this.deck = [];
        this.canHit = true;
        this.dealerCards = [];
        this.yourCards = [];
    }


    newDeck() 
    {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; // numeros das cartas
        let types = ["C", "H", "D", "S"];// tipos de carta
        this.deck = [];

        for (let i = 0; i < types.length; i++) 
        {
            for (let j = 0; j < values.length; j++) 
            {
                this.deck.push(values[j] + "-" + types[i]);
            }
        }
        console.log(this.deck);
    }

    shuffle() 
    {
        for (let i = 0; i < this.deck.length; i++) 
        {
            let j = Math.floor(Math.random() * this.deck.length);//(0-1)*52 = (0-51.9999) Math.floor para int
            //swap
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
        console.log(this.deck);
    }

    /**
     * 
     * @param {*} card 
     * Este método conta o valor de um array de cartas (dealer_cards ou
    player_cards) de acordo com as regras do blackjack. As cartas do 2 ao 10
    pontuam com o valor marcado na carta (2 a 10 pontos). O Rei, a Dama e o
    Valete valem 10 pontos e o Às pode ter o valor de 1 ou 11 (o jogador escolhe
    como lhe dá mais jeito). Retorna os pontos resultantes.
     */
    getCardsValue(card) 
    {
        let data = card.split("-");//"4-C" -> ["4","C"]
        let value = data[0];

        if (isNaN(value)) 
        {
            if (value == "A") //A J Q K
            {
                return 11;
            }
            return 10;
        } 
        else 
        {
            return parseInt(value);
        }
    }

    /**
     * 
     * @param {*} card 
     * Verifica a existencia de uma carta As.
     */
    checkAce(card) 
    {
        if (card[0] == "A") 
        {
            return 1;
        }
        return 0;
    }

     /**
     * 
     * Este método verifica se a pontuação das cartas do dealer e do player permitem
    terminar o jogo (rebentar ou 21) e se alguém ganhou. Atualiza a variável “state”
    (membro da classe BlackJack) com o estado atual e retorna essa variável. 
     */
    get_game_state() {
        if (this.yourSum > 21) {
            return "Bust";
        }
    
        if (this.dealerSum > 21) {
            return "You win";
        }
    
        if (this.dealerSum === 21 && this.yourSum === 21) {
            return "Blackjack! You win";
        }
    
        if (this.dealerSum === this.yourSum) {
            return "Tie";
        }
    
        if (this.dealerSum >= 17) {
            if (this.dealerSum > this.yourSum) {
                return "Dealer wins";
            }
            return "You win";
        }
    
        return "Playing";
    }
    
    

    /**
     * 
     * Este método vai buscar a próxima carta ao baralho e coloca-a no array de cartas
    do player. Retorna a variável “state” atualizada executando o método
    get_game_state()que atualiza o estado do jogo após a jogada do player
     */
    player_Move() 
    {
        if (this.canHit) 
        {
            const card = this.deck.pop();
            this.yourCards.push(card);
            const cardValue = this.getCardsValue(card);
    
            // Adicione o valor da nova carta à soma existente
            this.yourSum += cardValue;
            this.yourAceCount += this.checkAce(card);
            //debugger;
            console.log("Valor de yourSum:", this.yourSum);

    
            if (this.yourSum > 21 && this.yourAceCount > 0) 
            {
                // Se o jogador tiver mais de 21 pontos e pelo menos 1 Ás na mão, mude o valor do Ás para 1.
                this.yourSum -= 10;
                this.yourAceCount--;
            }
        }
        return this.get_game_state();
    }
    

    /**
     * Este método é igual ao anterior mas agora para o dealer (a nova carta deve ser
    colocada no array de cartas do dealer. 
     */
    dealer_Move() 
    {
        while (this.dealerSum < 17) 
        {
            const card = this.deck.pop();
            this.dealerCards.push(card);
            const cardValue = this.getCardsValue(card);
    
            // Adicione o valor da nova carta à soma existente
            this.dealerSum += cardValue;
            this.dealerAceCount += this.checkAce(card);
            //debugger;
            console.log("Valor de dealerSum:", this.dealerSum);
    
            if (this.dealerSum > 21 && this.dealerAceCount > 0) 
            {
                // Se o dealer tiver mais de 21 pontos e pelo menos 1 Ás na mão, mude o valor do Ás para 1.
                this.dealerSum -= 10;
                this.dealerAceCount--;
            }
        }
        return this.get_game_state();
    }
    
}

