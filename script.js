const contenedor = document.querySelector(".container");
const botonRefrescar = document.querySelector(".refresh-btn");
const inputNumColors = document.querySelector("#num-colors");
const colorInput = document.querySelector("#base-color");
const checkboxRandomColors = document.querySelector("#random-colors");


// Función para generar un código de color hex aleatorio
const getRandomHex = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
};

// Función para generar una paleta de colores aleatorios
const generarPaleta = () => {
    // Limpiar el contenedor
    contenedor.innerHTML = "";
  
    // Obtener el número de colores ingresado por el usuario
    const numColors = parseInt(inputNumColors.value);
  
    // Obtener el color base ingresado por el usuario
    const baseColor = colorInput.value;
  
    // Verificar si el checkbox de colores aleatorios está marcado
    const checkboxRandomColors = document.querySelector("#random-colors");
    const useRandomColors = checkboxRandomColors.checked;
  
    // Generar una paleta de colores aleatorios o basados en el color base
    for (let i = 0; i < numColors; i++) {
      let randomHex = "";
  
      if (useRandomColors) {
        // Generar un código de color hex aleatorio
        randomHex = getRandomHex();
      } else if (baseColor) {
        // Generar un código de color hex aleatorio basado en el color base
        const baseRgb = baseColor.substring(1).match(/.{2}/g).map((val) => parseInt(val, 16));
        const randomRgb = baseRgb.map((val) => val + Math.floor((255 - val) * Math.random()));
        randomHex = `#${randomRgb.map((val) => val.toString(16).padStart(2, "0")).join("")}`;
      }
  
      // Crear un nuevo elemento 'li' y agregarlo al contenedor
      const color = document.createElement("li");
      color.classList.add("color");
      color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                         <span class="hex-value">${randomHex}</span>`;
  
      // Agregar un evento de clic al elemento 'li' actual para copiar el color
      color.addEventListener("click", () => copiarColor(color, randomHex));
  
      contenedor.appendChild(color);
    }
  };

checkboxRandomColors.addEventListener("change", generarPaleta);
generarPaleta();

// Función para copiar el código de color al portapapeles
const copiarColor = (elem, hexVal) => {
  const colorElement = elem.querySelector(".hex-value");
  // Copiar el valor de hex, actualizar el texto a 'Copiado',
  // y volver a cambiar el texto al valor de hex original después de 1 segundo
  navigator.clipboard.writeText(hexVal).then(() => {
    colorElement.innerText = "Copiado";
    setTimeout(() => (colorElement.innerText = hexVal), 1000);
  }).catch(() => alert("¡Error al copiar el código de color!")); // Mostrar alerta si el color no se puede copiar
};

// Agregar un evento de clic al botón de refresco para generar una nueva paleta de colores
botonRefrescar.addEventListener("click", generarPaleta);