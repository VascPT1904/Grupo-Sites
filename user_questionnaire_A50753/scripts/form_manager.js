// form_manager.js

function RecordData() 
{
    // Recupera os dados do formulário
    var formData = 
    {
        age: document.querySelector('input[name="age"]:checked').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        internetUsage: document.querySelector('input[name="internet"]:checked').value,
        browserPreferences: {
            firstOption: document.getElementById("1stOption").value,
            secondOption: document.getElementById("2ndOption").value,
            thirdOption: document.getElementById("3rdOption").value
        },
        otherBrowsers: {
            known: document.querySelector('input[name="Other"]:checked').value === "Yes",
            details: document.getElementById("other-browsers").value
        },
        tasks: {
            task1: document.getElementById("tarefa-1").querySelector('textarea').value,
            task2: document.getElementById("tarefa-2").querySelector('textarea').value,
            task3: document.getElementById("tarefa-3").querySelector('textarea').value,
            task4: document.getElementById("tarefa-4").querySelector('textarea').value,
            task5: document.getElementById("tarefa-5").querySelector('textarea').value
        },
        ratings: {
            question1_1: document.getElementById("question1_1").value,
            question1_2: document.getElementById("question1_2").value,
            question1_3: document.getElementById("question1_3").value,
            question1_4: document.getElementById("question1_4").value,
            point2: document.querySelector('input[name="point2"]:checked').value,
            point3: document.querySelector('input[name="point3"]:checked').value,
            point4: document.querySelector('input[name="point4"]:checked').value,
            point5: document.querySelector('input[name="point5"]:checked').value,
            point6: document.querySelector('input[name="point6"]:checked').value,
            point7: document.querySelector('input[name="point7"]:checked').value
        }
    };

    // Obtém a lista existente ou inicializa uma nova lista no localStorage
    var userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Adiciona os dados do usuário atual à lista
    userList.push(formData);

    // Atualiza a lista no localStorage
    localStorage.setItem('userList', JSON.stringify(userList));

    // Exibe uma mensagem ou executa outras ações conforme necessário
    alert('Dados salvos com sucesso para o usuário atual!');
}


function validateForm()
{
    var ageSelected = document.querySelector('input[name="age"]:checked');
    var genderSelected = document.querySelector('input[name="gender"]:checked');
    var internetSelected = document.querySelector('input[name="internet"]:checked');

    if(!ageSelected || !genderSelected || !internetSelected)
    {
        alert("Por favor, responda a todas as qustões obrigatórias!")
        return false;
    }

    var firstOption = document.getElementById('1stOption').value;
    var secondOption = document.getElementById('2ndOption').value;
    var thirdOption = document.getElementById('3rdtOption').value;

    if (firstOption === 'Choose...' || secondOption === 'Choose...' || thirdOption === 'Choose...') 
    {
        alert("Por favor, selecione as suas preferências de Web Browsers.");
        return false;
    }

    var searchCategorySelected = document.querySelector('input[name="point2"]:checked');
    var searchColorSelected = document.querySelector('input[name="point3"]:checked');
    var searchSimilarImages = document.querySelector('input[name="point4"]:checked');
    var utilityImages = document.querySelector('input[name="point5"]:checked');
    var navegationSystem = document.querySelector('input[name="point6"]:checked');
    var siteDesign = document.querySelector('input[name="point7"]:checked');

    if(!searchCategorySelected || !searchColorSelected || !searchSimilarImages || !utilityImages || !navegationSystem || !siteDesign)
    {
        alert("Por favor, selecione as suas preferências de Web Browsers.");
        return false;
    }

    return true;
}