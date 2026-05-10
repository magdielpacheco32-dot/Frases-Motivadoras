const API_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random");

const quoteContainer = document.getElementById('quote-container');
const refreshBtn = document.getElementById('refresh-btn');

async function fetchInspiration() {
    try {
        quoteContainer.innerHTML = '<div class="loader">Buscando inspiración...</div>';

        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error("Error en la conexión");

        const dataJSON = await response.json();
   
        const data = JSON.parse(dataJSON.contents);
        
        displayQuote(data[0]);

    } catch (error) {
        console.error("Hubo un problema con la petición:", error); 
        quoteContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

/**
 * Función para renderizar la información en el DOM
 * @param {Object} quoteData - Objeto con los datos de la frase (q, a, c)
 */

function displayQuote(quoteData) {

    quoteContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'quote-card';

    card.innerHTML = `
        <span class="quote-text">"${quoteData.q}"</span>
        <span class="quote-author">— ${quoteData.a}</span>
        <span class="quote-chars">Longitud: ${quoteData.c} caracteres</span>
    `;

    quoteContainer.appendChild(card);
}

refreshBtn.addEventListener('click', fetchInspiration);

window.onload = fetchInspiration;