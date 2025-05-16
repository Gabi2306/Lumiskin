// Add Microsoft Copilot Studio chatbot
function addChatbot() {
  // Create chat button
  const chatButton = document.createElement("button")
  chatButton.id = "chat-button"
  chatButton.className = "chat-button"
  chatButton.innerHTML = '<i class="fas fa-comment-dots"></i>'
  document.body.appendChild(chatButton)

  // Create chat container
  const chatContainer = document.createElement("div")
  chatContainer.id = "chat-container"
  chatContainer.className = "chat-container"

  // Modificar la creación del header del chat para que sea más delgado y solo tenga el botón X

  // Reemplazar la sección donde se crea el chatHeader con:
  const chatHeader = document.createElement("div")
  chatHeader.className = "chat-header"
  chatHeader.style.padding = "8px" // Reducir el padding para hacer la barra más delgada
  chatHeader.style.justifyContent = "flex-end" // Alinear contenido a la derecha
  chatHeader.style.borderBottom = "1px solid #e0e0e0" // Borde sutil

  // Eliminar la creación del chatTitle y solo crear el botón de cierre
  const closeButton = document.createElement("button")
  closeButton.id = "chat-close-btn"
  closeButton.innerHTML = '<i class="fas fa-times"></i>'
  closeButton.style.background = "none"
  closeButton.style.border = "none"
  closeButton.style.cursor = "pointer"
  closeButton.style.fontSize = "16px"
  closeButton.style.color = "#333"
  closeButton.style.padding = "4px 8px"

  chatHeader.appendChild(closeButton)

  // Modificar el contenedor del iframe para ajustar la altura
  // Reemplazar la creación de chatContent con:
  const chatContent = document.createElement("div")
  chatContent.style.height = "calc(100% - 30px)" // Ajustar la altura para compensar el header más delgado
  chatContent.innerHTML = `
    <iframe src="https://copilotstudio.microsoft.com/environments/Default-8d36836e-6b75-4de6-bab9-5f4b1775427f/bots/crm_lumis/webchat?__version__=2" 
            frameborder="0" 
            style="width: 100%; height: 100%;">
    </iframe>
  `

  // Agregar elementos al contenedor principal
  chatContainer.appendChild(chatHeader)
  chatContainer.appendChild(chatContent)
  document.body.appendChild(chatContainer)

  // Toggle chat window with chat button
  chatButton.addEventListener("click", () => {
    chatContainer.style.display = "flex"
    chatButton.style.display = "none"
  })

  // Close chat window with close button
  closeButton.addEventListener("click", () => {
    chatContainer.style.display = "none"
    chatButton.style.display = "flex"
  })

  // Inicialmente ocultar el contenedor del chat
  chatContainer.style.display = "none"
}

// Exportar funciones
export { addChatbot }
