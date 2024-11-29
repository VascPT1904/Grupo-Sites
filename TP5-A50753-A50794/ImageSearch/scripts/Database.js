'use strict';

/**
 * Represents a JSON database.
 */
class DatabaseJSON {
    /**
     * Represents a Database object.
     * @constructor
     */
    constructor() { }

    /**
     * Loads a JSON file asynchronously and returns its contents as a JavaScript object.
     * @param {string} filename - The path to the JSON file to be loaded.
     * @returns {Promise<object>} - A Promise that resolves with the loaded JSON data (or an empty object in case of an error).
     */
    async loadFile(filename) {
        // Initialize an empty object to store JSON data
        let jsonData = {};
        try {
            // Use the fetch API to retrieve the JSON file asynchronously
            const response = await fetch(filename);

            // Extract the text content from the response
            const jsonString = await response.text();

            // Parse the JSON string into a JavaScript object
            jsonData = JSON.parse(jsonString);
        } catch (error) {
            // Handle errors, log the error to the console
            console.error('Error loading JSON file:', error);
        }

        // Return the loaded JSON data (or an empty object in case of an error)
        return jsonData;
    }

    // Method to search for images in the JSON data based on a given query
    /**
     * Searches for images that match the given query in the provided JSON data and returns an array of paths for the matched images, limited by maxResults.
     * @param {string} query - The query to search for.
     * @param {Object} jsonData - The JSON data to search in.
     * @param {number} maxResults - The maximum number of results to return.
     * @returns {string[]} An array of paths for the matched images, limited by maxResults.
     */
    
    
    search(query, jsonData, maxResults) {
        const imagesMatched = jsonData.images.filter(im => im.class === query); //Obtêm a informação das imagens com o nome da classe igual á querry
    
        
        shuffleArray(imagesMatched); //Baralha a array de forma aleatoria
    
        if (maxResults > imagesMatched.length) { //Se o numero de resultados máximos for maior que o comprimento da array,o numero maximo de resultados é igual ao tamanho da array
            maxResults = imagesMatched.length; 
        }
    
         
        return imagesMatched.slice(0, maxResults).map(im => im.path); //retorna o path das imagens dentro do limite de maxResults
    }
    
    getUniqueColors(jsonData) { //Precorre as imagens e adiciona a uma array as coresdominantes que ainda não estão na array.
        const uniqueColors = [];
          for (const image of jsonData.images) {
            if (!uniqueColors.includes(image.dominantcolor)) {
                uniqueColors.push(image.dominantcolor);
              }
          }
      
          return uniqueColors;
        
      }

    searchByColors(targetColors,jsonData,maxResults) {
        let color_categories = { //Obtidas usando a função get unique colors e metida em varias categorias por mim fora do código
            "red": ["#E04040", "#E06040", "#E02000", "#A04040", "#A00000", "#C00000"],
            "pink": ["#A00080", "#C04040", "#E02080","#E00040"],                                                                         
            "orange": ["#A06000", "#C08040", "#C04000", "#C0A080", "#A04000", "#E0A080", "#E0A000","#A08000", "#C06000"],
            "yellow": ["#E0E0C0", "#E0E000","#E0E080", "#C0C000", "#E0E040", "#A0A080", "#808040", "#E0E0C0", "#C0C080", "#E0C080", "#A08080", 
            "#E0E080","#C0A000"],
            "green": ["#008000","#206040", "#004040", "#004000", "#406000", "#404000", "#C0E0C0", "#A0C080", "#A0C040", "#406040", "#606040",
            "#408040", "#80A080", "#204040", "#20C080", "#00C040", "#80A040", "#80E0C0", "#608080", "#004000", "#60A080",  "#4080C0", "#206040",
            "#C02040", "#20C000", "#40C080", "#C0E000", "#80A0C0", "#A0C0C0", "#E0A040", "#20E0C0", "#206080", "#00C0C0", "#80C0C0", "#60E040",
            "#A0C000", "#A0A000", "#40C000", "#C08000", "#608040", "#A0A040", "#00A040", "#A04040", "#406080", "#E0A080", "#208000", "#006000",
            "#80A000","#40A080", "#60C040", "#40A040", "#408000", "#006040", "#20E080"],
            "blue": ["#6080C0", "#408080", "#60A0C0", "#4040C0", "#000040", "#204080", "#002040", "#002080", "#200080", "#006080", "#4080C0", 
            "#206080", "#406080", "#004080", "#208080", "#008080", "#000080"],
            "purple": ["#400040", "#600040", "#402080", "#402040", "#606080","#A06080", "#A020C0","#A04080", "#200040", "#404080","#602040"], 
            "brown": ["#604040", "#804040", "#806040", "#602000", "#806000", "#804000", "#802000", "#600000", "#402000", "#604000", "#402000",
            "#400000"],
            "grey": ["#404040", "#C0C0C0","#808080"],  
            "black": ["#000000", "#002000", "#0000C0"],
        }
        
        const matchedPaths = [];
 
        for (const colorCategory of Object.keys(color_categories)) { //faz um loop para ver se a targetcolors é uma key do color_categories
            if (targetColors.includes(colorCategory)) { 
                const imagesMatched = jsonData.images.filter(im => color_categories[colorCategory].includes(im.dominantcolor)); //se for uma key vê quais imagens 
                //do JSON têm essas cores dominantes

                matchedPaths.push(...imagesMatched.map(im => im.path)); //adiciona os paths dessas imagens
            }
        }
    
        
        shuffleArray(matchedPaths);
    
        
        if (maxResults > matchedPaths.length) { 
            maxResults = matchedPaths.length;
        }

        
        return matchedPaths.slice(0, maxResults);
    }
    
    
}
    

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); //Arranja um indice aleatório e troca os valores desse com os do loop com i
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * A class representing a local storage database that stores JSON objects.
 */
class LocalStorageDatabaseJSON {
    constructor() { }

    /**
     * Saves a JavaScript object to localStorage with the specified keyname.
     * @param {string} keyname - The keyname under which the object will be saved.
     * @param {object} jsonObject - The JavaScript object to be saved.
     */
    save(keyname, jsonObject) {
        try {
            // Convert the JavaScript object to a JSON string and store it in localStorage
            localStorage.setItem(keyname, JSON.stringify(jsonObject));
        } catch (e) {
            // Handle errors that may occur during the save process
            alert('Save failed!');
            if (e == 'QUOTA_EXCEEDED_ERR') {
                // Display a specific alert if the storage quota is exceeded
                alert('Quota exceeded!');
            }
        }
    }

    /**
     * Retrieves data from localStorage based on the provided keyname.
     * @param {string} keyname - The keyname used to store the data in localStorage.
     * @returns {object} - The parsed JavaScript object retrieved from localStorage.
     * @throws {Error} - If the data is not found in localStorage.
     */
    read(keyname) {
        // Retrieve the JSON string from localStorage based on the provided key
        let localStorageJson = localStorage.getItem(keyname);
        let jsonData = null;

        // Check if the data is not found in localStorage
        if (localStorageJson === null) {
            // Handle the case where the data is not in localStorage by throwing an error
            throw new Error('Data not found in localStorage');
        }

        // Parse the JSON string into a JavaScript object
        jsonData = JSON.parse(localStorageJson);

        // Return the parsed JavaScript object
        return jsonData;
    }
}
