
alert("Hello from your Chrome extension!");

var div = document.createElement("div"); 
var imgPath = chrome.extension.getURL('img/clippy.png');
div.innerHTML = `
    <img id="clippy" src="`+ imgPath+ `"/>
`;
document.body.appendChild(div); 

const url = chrome.runtime.getURL('quotes.json');

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        console.log(json)
        
    });

console.log(json);