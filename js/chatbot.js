// Add Microsoft Copilot Studio chatbot
function addChatbot() {
    // Create chat button
    const chatButton = document.createElement("button")
    chatButton.id = "chat-button"
    chatButton.innerHTML = '<i class="fas fa-comment-dots"></i>'
    document.body.appendChild(chatButton)
  
    // Create chat container
    const chatContainer = document.createElement("div")
    chatContainer.id = "chat-container"
    chatContainer.innerHTML = `
      <iframe src="https://copilotstudio.microsoft.com/environments/Default-8d36836e-6b75-4de6-bab9-5f4b1775427f/bots/crm_lumis/webchat?__version__=2" 
              frameborder="0" 
              style="width: 100%; height: 100%;">
      </iframe>
    `
    document.body.appendChild(chatContainer)
  
    // Toggle chat window
    chatButton.addEventListener("click", () => {
      if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block"
        chatButton.style.display = "none"
      } else {
        chatContainer.style.display = "none"
        chatButton.style.display = "flex"
      }
    })
  }
  
  // Exportar funciones
  export { addChatbot }
  
  