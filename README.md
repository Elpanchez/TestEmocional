# Test de Estado de Ánimo

Este proyecto es una aplicación web que permite a los usuarios evaluar su bienestar emocional mediante un cuestionario interactivo de 30 preguntas. Al finalizar, el sistema interpreta el resultado promedio y lo almacena para consulta futura.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Bootstrap 5.3**
- **LocalStorage (para historial de resultados)**

---

## 🚀 Cómo iniciar el proyecto

1. **Clona o descarga** este repositorio.
2. Abre el archivo `index.html` en tu navegador preferido.
3. Ingresa tu nombre en la pantalla de bienvenida y haz clic en "Comenzar Test".

---

## 🧾 Descripción del funcionamiento

- **Landing Page**: Vista inicial que solicita el nombre del usuario.
- **Formulario del Test**: Se muestran 30 preguntas paginadas de 5 en 5. Las respuestas se registran mediante selects.
- **Resultados**: Se calcula el promedio de respuestas y se interpreta el estado emocional con base en una guía.
- **Historial**: Los resultados se almacenan localmente (en el navegador) y pueden ser consultados en cualquier momento.
- **Modo oscuro / claro**: Conmutador de temas que persiste entre sesiones usando LocalStorage.
- **Barra de progreso**: Muestra visualmente el avance en el cuestionario.

---

## Interpretación del resultado

Según el promedio final de respuestas (de 1 a 5), se brinda una interpretación:

- ≤ 2.0 → Se recomienda buscar acompañamiento profesional.
- ≤ 3.0 → Estado emocional bajo. Se sugieren hábitos de autocuidado.
- ≤ 4.0 → Estado emocional estable.
- > 4.0 → ¡Excelente estado emocional!

---

## Detalles de IA y ajustes

- **IA utilizada:** ChatGPT
- **Prompt optimizado:** Se generaron preguntas sobre emociones, hábitos, relaciones y salud mental.
- **Ajustes realizados:**
  - Lenguaje más profesional y accesible.
  - Inclusión de feedback amigable.
  - Implementación de interpretación según promedios.

---

## 📁 Estructura del proyecto

TestEmocional
├── index.html
├── script.js
├── styles.css
└── README.md


---

## 👤 Autor

**Santiago Sánchez Ribero**  
📄 C.C. 01220371063

---

## 📌 Notas adicionales

- Esta aplicación **no sustituye** ayuda profesional. El objetivo es orientar de manera general sobre el estado emocional del usuario.
- Los datos se almacenan únicamente en el navegador del usuario (no se envían a servidores externos).

---

## 🧪 Estado del proyecto

✅ Completado y funcional  
🔜 Posibles mejoras futuras:
- Exportar resultados a PDF.
- Agregar autenticación para múltiples usuarios.
- Conectar a base de datos externa para historial en la nube.
