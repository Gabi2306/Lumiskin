import { cart } from "./cart.js"

// Render order summary on checkout pages
function renderOrderSummary() {
  const orderItems = document.getElementById("order-items")
  const summarySubtotal = document.getElementById("summary-subtotal")
  const summaryShipping = document.getElementById("summary-shipping")
  const summaryTotal = document.getElementById("summary-total")

  if (!orderItems) return

  // Clear previous items
  orderItems.innerHTML = ""

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = document.querySelector('input[name="shipping"]:checked')
    ? document.querySelector('input[name="shipping"]:checked').value === "express"
      ? 12000.00
      : 7000.00
    : subtotal > 50
      ? 0
      : 7.000
  const total = subtotal + shipping

  // Update summary
  if (summarySubtotal) summarySubtotal.textContent = `${subtotal.toFixed(2)}$`
  if (summaryShipping) summaryShipping.textContent = shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}$`
  if (summaryTotal) summaryTotal.textContent = `${total.toFixed(2)}$`

  // Render order items
  cart.forEach((item) => {
    const orderItem = document.createElement("div")
    orderItem.className = "order-item"

    orderItem.innerHTML = `
          <div class="order-item-image">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="order-item-details">
              <div class="order-item-title">${item.name}</div>
              <div class="order-item-price">${item.price.toFixed(2)}$</div>
              <div class="order-item-quantity">Cantidad: ${item.quantity}</div>
          </div>
      `

    orderItems.appendChild(orderItem)
  })
}

// Handle shipping method change
function handleShippingMethodChange() {
  const shippingOptions = document.querySelectorAll('input[name="shipping"]')
  shippingOptions.forEach((option) => {
    option.addEventListener("change", () => {
      renderOrderSummary()
    })
  })
}

// Handle payment method change
function handlePaymentMethodChange() {
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  const paymentForms = document.querySelectorAll(".payment-details")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      // Hide all payment forms
      paymentForms.forEach((form) => {
        form.classList.add("hidden")
      })

      // Show selected payment form
      const selectedForm = document.getElementById(`${method.value}-form`)
      if (selectedForm) {
        selectedForm.classList.remove("hidden")
      }

      // Update active class
      document.querySelectorAll(".payment-method").forEach((pm) => {
        pm.classList.remove("active")
      })
      method.parentElement.classList.add("active")
    })
  })
}

// Handle billing address checkbox
function handleBillingAddressCheckbox() {
  const sameAddressCheckbox = document.getElementById("same-address")
  const billingAddressForm = document.getElementById("billing-address-form")

  if (sameAddressCheckbox && billingAddressForm) {
    sameAddressCheckbox.addEventListener("change", () => {
      if (sameAddressCheckbox.checked) {
        billingAddressForm.classList.add("hidden")
      } else {
        billingAddressForm.classList.remove("hidden")
      }
    })
  }
}

// Initialize shipping page
function initShippingPage() {
  renderOrderSummary()
  handleShippingMethodChange()

  // Handle continue to payment button
  const toPaymentBtn = document.getElementById("to-payment-btn")
  if (toPaymentBtn) {
    toPaymentBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const form = document.getElementById("shipping-form")
      if (form.checkValidity()) {
        window.location.href = "payment.html"
      } else {
        form.reportValidity()
      }
    })
  }
}

// Initialize payment page
function initPaymentPage() {
  renderOrderSummary()
  handlePaymentMethodChange()
  handleBillingAddressCheckbox()

  // Handle complete order button
  const completeOrderBtn = document.getElementById("complete-order-btn")
  if (completeOrderBtn) {
    completeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const form = document.getElementById("payment-form")
      if (form.checkValidity()) {
        // Clear cart
        localStorage.setItem("cart", JSON.stringify([]))

        // Redirect to confirmation page
        alert("¡Pedido completado con éxito! Gracias por tu compra.")
        window.location.href = "index.html"
      } else {
        form.reportValidity()
      }
    })
  }
}

// Exportar funciones
export { renderOrderSummary, initShippingPage, initPaymentPage }

