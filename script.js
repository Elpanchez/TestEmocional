const preguntas = [
  "Me siento con suficiente energía para afrontar el día.",
  "Disfruto de las actividades que solían interesarme.",
  "Me siento motivado(a) para alcanzar mis metas.",
  "Mantengo una actitud positiva frente a los desafíos.",
  "Duermo bien y me despierto descansado(a).",
  "Me siento emocionalmente estable durante el día.",
  "Me relaciono de forma saludable con las personas a mi alrededor.",
  "Siento satisfacción con mis logros recientes.",
  "Me siento tranquilo(a) la mayor parte del tiempo.",
  "Tengo la capacidad de concentrarme en mis actividades.",
  "Me siento acompañado(a) y apoyado(a) por personas cercanas.",
  "Afronto el estrés de manera efectiva.",
  "Me siento en control de mis pensamientos y emociones.",
  "Tengo confianza en mí mismo(a).",
  "Mi apetito se mantiene estable.",
  "Realizo actividades que me generan bienestar.",
  "Me resulta fácil iniciar mis responsabilidades diarias.",
  "Me siento valorado(a) por los demás.",
  "Disfruto momentos de calma y relajación durante el día.",
  "Me resulta fácil mantener la atención en tareas importantes.",
  "Me siento en paz conmigo mismo(a).",
  "Suelo expresar mis emociones de forma saludable.",
  "Me adapto bien a los cambios inesperados.",
  "Mantengo hábitos saludables en mi día a día.",
  "Me siento útil y necesario(a) en mi entorno.",
  "Tengo pensamientos positivos sobre el futuro.",
  "Me siento cómodo(a) con mi cuerpo y mi salud.",
  "Encuentro sentido o propósito en mi rutina diaria.",
  "Me siento satisfecho(a) con mis relaciones personales.",
  "Puedo identificar cuándo necesito ayuda emocional."
];

let paginaActual = 0; // Página de 5 preguntas actuales

function iniciarDesdeLanding() {
  const nombre = document.getElementById("nombreLanding").value.trim();
  if (!nombre) {
    alert("Por favor, escribe tu nombre antes de comenzar.");
    return;
  }
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("formTest").style.display = "block";
  document.getElementById("nombreUsuario").value = nombre;
  generarPreguntas();
}



function generarPreguntas() {
  const preguntasContainer = document.getElementById("preguntasContainer");
  preguntasContainer.innerHTML = "";

  const preguntasPorPagina = 5;
  const totalPreguntas = preguntas.length;

  // Calculamos el rango de preguntas a mostrar
  const inicio = paginaActual * preguntasPorPagina;
  const fin = Math.min(inicio + preguntasPorPagina, totalPreguntas);

  // Mostrar preguntas de la página actual
  for (let i = inicio; i < fin; i++) {
    const pregunta = preguntas[i];

    // Crear un div o elemento para la pregunta
    const divPregunta = document.createElement("div");
    divPregunta.classList.add("pregunta");
    divPregunta.innerHTML = `
      <p><strong>Pregunta ${i + 1}:</strong> ${pregunta.texto}</p>
      <!-- Aquí puedes agregar inputs, opciones, etc. -->
    `;

    preguntasContainer.appendChild(divPregunta);
  }

  // Crear botones para navegar
  const botonesContainer = document.createElement("div");
  botonesContainer.classList.add("botones");

  if (paginaActual > 0) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.onclick = () => {
      paginaActual--;
      generarPreguntas();
    };
    botonesContainer.appendChild(btnAnterior);
  }

  if (fin < totalPreguntas) {
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.onclick = () => {
      paginaActual++;
      generarPreguntas();
    };
    botonesContainer.appendChild(btnSiguiente);
  } else {
    // Última página: botón para enviar respuestas
    const btnEnviar = document.createElement("button");
    btnEnviar.textContent = "Enviar respuestas";
    btnEnviar.onclick = () => {
      // Aquí va la función para enviar o procesar las respuestas
      alert("Respuestas enviadas");
    };
    botonesContainer.appendChild(btnEnviar);
  }

  preguntasContainer.appendChild(botonesContainer);

  // Actualizar barra de progreso (por ejemplo, un elemento <progress>)
  const barraProgreso = document.getElementById("barraProgreso");
  if (barraProgreso) {
    const progreso = ((fin) / totalPreguntas) * 100;
    barraProgreso.style.width = progreso + "%";  // si es un div con ancho ajustable
    barraProgreso.textContent = `Progreso: ${Math.round(progreso)}%`;
  }
}



// Validación de cada bloque de preguntas
function validarRespuestas(inicio, fin) {
  for (let i = inicio; i < fin; i++) {
    const respuesta = document.querySelector(`select[name="pregunta${i}"]`);
    if (!respuesta || !respuesta.value) {
      alert("Responde todas las preguntas antes de continuar.");
      return false;
    }
  }
  return true;
}

// Manejo del envío final del formulario
document.getElementById("formTest").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const respuestas = [];

  for (let i = 0; i < preguntas.length; i++) {
    const respuesta = document.querySelector(`select[name="pregunta${i}"]`);
    if (!respuesta || !respuesta.value) {
      alert("Responde todas las preguntas antes de enviar.");
      return;
    }
    respuestas.push(parseInt(respuesta.value));
  }

  const promedio = respuestas.reduce((a, b) => a + b, 0) / respuestas.length;
  const fecha = new Date().toLocaleDateString("es-CO");
  const interpretacion = interpretarPromedio(promedio.toFixed(2));

  const resultBox = document.getElementById("resultSection");
  resultBox.innerHTML =
    `<strong>${nombre}</strong>, tu resultado promedio fue <strong>${promedio.toFixed(2)}</strong>.<br>${interpretacion}`;
  resultBox.classList.add("animate");
  document.querySelector(".result-section").style.display = "block";
  setTimeout(() => resultBox.classList.remove("animate"), 700);

  guardarHistorial(nombre, fecha, promedio.toFixed(2));
  this.reset();
  paginaActual = 0; // Reinicia la página del test para próximos intentos
});

// Interpreta el resultado del test
function interpretarPromedio(p) {
  const promedio = parseFloat(p);
  if (promedio <= 2.0) return "Se recomienda buscar acompañamiento profesional.";
  if (promedio <= 3.0) return "Tu estado emocional es bajo. Adopta hábitos de autocuidado.";
  if (promedio <= 4.0) return "Tienes un estado emocional estable. Sigue cuidando tu bienestar ❤️.";
  return "¡Excelente estado emocional! Sigue así 🌟.";
}

// Historial de resultados
function guardarHistorial(nombre, fecha, resultado) {
  const datos = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];
  datos.push({ nombre, fecha, resultado });
  localStorage.setItem("historialEstadoAnimo", JSON.stringify(datos));
}

function mostrarHistorico() {
  const datos = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];
  const tabla = document.getElementById("historialTabla");
  tabla.innerHTML = "";
  datos.forEach(d => {
    tabla.innerHTML += `<tr><td>${d.nombre}</td><td>${d.fecha}</td><td>${d.resultado}</td></tr>`;
  });
  document.getElementById("historySection").style.display = "block";
}

// Modo oscuro / claro
const toggleBtn = document.getElementById("toggleModo");

window.onload = function () {
  mostrarHistorico();
  if (localStorage.getItem("modo") === "oscuro") {
    document.body.classList.add("dark-mode");
    toggleBtn.innerText = "🌞 Cambiar modo";
  }
};

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modoActual = document.body.classList.contains("dark-mode") ? "oscuro" : "claro";
  toggleBtn.innerText = modoActual === "oscuro" ? "🌞 Cambiar modo" : "🌓 Cambiar modo";
  localStorage.setItem("modo", modoActual);
});


// Al inicio, crea barra de progreso en el HTML dinámicamente
function crearBarraProgreso() {
  const contenedor = document.getElementById("formTest");
  let progressBarContainer = document.getElementById("progressBarContainer");
  if (!progressBarContainer) {
    progressBarContainer = document.createElement("div");
    progressBarContainer.id = "progressBarContainer";
    progressBarContainer.style.width = "100%";
    progressBarContainer.style.backgroundColor = "#a3b8f0"; // azul pastel (bordes barra)
    progressBarContainer.style.borderRadius = "10px";
    progressBarContainer.style.margin = "15px 0";
    progressBarContainer.style.height = "20px";
    progressBarContainer.style.overflow = "hidden";

    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBar.style.height = "100%";
    progressBar.style.width = "0%";
    progressBar.style.backgroundColor = "#2c5cbf"; // azul vibrante
    progressBar.style.transition = "width 0.3s ease";
    progressBar.style.borderRadius = "10px 0 0 10px";

    progressBarContainer.appendChild(progressBar);
    contenedor.insertBefore(progressBarContainer, contenedor.firstChild);
  }
}

// Actualiza la barra de progreso según las respuestas completadas
function actualizarBarraProgreso() {
  const total = preguntas.length;
  const respuestas = Array.from(document.querySelectorAll("#preguntasContainer select"));
  const respondidas = respuestas.filter(s => s.value !== "").length;

  const porcentaje = (respondidas / total) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = porcentaje + "%";
  }
}

// Modifica la función generarPreguntas para añadir evento onchange y crear barra
function generarPreguntas() {
  crearBarraProgreso();

  const preguntasContainer = document.getElementById("preguntasContainer");
  preguntasContainer.innerHTML = "";

  preguntas.forEach((texto, index) => {
    const div = document.createElement("div");
    div.className = "card-question";
    div.innerHTML = `
      <label class="form-label fw-bold">${index + 1}. ${texto}</label>
      <select class="form-select" name="pregunta${index}" required>
        <option value="" selected disabled>Selecciona una opción</option>
        <option value="1">1 - Nunca / Muy bajo</option>
        <option value="2">2 - Rara vez / Bajo</option>
        <option value="3">3 - A veces / Moderado</option>
        <option value="4">4 - Frecuentemente / Alto</option>
        <option value="5">5 - Siempre / Muy alto</option>
      </select>
    `;
    preguntasContainer.appendChild(div);
  });

  // Añadir evento para actualizar progreso al cambiar una respuesta
  const selects = document.querySelectorAll("#preguntasContainer select");
  selects.forEach(select => {
    select.addEventListener("change", actualizarBarraProgreso);
  });

  // Inicializa barra en 0
  actualizarBarraProgreso();
}

// Al enviar formulario, ocultar barra
document.getElementById("formTest").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const respuestas = Array.from(document.querySelectorAll("#preguntasContainer select")).map(s => parseInt(s.value));

  if (respuestas.includes(NaN)) {
    alert("Responde todas las preguntas antes de enviar.");
    return;
  }

  const promedio = respuestas.reduce((a, b) => a + b, 0) / respuestas.length;
  const fecha = new Date().toLocaleDateString("es-CO");

  const interpretacion = interpretarPromedio(promedio.toFixed(2));
  const resultBox = document.getElementById("resultSection");
  resultBox.innerHTML =
    `<strong>${nombre}</strong>, tu resultado promedio fue <strong>${promedio.toFixed(2)}</strong>.<br>${interpretacion}`;
  resultBox.classList.add("animate");
  document.querySelector(".result-section").style.display = "block";
  setTimeout(() => resultBox.classList.remove("animate"), 700);

  guardarHistorial(nombre, fecha, promedio.toFixed(2));
  this.reset();

  // Ocultar barra de progreso al terminar
  const progressBarContainer = document.getElementById("progressBarContainer");
  if (progressBarContainer) progressBarContainer.style.display = "none";
});
