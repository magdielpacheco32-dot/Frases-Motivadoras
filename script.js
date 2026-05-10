const API_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random");

const quoteContainer = document.getElementById('quote-container');
const refreshBtn = document.getElementById('refresh-btn');

async function fetchInspiration() {
    try {

        quoteContainer.innerHTML = '<div class="loader">Buscando inspiración...</div>';

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status} ${response.statusText}`);
        }

        const dataJSON = await response.json();
   
        if (!dataJSON.contents) {
            throw new Error("No se recibieron datos válidos de la API.");
        }

        const data = JSON.parse(dataJSON.contents);

        displayQuote(data[0]);

    } catch (error) {

        console.error("Hubo un problema con la petición:", error); 
        quoteContainer.innerHTML = `
            <div class="error-box">
                <p style="color:red;">⚠️ Lo sentimos, algo salió mal.</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}

function displayQuote(quoteData) {
    quoteContainer.innerHTML = '';

    if (!quoteData) return;

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