import { products } from "./products.js"
import { showNotification } from "./ui.js"

const cart = JSON.parse(localStorage.getItem("cart")) || []

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))

  updateCartCount()

  showNotification(`${product.name} añadido al carrito`)
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId)
  if (index !== -1) {
    const product = cart[index]
    cart.splice(index, 1)

    localStorage.setItem("cart", JSON.stringify(cart))

    updateCartCount()

    showNotification(`${product.name} eliminado del carrito`)

    if (window.location.pathname.includes("cart.html")) {
      renderCart()
    }
  }
}

function updateCartItemQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity = quantity

    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    updateCartCount()

    if (window.location.pathname.includes("cart.html")) {
      renderCart()
    }
  }
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items-container")
  const cartSummary = document.getElementById("cart-summary")
  const emptyCart = document.getElementById("empty-cart")

  if (!cartItemsContainer) return

  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = "block"
    if (cartSummary) cartSummary.style.display = "none"
    return
  }

  if (emptyCart) emptyCart.style.display = "none"
  if (cartSummary) cartSummary.style.display = "block"

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  const subtotalElement = document.getElementById("subtotal")
  const shippingElement = document.getElementById("shipping")
  const totalElement = document.getElementById("total")

  if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)}$`
  if (shippingElement) shippingElement.textContent = shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}$`
  if (totalElement) totalElement.textContent = `${total.toFixed(2)}$`

  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"

    cartItem.innerHTML = `
          <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
              <h3>${item.name}</h3>
              <div class="cart-item-price">${item.price.toFixed(2)}$</div>
              <div class="cart-item-quantity">
                  <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                  <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                  <button class="quantity-btn increase" data-id="${item.id}">+</button>
              </div>
              <div class="cart-item-remove" data-id="${item.id}">Eliminar</div>
          </div>
          <div class="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}$
          </div>
      `

    cartItemsContainer.appendChild(cartItem)
  })

  const decreaseButtons = document.querySelectorAll(".quantity-btn.decrease")
  const increaseButtons = document.querySelectorAll(".quantity-btn.increase")
  const quantityInputs = document.querySelectorAll(".quantity-input")
  const removeButtons = document.querySelectorAll(".cart-item-remove")

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      const item = cart.find((item) => item.id === productId)
      if (item && item.quantity > 1) {
        updateCartItemQuantity(productId, item.quantity - 1)
      }
    })
  })

  increaseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      const item = cart.find((item) => item.id === productId)
      if (item) {
        updateCartItemQuantity(productId, item.quantity + 1)
      }
    })
  })

  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      const quantity = Number.parseInt(e.target.value)
      if (quantity > 0) {
        updateCartItemQuantity(productId, quantity)
      } else {
        e.target.value = 1
        updateCartItemQuantity(productId, 1)
      }
    })
  })

  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      removeFromCart(productId)
    })
  })
}

export { cart, updateCartCount, addToCart, removeFromCart, updateCartItemQuantity, renderCart }

