// Show notification
function showNotification(message) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
  
    document.body.appendChild(notification)
  
    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)
  
    // Hide and remove notification
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
  
  // Add CSS for notifications and chatbot
  function addStyles() {
    const styleElement = document.createElement("style")
    styleElement.textContent = `
      .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--secondary-color);
          color: var(--white);
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 1000;
      }
      
      .notification.show {
          transform: translateY(0);
          opacity: 1;
      }
      
      /* Chatbot Styles */
      #chat-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--accent-color, #4a90e2);
          color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          z-index: 999;
          transition: transform 0.3s ease;
      }
  
      #chat-button:hover {
          transform: scale(1.1);
      }
  
      #chat-container {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 350px;
          height: 500px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          z-index: 999;
          display: none;
      }
      
      /* Responsive Chatbot */
      @media (max-width: 576px) {
          #chat-container {
              width: calc(100% - 40px);
              height: 60vh;
          }
      }
    `
    document.head.appendChild(styleElement)
  }
  
  // Exportar funciones
  export { showNotification, addStyles }
  
  