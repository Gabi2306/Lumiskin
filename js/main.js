import { updateCartCount } from "./cart.js"
import { addStyles } from "./ui.js"
import { initCataloguePage } from "./catalogue.js"
import { renderCart } from "./cart.js"
import { initShippingPage, initPaymentPage } from "./checkout.js"
import { addChatbot } from "./chatbot.js"

// Initialize page specific functionality
function initPage() {
  // Add styles
  addStyles()

  // Common initialization for all pages
  updateCartCount()

  // Check which page we're on
  const path = window.location.pathname

  if (path.includes("catalogue.html")) {
    // Catalogue page
    initCataloguePage()
  } else if (path.includes("cart.html")) {
    // Cart page
    renderCart()
  } else if (path.includes("shipping.html")) {
    // Shipping page
    initShippingPage()
  } else if (path.includes("payment.html")) {
    // Payment page
    initPaymentPage()
  }

  // Add Microsoft Copilot Studio chatbot
  addChatbot()
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage)

