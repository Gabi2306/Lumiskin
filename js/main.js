import { updateCartCount } from "./cart.js"
import { addStyles } from "./ui.js"
import { initCataloguePage } from "./catalogue.js"
import { renderCart } from "./cart.js"
import { initShippingPage, initPaymentPage } from "./checkout.js"
import { addChatbot } from "./chatbot.js"

function initPage() {
  addStyles()

  updateCartCount()

  const path = window.location.pathname

  if (path.includes("catalogue.html")) {
    initCataloguePage()
  } else if (path.includes("cart.html")) {
    renderCart()
  } else if (path.includes("shipping.html")) {
    initShippingPage()
  } else if (path.includes("payment.html")) {
    initPaymentPage()
  }

  addChatbot()
}

document.addEventListener("DOMContentLoaded", initPage)

