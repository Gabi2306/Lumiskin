function addChatbot() {
  //chat button
  const chatButton = document.createElement("button")
  chatButton.id = "chat-button"
  chatButton.className = "chat-button"
  chatButton.innerHTML = '<i class="fas fa-comment-dots"></i>'
  document.body.appendChild(chatButton)

  // chat container
  const chatContainer = document.createElement("div")
  chatContainer.id = "chat-container"
  chatContainer.className = "chat-container"

  const chatHeader = document.createElement("div")
  chatHeader.className = "chat-header"
  chatHeader.style.padding = "8px" 
  chatHeader.style.justifyContent = "flex-end" 
  chatHeader.style.borderBottom = "1px solid #e0e0e0" 

  // botón de cierre
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


  const chatContent = document.createElement("div")
  chatContent.style.height = "calc(100% - 30px)" 
  chatContent.innerHTML = `
    <iframe src="https://copilotstudio.microsoft.com/environments/Default-8d36836e-6b75-4de6-bab9-5f4b1775427f/bots/crm_lumis/webchat?__version__=2" 
            frameborder="0" 
            style="width: 100%; height: 100%;">
    </iframe>
  `

  chatContainer.appendChild(chatHeader)
  chatContainer.appendChild(chatContent)
  document.body.appendChild(chatContainer)

  // Toggle chat window con chat button
  chatButton.addEventListener("click", () => {
    chatContainer.style.display = "flex"
    chatButton.style.display = "none"
  })

  closeButton.addEventListener("click", () => {
    chatContainer.style.display = "none"
    chatButton.style.display = "flex"
  })

  chatContainer.style.display = "none"
}

export { addChatbot }
