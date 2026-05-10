/**
 * URL de la API con proxy para evitar problemas de CORS
 */
const API_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random");

const quoteContainer = document.getElementById('quote-container');
const refreshBtn = document.getElementById('refresh-btn');

/**
 * LÓGICA ASÍNCRONA: Obtiene una frase aleatoria de la API.
 * Se utiliza 'async' para manejar la promesa de forma lineal y legible.
 */
async function fetchInspiration() {
    // Intentos máximos para evitar el error 408
    const MAX_RETRIES = 2;
    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
        try {
            quoteContainer.innerHTML = '<div class="loader">Buscando inspiración en el océano de datos...</div>';

            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Fallo en servidor: ${response.status}`);
            }

            const dataJSON = await response.json();
            if (!dataJSON.contents) throw new Error("Datos corruptos");
            
            const data = JSON.parse(dataJSON.contents);
            displayQuote(data[0]);
            return; // Si tiene éxito, sale de la función

        } catch (error) {
            attempt++;
            console.error(`Intento ${attempt} fallido:`, error);
            
            if (attempt > MAX_RETRIES) {
                quoteContainer.innerHTML = `
                    <div style="padding: 20px; border-radius: 10px; background: #fff5f5;">
                        <p style="color:#c53030; font-weight:bold;">⚠️ La conexión tardó demasiado (Error 408/Timeout)</p>
                        <p style="font-size: 0.8rem;">Revisa tu señal de internet y presiona el botón de abajo para intentar de nuevo.</p>
                    </div>
                `;
            }
        }
    }
}

/**
 * RENDERIZADO: Crea los elementos en el DOM con el diseño profesional.
 * @param {Object} quoteData - Objeto con (q)uote, (a)uthor y (c)haracter count.
 */
function displayQuote(quoteData) {
    quoteContainer.innerHTML = '';
    if (!quoteData) return;

    const card = document.createElement('div');
    card.className = 'quote-card';

    // Inserción de plantilla literal para un código más limpio
    card.innerHTML = `
        <span class="quote-text">"${quoteData.q}"</span>
        <span class="quote-author">— ${quoteData.a}</span>
        <span class="quote-chars">Esta reflexión contiene ${quoteData.c} caracteres</span>
    `;

    quoteContainer.appendChild(card);
}

// Asignación de eventos
refreshBtn.addEventListener('click', fetchInspiration);
// Carga inicial al abrir la página
window.onload = fetchInspiration;