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
    try {
        // Feedback visual: Estado de carga inicial
        quoteContainer.innerHTML = '<div class="loader">Buscando inspiración en el océano de datos...</div>';

        // 'await' detiene la ejecución hasta que la petición fetch se resuelva
        const response = await fetch(API_URL);
        
        // Manejo robusto: Si la respuesta no es 200 OK, lanzamos error al bloque catch
        if (!response.ok) {
            throw new Error(`Fallo en servidor: ${response.status}`);
        }

        const dataJSON = await response.json();
   
        // Deserialización: Convertimos la cadena JSON del proxy en un objeto usable
        if (!dataJSON.contents) throw new Error("Datos corruptos");
        const data = JSON.parse(dataJSON.contents);

        // Llamada a la función de renderizado con el primer elemento del array
        displayQuote(data[0]);

    } catch (error) {
        // Bloque Catch: Captura errores de red, de parseo o de servidor
        console.error("Error detectado:", error); 
        quoteContainer.innerHTML = `
            <div style="padding: 20px; border-radius: 10px; background: #fff5f5;">
                <p style="color:#c53030; font-weight:bold;">⚠️ Error de conexión</p>
                <small style="color:#666;">${error.message}. Intenta de nuevo.</small>
            </div>
        `;
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