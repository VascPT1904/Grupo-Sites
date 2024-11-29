function validateForm() {
    var selects = document.querySelectorAll('select');
    var simRadioButton = document.querySelector('input[name="other"][value="Sim"]');
    var textInput = document.querySelector('input[type="text"]');
    var radios= document.querySelectorAll('input[type="radio"]:checked');

    for (var i = 0; i < 3; i++) { // Faz a verificação do primeiro conjunto de selects para responder com um browser
        if (
            selects[i].value === "1º Lugar" ||
            selects[i].value === "2º Lugar" ||
            selects[i].value === "3º Lugar"
        ) {
            alert('Escolha um lugar.');
            return false;
        }
    }
    if (selects[0].value === selects[1].value || selects[0].value === selects[2].value || selects[1].value === selects[2].value) {
        alert('As opções de browser não podem ser iguais.'); // Faz a verificação do primeiro conjunto de selects para os browsers não serem iguais
        return false;
    }
    for (var i = 3; i < selects.length; i++) { // Faz a verificação do primeiro conjunto de selects para responder com um número
        if (
            selects[i].value === "Sendo \"0\" Horrível e \"7\" Fantástica" ||
            selects[i].value === "Sendo \"0\" Aborrecida e \"7\" Estimulante" ||
            selects[i].value === "Sendo \"0\" Frustrante e \"7\" Gratificante" ||
            selects[i].value === "Sendo \"0\" Dificíl e \"7\" Fácil"
        ) {
            alert('Escolha um número de 0-7.');
            return false;
        }
    }    

    if (simRadioButton && simRadioButton.checked && textInput && textInput.value.trim() === '') { //Se responder que sim, têm de dizer outro browser
        alert('Se premir sim, insira o nome de outro browser.');
        return false;
    }
    if (radios.length!=10){ //Vê se estão todos os radios premidos
        alert('Precione todos os radios');
        return false;
    }


    return true;
}

function navigatetoindex() {  //Navega para o menu inicial se todas as perguntas respondidas
    if (validateForm()) {
        console.log("next page");
        window.location.href = "index.html";
    } else {
        console.log("not next page");
    }
}

function getSelectedRadioValue(name) { //Função que retorna o valor do radio selecionado
    const radios = document.getElementsByName(name);

    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function storeAnswers() {
    if (validateForm()) { //Se todas as perguntas respondidas, guarda a informação no local storage
        const personId= Date.now()
        const ageAnswer = getSelectedRadioValue("age");
        const genderAnswer = getSelectedRadioValue("gender");
        const freqAnswer = getSelectedRadioValue("freq");
        const browser1 = document.querySelector("#firstBrowser").value;
        const browser2 = document.querySelector("#secondBrowser").value;
        const browser3 = document.querySelector("#thirdBrowser").value;
        const otherAnswer = getSelectedRadioValue("other");
        const otherSites = document.querySelector("#otherSites").value;
        const text1 = document.querySelector("#text1").value;
        const text2 = document.querySelector("#text2").value;
        const text3 = document.querySelector("#text3").value;
        const text4 = document.querySelector("#text4").value;
        const text5 = document.querySelector("#text5").value;
        const text6 = document.querySelector("#text6").value;
        const option1 = document.querySelector("#option1").value;
        const option2 = document.querySelector("#option2").value;
        const option3 = document.querySelector("#option3").value;
        const option4 = document.querySelector("#option4").value;
        const resultAnswer = getSelectedRadioValue("result");
        const colorAnswer = getSelectedRadioValue("color");
        const imageAnswer = getSelectedRadioValue("image");
        const utilAnswer = getSelectedRadioValue("util");
        const systemAnswer = getSelectedRadioValue("system");
        const designAnswer = getSelectedRadioValue("design");

        const answers = {
            personId: personId, 
            age: ageAnswer,
            gender: genderAnswer,
            freq: freqAnswer,
            browsers: [browser1, browser2, browser3],
            other: otherAnswer,
            otherSites: otherSites,
            question1: text1,
            question2: text2,
            question3: text3,
            question4: text4,
            question5: text5,
            question6: text6,
            options: [option1, option2, option3, option4],
            result: resultAnswer,
            color: colorAnswer,
            image: imageAnswer,
            util: utilAnswer,
            system: systemAnswer,
            design: designAnswer
        };

        console.log(answers);


        localStorage.setItem(`questionnaireAnswers_${personId}`, JSON.stringify(answers));
    } 
}

function displayResults() {
    try {
        const tableContainer = document.getElementById("table-container");
        
        const table = document.createElement("table");
        
        const headerRow = document.createElement("tr");
        const headers = ["Person ID", "Age", "Gender", "Frequency", "Browsers", "Other", "Other Sites", "Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Options", "Result", "Color", "Image", "Util", "System", "Design"];

        headers.forEach(headerText => {
            const th = document.createElement("th"); //Elemento Cabeçalho
            th.textContent = headerText; 
            headerRow.appendChild(th); //Adiciona elementos do cabeçalho ao cabeçalho
        });

        table.appendChild(headerRow);
        colors=[];
        utils=[];
        designs=[];
        genders=[];
        for (const key in localStorage) { //por cada pessoa 
            if (key.startsWith("questionnaireAnswers_")) {
                const personId = key.replace("questionnaireAnswers_", ""); //Mostra só o id da key
                const storedAnswers = JSON.parse(localStorage.getItem(key));

                const row = document.createElement("tr");
                const values = [personId, storedAnswers.age, storedAnswers.gender, storedAnswers.freq, storedAnswers.browsers.join(", "), storedAnswers.other, storedAnswers.otherSites, storedAnswers.question1, storedAnswers.question2, storedAnswers.question3, storedAnswers.question4, storedAnswers.question5, storedAnswers.question6, storedAnswers.options.join(", "), storedAnswers.result, storedAnswers.color, storedAnswers.image, storedAnswers.util, storedAnswers.system, storedAnswers.design];
                colors.push(storedAnswers.color);
                utils.push(storedAnswers.util);
                designs.push(storedAnswers.design);
                genders.push(storedAnswers.gender);
                values.forEach(value => {
                    const td = document.createElement("td"); //Elemento Linha
                    td.textContent = value;
                    row.appendChild(td); //adiciona elementos da linha á linha
                });

                table.appendChild(row);
                
            }
        }
        createBarChart(colors,"chart-1");
        createBarChart(utils,"chart-2");
        createBarChart(designs,"chart-3");
        tableContainer.appendChild(table);
         
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}
// Função que cria um gráfico de barras a partir dos dados fornecidos e o insere no contêiner especificado.
function createBarChart(data, containerClass) {
    // Obtém o contêiner com a classe fornecida.
    const container = document.querySelector(`.${containerClass}`);
    
    // Verifica se o contêiner foi encontrado.
    if (!container) {
      console.error(`Contêiner com a classe '${containerClass}' não encontrado.`);
      return;
    }
  
    // Cria um elemento canvas para o gráfico.
    const canvas = document.createElement('canvas');
    canvas.id = 'barChart';
    // Adiciona o canvas ao contêiner.
    container.appendChild(canvas);
  
    // Obtém o contexto 2D do canvas.
    const ctx = canvas.getContext('2d');
  
    // Obtém valores únicos ordenados do conjunto de dados.
    const uniqueValues = [...new Set(data)].sort((a, b) => a - b);
  
    // Organiza os dados do gráfico.
    const chartData = {
      labels: uniqueValues.map(String),
      datasets: [{
        label: 'Dados',
        data: uniqueValues.map(value => data.filter(v => v === value).length),
        backgroundColor: 'blue',
      }],
    };
  
    // Configurações adicionais do gráfico.
    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Valores',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Pessoas',
          },
        },
      },
    };
  
    // Cria uma nova instância do objeto Chart.
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options,
    });
  }

  

  
  
  
  
  
 












