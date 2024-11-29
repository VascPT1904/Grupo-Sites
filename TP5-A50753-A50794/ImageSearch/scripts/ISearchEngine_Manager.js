'use strict';

//Declaring a global variable which will be created in main function 
let app = null;

/**
 * The main function that initializes the application.
 */
async function main() {
    const canvas = document.querySelector("canvas");
    const showImagesButton = document.getElementById('btn_keyword');
    const red_button = document.getElementById('btn_red');
    const pink_button = document.getElementById('btn_pink');
    const orange_button = document.getElementById('btn_orange');
    const yellow_button = document.getElementById('btn_yellow');
    const green_button = document.getElementById('btn_green');
    const blue_button = document.getElementById('btn_blue');
    const purple_button = document.getElementById('btn_purple');
    const brown_button = document.getElementById('btn_brown');
    const grey_button = document.getElementById('btn_grey');
    const black_button = document.getElementById('btn_black');
    


    //Creating the instance of the application
    const app = new ISearchEngine("database.json");
    var limit=app.numShownPic;
    
    
    const database = new DatabaseJSON();

    showImagesButton.addEventListener('click', function() {
        const list= document.querySelector("#Keywords").value;
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
        //const colors= database.getUniqueColors(jsonData);
        //console.log('Diferent Colors:', colors);
        const searchResults = database.search(list, jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);

    }).catch((error) => {
        console.error('Error:', error);});});
    
    red_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("red", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    
    pink_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("pink", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    
    orange_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("orange", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    yellow_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("yellow", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});~
    green_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("green", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    
    blue_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("blue", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    
    purple_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("purple", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    brown_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("brown", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    grey_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("grey", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
    black_button.addEventListener('click', function() {
        const filename = 'database.json';
        database.loadFile(filename)
        .then((jsonData) => {
            
        const searchResults = database.searchByColors("black", jsonData,limit);
        app.gridView(canvas, searchResults, 7); 
        console.log('Search Results:', searchResults);
    
        }).catch((error) => {
            console.error('Error:', error);});});
       

}  
/**
 * Function that generates an artificial image and draw it in canvas.
 * Useful to test the image processing algorithms.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element to draw the image on.
 * @returns {ImageData} - The generated image data.
 */
function Generate_Image(canvas) {
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(100, 100);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 204;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
        if ((i >= 8000 && i < 8400) || (i >= 16000 && i < 16400) || (i >= 24000 && i < 24400) || (i >= 32000 && i < 32400))
            imgData.data[i + 1] = 200;
    }
    ctx.putImageData(imgData, 150, 0);
    return imgData;
}