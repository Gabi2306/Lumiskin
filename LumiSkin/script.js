// Sample product data
const products = [
  {
    id: 1,
    name: "The Ordinary Squalane Cleanser Limpiador",
    category: "cleansers",
    price: 79400,
    image: "images/Squalane.jpeg",
    description: "Limpiador suave que elimina impurezas sin resecar la piel.",
    skinType: ["all", "sensitive", "dry"],
    featured: true,
  },
  {
    id: 2,
    name: "Serum de Niacinamida 10%",
    category: "serums",
    price: 41600,
    image: "images/Niacinamida.webp",
    description: "Reduce la apariencia de los poros y mejora el tono de la piel.",
    skinType: ["all", "oily", "combination"],
    featured: true,
  },
  {
    id: 3,
    name: "Ácido Hialurónico + B5 Serum",
    category: "serums",
    price: 64000,
    image: "images/hyaluronic.webp",
    description: "Hidratación intensa para una piel más jugosa y radiante.",
    skinType: ["all", "dry", "normal"],
    featured: true,
  },
  {
    id: 4,
    name: "Tratamiento Anti-Acné",
    category: "treatments",
    price: 138900,
    image: "images/Acne.jpeg",
    description: "Combate el acné y previene nuevas erupciones.",
    skinType: ["oily", "combination"],
    featured: false,
  },
  {
    id: 5,
    name: "Crema Hidratante Natural",
    category: "moisturizers",
    price: 102000,
    image: "images/Hidratante.webp",
    description: "Hidratación ligera para todo el día sin sensación grasa.",
    skinType: ["all", "oily", "combination", "normal"],
    featured: true,
  },
  {
    id: 6,
    name: "Tónico Exfoliante",
    category: "toners",
    price: 84150,
    image: "images/exfoliante.webp",
    description: "Exfolia suavemente y prepara la piel para los siguientes productos.",
    skinType: ["all", "normal", "combination"],
    featured: false,
  },
  {
    id: 7,
    name: "Mascarilla de Arcilla Purificante",
    category: "masks",
    price: 101000,
    image: "images/arcilla.webp",
    description: "Purifica los poros y elimina impurezas profundas para una piel más clara.",
    skinType: ["oily", "combination"],
    featured: false,
  },
  {
    id: 8,
    name: "Protector Solar Mineral",
    category: "treatments",
    price: 51335,
    image: "images/sunscreen.webp",
    description: "Protección de amplio espectro contra los rayos UVA y UVB.",
    skinType: ["all"],
    featured: true,
  },
  {
    id: 9,
    name: "Exfoliante Facial Enzimático",
    category: "exfoliants",
    price: 48675,
    image: "images/enzimatico.jpg",
    description: "Exfoliación suave con enzimas naturales para una piel renovada.",
    skinType: ["all", "sensitive"],
    featured: false,
  },
  {
    id: 10,
    name: "Crema Antiarrugas",
    category: "moisturizers",
    price: 96500,
    image: "images/anti-aging.webp",
    description: "Combate los signos visibles del envejecimiento y mejora la elasticidad.",
    skinType: ["dry", "normal"],
    featured: true,
  },
  {
    id: 11,
    name: "Aceite Facial Nutritivo",
    category: "treatments",
    price: 39829,
    image: "images/oil.webp",
    description: "Nutrición profunda con aceites naturales para una piel radiante.",
    skinType: ["dry", "normal"],
    featured: false,
  },
  {
    id: 12,
    name: "Contorno de Ojos",
    category: "treatments",
    price: 84900,
    image: "images/eye-cream.webp",
    description: "Reduce ojeras, bolsas y líneas finas alrededor de los ojos.",
    skinType: ["all"],
    featured: true,
  },
]

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Update cart count in the header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  }
}

// Add to cart function
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

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show notification
  showNotification(`${product.name} añadido al carrito`)
}

// Remove from cart function
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId)
  if (index !== -1) {
    const product = cart[index]
    cart.splice(index, 1)

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update cart count
    updateCartCount()

    // Show notification
    showNotification(`${product.name} eliminado del carrito`)

    // Refresh cart page if we're on it
    if (window.location.pathname.includes("cart.html")) {
      renderCart()
    }
  }
}

// Update item quantity in cart
function updateCartItemQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity = quantity

    // If quantity is 0, remove item
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update cart count
    updateCartCount()

    // Refresh cart page if we're on it
    if (window.location.pathname.includes("cart.html")) {
      renderCart()
    }
  }
}

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

// Render products on catalogue page
function renderProducts(productsToRender = products) {
  const productContainer = document.getElementById("product-container")
  if (!productContainer) return

  productContainer.innerHTML = ""

  if (productsToRender.length === 0) {
    productContainer.innerHTML = `
          <div class="no-products">
              <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
          </div>
      `
    return
  }

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
          <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
              <div class="product-category">${getCategoryName(product.category)}</div>
              <h3 class="product-title">${product.name}</h3>
              <div class="product-price">${product.price.toFixed(2)}$</div>
              <div class="product-actions">
                  <button class="btn-small add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                  <button class="btn-small view-product-btn" data-id="${product.id}">Ver Detalles</button>
              </div>
          </div>
      `

    productContainer.appendChild(productCard)
  })

  // Add event listeners to add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number.parseInt(e.target.getAttribute("data-id"))
      addToCart(productId)
    })
  })
}

// Get category name in Spanish
function getCategoryName(category) {
  const categories = {
    cleansers: "Limpiadores",
    toners: "Tónicos",
    exfoliants: "Exfoliantes",
    serums: "Serums",
    moisturizers: "Hidratantes",
    treatments: "Tratamientos",
    masks: "Mascarillas",
  }

  return categories[category] || category
}

// Filter products
function filterProducts() {
  const searchInput = document.getElementById("search-input")
  const priceRange = document.getElementById("price-range")

  let filteredProducts = [...products]

  // Filter by search term
  if (searchInput && searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )
  }

  // Filter by price
  if (priceRange) {
    const maxPrice = Number.parseInt(priceRange.value)
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)
  }

  // Filter by category
  const selectedCategories = []
  document.querySelectorAll('input[name="category"]:checked').forEach((checkbox) => {
    if (checkbox.value !== "all") {
      selectedCategories.push(checkbox.value)
    }
  })

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category))
  }

  // Filter by skin type
  const selectedSkinTypes = []
  document.querySelectorAll('input[name="skin-type"]:checked').forEach((checkbox) => {
    if (checkbox.value !== "all") {
      selectedSkinTypes.push(checkbox.value)
    }
  })

  if (selectedSkinTypes.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.skinType.some((type) => selectedSkinTypes.includes(type)),
    )
  }

  renderProducts(filteredProducts)
}

// Render cart items
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items-container")
  const cartSummary = document.getElementById("cart-summary")
  const emptyCart = document.getElementById("empty-cart")

  if (!cartItemsContainer) return

  // Clear previous items
  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    // Show empty cart message
    if (emptyCart) emptyCart.style.display = "block"
    if (cartSummary) cartSummary.style.display = "none"
    return
  }

  // Hide empty cart message and show summary
  if (emptyCart) emptyCart.style.display = "none"
  if (cartSummary) cartSummary.style.display = "block"

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  // Update summary
  const subtotalElement = document.getElementById("subtotal")
  const shippingElement = document.getElementById("shipping")
  const totalElement = document.getElementById("total")

  if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)}$`
  if (shippingElement) shippingElement.textContent = shipping === 0 ? "Gratis" : `${shipping.toFixed(2)}$`
  if (totalElement) totalElement.textContent = `${total.toFixed(2)}$`

  // Render cart items
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

  // Add event listeners to quantity buttons
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
      ? 9.99
      : 4.99
    : subtotal > 50
      ? 0
      : 4.99
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

// Initialize page specific functionality
function initPage() {
  // Common initialization for all pages
  updateCartCount()

  // Check which page we're on
  const path = window.location.pathname

  if (path.includes("catalogue.html")) {
    // Catalogue page
    renderProducts()

    // Add event listeners for filters
    const searchInput = document.getElementById("search-input")
    const searchBtn = document.getElementById("search-btn")
    const priceRange = document.getElementById("price-range")
    const priceValue = document.getElementById("price-value")
    const applyFiltersBtn = document.getElementById("apply-filters")

    if (searchInput && searchBtn) {
      searchBtn.addEventListener("click", filterProducts)
      searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          filterProducts()
        }
      })
    }

    if (priceRange && priceValue) {
      priceRange.addEventListener("input", () => {
        priceValue.textContent = `${priceRange.value}$`
      })
    }

    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", filterProducts)
    }

    // Initialize category checkboxes
    const allCategoryCheckbox = document.querySelector('input[name="category"][value="all"]')
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:not([value="all"])')

    if (allCategoryCheckbox && categoryCheckboxes.length > 0) {
      allCategoryCheckbox.addEventListener("change", () => {
        if (allCategoryCheckbox.checked) {
          categoryCheckboxes.forEach((checkbox) => {
            checkbox.checked = false
          })
        }
      })

      categoryCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            allCategoryCheckbox.checked = false
          } else if ([...categoryCheckboxes].every((cb) => !cb.checked)) {
            allCategoryCheckbox.checked = true
          }
        })
      })
    }

    // Initialize skin type checkboxes
    const allSkinTypeCheckbox = document.querySelector('input[name="skin-type"][value="all"]')
    const skinTypeCheckboxes = document.querySelectorAll('input[name="skin-type"]:not([value="all"])')

    if (allSkinTypeCheckbox && skinTypeCheckboxes.length > 0) {
      allSkinTypeCheckbox.addEventListener("change", () => {
        if (allSkinTypeCheckbox.checked) {
          skinTypeCheckboxes.forEach((checkbox) => {
            checkbox.checked = false
          })
        }
      })

      skinTypeCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            allSkinTypeCheckbox.checked = false
          } else if ([...skinTypeCheckboxes].every((cb) => !cb.checked)) {
            allSkinTypeCheckbox.checked = true
          }
        })
      })
    }
  } else if (path.includes("cart.html")) {
    // Cart page
    renderCart()
  } else if (path.includes("shipping.html")) {
    // Shipping page
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
  } else if (path.includes("payment.html")) {
    // Payment page
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
          cart = []
          localStorage.setItem("cart", JSON.stringify(cart))

          // Redirect to confirmation page
          alert("¡Pedido completado con éxito! Gracias por tu compra.")
          window.location.href = "index.html"
        } else {
          form.reportValidity()
        }
      })
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage)

// Add CSS for notifications
const notificationStyle = document.createElement("style")
notificationStyle.textContent = `
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
`
document.head.appendChild(notificationStyle)

// Enhanced Chatbot functionality
function initChatbot() {
  console.log("Inicializando componentes del chatbot...")

  const chatButton = document.getElementById("chat-button")
  const chatContainer = document.getElementById("chat-container")
  const chatCloseBtn = document.getElementById("chat-close-btn")
  const chatInput = document.getElementById("chat-input")
  const chatSendBtn = document.getElementById("chat-send-btn")
  const chatMessages = document.getElementById("chat-messages")

  // Verificar que todos los elementos existen
  if (!chatButton || !chatContainer || !chatCloseBtn || !chatInput || !chatSendBtn || !chatMessages) {
    console.error("Faltan elementos del chatbot en el DOM:", {
      chatButton: !!chatButton,
      chatContainer: !!chatContainer,
      chatCloseBtn: !!chatCloseBtn,
      chatInput: !!chatInput,
      chatSendBtn: !!chatSendBtn,
      chatMessages: !!chatMessages,
    })
    return // Salir si faltan elementos
  }

  console.log("Todos los elementos del chatbot encontrados, configurando eventos...")

  // Asegurarse de que el botón del chatbot sea visible
  chatButton.style.display = "flex"
  chatContainer.style.display = "none"

  // Toggle chat window
  chatButton.addEventListener("click", () => {
    console.log("Botón del chatbot clickeado")
    chatContainer.style.display = "flex"
    chatButton.style.display = "none"
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight
  })

  // Close chat window
  chatCloseBtn.addEventListener("click", () => {
    console.log("Botón de cerrar chatbot clickeado")
    chatContainer.style.display = "none"
    chatButton.style.display = "flex"
  })

  // User context to track conversation state
  const userContext = {
    skinType: null,
    concerns: [],
    askedQuestions: [],
    currentTopic: null,
    conversationStage: "greeting",
    lastSuggestions: [], // Para almacenar las últimas sugerencias ofrecidas
  }

  // Comprehensive skincare knowledge base
  const skincareKnowledge = [
    // Skin types
    {
      type: "skin-type",
      keywords: ["piel seca", "deshidratada", "tirante", "escamosa"],
      skinType: "dry",
      characteristics:
        "La piel seca se caracteriza por sensación de tirantez, descamación, aspereza y posible irritación.",
      causes:
        "Puede ser causada por factores genéticos, clima seco, calefacción, duchas calientes o productos agresivos.",
      needs: "Necesita hidratación intensa, ingredientes humectantes y emolientes para restaurar la barrera cutánea.",
      routine: {
        morning: [
          "Limpiador suave sin sulfatos",
          "Tónico hidratante sin alcohol",
          "Sérum de ácido hialurónico",
          "Crema hidratante rica",
          "Protector solar",
        ],
        evening: [
          "Limpiador suave o aceite limpiador",
          "Tónico hidratante",
          "Sérum hidratante",
          "Aceite facial o crema nutritiva",
          "Mascarilla hidratante (1-2 veces por semana)",
        ],
      },
      recommendedProducts: [1, 3, 5, 11],
      avoidIngredients: ["Alcohol", "Sulfatos", "Fragancias artificiales", "Exfoliantes agresivos"],
    },
    {
      type: "skin-type",
      keywords: ["piel grasa", "acné", "brillante", "espinillas", "puntos negros", "poros", "comedones"],
      skinType: "oily",
      characteristics:
        "La piel grasa se caracteriza por exceso de sebo, brillo, poros dilatados y tendencia a acné y puntos negros.",
      causes: "Puede ser causada por factores genéticos, hormonales, estrés, humedad o uso de productos comedogénicos.",
      needs:
        "Necesita control de sebo, ingredientes no comedogénicos y exfoliación regular para prevenir obstrucciones.",
      routine: {
        morning: [
          "Limpiador con ácido salicílico o niacinamida",
          "Tónico astringente suave",
          "Sérum ligero con niacinamida",
          "Hidratante en gel o fluido",
          "Protector solar oil-free",
        ],
        evening: [
          "Limpiador espumoso o con ácido salicílico",
          "Tónico exfoliante (con AHA/BHA)",
          "Tratamiento para acné (si es necesario)",
          "Hidratante ligero",
          "Mascarilla de arcilla (1-2 veces por semana)",
        ],
      },
      recommendedProducts: [2, 4, 5, 6, 7],
      avoidIngredients: ["Aceites pesados", "Mantecas", "Ingredientes comedogénicos", "Alcohol desnaturalizado"],
    },
    {
      type: "skin-type",
      keywords: ["piel mixta", "combinada", "zona t", "grasa y seca"],
      skinType: "combination",
      characteristics: "La piel mixta presenta zona T (frente, nariz, barbilla) grasa y mejillas normales o secas.",
      causes:
        "Suele ser determinada genéticamente, pero puede verse afectada por clima, hormonas o productos inadecuados.",
      needs: "Requiere equilibrio: controlar el exceso de grasa en zona T sin resecar las áreas secas.",
      routine: {
        morning: [
          "Limpiador suave equilibrante",
          "Tónico sin alcohol",
          "Sérum con niacinamida",
          "Hidratante ligero (zona T) y más rico (mejillas)",
          "Protector solar oil-free",
        ],
        evening: [
          "Limpiador adecuado para piel mixta",
          "Tónico equilibrante",
          "Tratamientos específicos por zonas",
          "Hidratante ligero o medio",
          "Mascarillas multimasking (diferentes para cada zona, 1 vez por semana)",
        ],
      },
      recommendedProducts: [2, 5, 6, 7],
      avoidIngredients: ["Productos muy oclusivos", "Alcohol en exceso", "Aceites pesados en toda la cara"],
    },
    {
      type: "skin-type",
      keywords: ["piel sensible", "irritada", "rojez", "irritación", "alergia", "reactiva", "ardor"],
      skinType: "sensitive",
      characteristics:
        "La piel sensible reacciona fácilmente con rojez, ardor, picazón o irritación ante diversos estímulos.",
      causes: "Puede ser causada por barrera cutánea debilitada, rosácea, dermatitis, alergias o factores ambientales.",
      needs: "Necesita productos suaves, calmantes, sin irritantes y que fortalezcan la barrera cutánea.",
      routine: {
        morning: [
          "Limpiador muy suave sin sulfatos",
          "Agua termal o tónico calmante",
          "Sérum calmante (con centella asiática, alantoína o niacinamida)",
          "Crema hidratante para piel sensible",
          "Protector solar mineral",
        ],
        evening: [
          "Limpiador suave o leche limpiadora",
          "Agua termal",
          "Sérum reparador de barrera",
          "Crema calmante",
          "Mascarilla calmante (ocasionalmente)",
        ],
      },
      recommendedProducts: [1, 9],
      avoidIngredients: [
        "Alcohol",
        "Fragancias",
        "Aceites esenciales",
        "Exfoliantes físicos",
        "Ácidos en alta concentración",
      ],
    },
    {
      type: "skin-type",
      keywords: ["piel normal", "equilibrada", "saludable"],
      skinType: "normal",
      characteristics: "La piel normal está equilibrada, ni grasa ni seca, con poros finos y textura suave.",
      causes: "Es principalmente determinada por genética, pero se mantiene con buenos hábitos y cuidados adecuados.",
      needs: "Necesita mantenimiento con hidratación balanceada y protección para conservar su estado óptimo.",
      routine: {
        morning: ["Limpiador suave", "Tónico hidratante", "Sérum antioxidante", "Hidratante ligero", "Protector solar"],
        evening: [
          "Limpiador adecuado",
          "Tónico",
          "Sérum específico según preocupación (antioxidante, anti-edad)",
          "Crema hidratante",
          "Exfoliante suave (1-2 veces por semana)",
        ],
      },
      recommendedProducts: [1, 3, 5, 8, 10],
      avoidIngredients: ["No hay restricciones específicas, pero evitar irritantes innecesarios"],
    },

    // Skin concerns
    {
      type: "concern",
      keywords: ["arrugas", "líneas", "expresión", "edad", "envejecimiento", "flacidez", "anti-edad", "antiarrugas"],
      concern: "aging",
      description:
        "El envejecimiento cutáneo se manifiesta con líneas finas, arrugas, pérdida de firmeza y luminosidad.",
      causes: "Causado por edad, exposición solar, contaminación, estrés oxidativo, hábitos de vida y genética.",
      solution: "Incorporar ingredientes que estimulen colágeno, antioxidantes y exfoliantes para renovación celular.",
      keyIngredients: ["Retinol/Retinoides", "Péptidos", "Vitamina C", "Ácido hialurónico", "Niacinamida", "AHAs"],
      routine: {
        essential: [
          "Limpieza suave",
          "Sérum antioxidante (mañana)",
          "Retinol o péptidos (noche)",
          "Hidratante rico",
          "Protector solar diario (fundamental)",
          "Contorno de ojos específico",
        ],
      },
      recommendedProducts: [3, 10, 12],
      tips: "La protección solar es el mejor anti-edad. Complementa con alimentación rica en antioxidantes y buena hidratación.",
    },
    {
      type: "concern",
      keywords: ["acné", "espinillas", "granos", "puntos negros", "comedones", "imperfecciones"],
      concern: "acne",
      description:
        "El acné es una condición inflamatoria que causa espinillas, puntos negros, quistes y posibles cicatrices.",
      causes: "Causado por exceso de sebo, bacterias, inflamación, células muertas y factores hormonales.",
      solution: "Control de sebo, exfoliación adecuada, ingredientes antibacterianos y antiinflamatorios.",
      keyIngredients: ["Ácido salicílico", "Peróxido de benzoilo", "Niacinamida", "Retinoides", "Ácido azelaico"],
      routine: {
        essential: [
          "Limpiador con ácido salicílico",
          "Tónico sin alcohol",
          "Tratamiento específico para acné",
          "Hidratante oil-free",
          "Protector solar no comedogénico",
          "Exfoliante químico (2-3 veces por semana)",
        ],
      },
      recommendedProducts: [2, 4, 6, 7],
      tips: "No manipules las lesiones. Cambia la funda de almohada frecuentemente. Evita productos comedogénicos.",
    },
    {
      type: "concern",
      keywords: ["manchas", "oscuras", "hiperpigmentación", "melasma", "paño", "decoloración"],
      concern: "hyperpigmentation",
      description: "La hiperpigmentación son manchas oscuras causadas por exceso de melanina en áreas específicas.",
      causes: "Causada por sol, inflamación post-acné, hormonas (melasma), edad (lentigos) o heridas.",
      solution: "Ingredientes despigmentantes, exfoliación para renovar células y SIEMPRE protección solar.",
      keyIngredients: ["Vitamina C", "Ácido kójico", "Niacinamida", "Ácido azelaico", "Retinoides", "AHAs", "Arbutina"],
      routine: {
        essential: [
          "Limpieza suave",
          "Sérum despigmentante (vitamina C por la mañana)",
          "Tratamiento específico (noche)",
          "Hidratante con ingredientes aclarantes",
          "Protector solar alto espectro (indispensable)",
          "Exfoliante químico (1-2 veces por semana)",
        ],
      },
      recommendedProducts: [2, 6, 8, 9],
      tips: "La protección solar es CRUCIAL. Usa sombrero y evita exposición en horas pico. Sé constante, los resultados tardan semanas o meses.",
    },
    {
      type: "concern",
      keywords: ["poros", "abiertos", "dilatados", "grandes", "visibles"],
      concern: "pores",
      description:
        "Los poros dilatados son aperturas foliculares visibles, generalmente en zona T, que dan textura irregular.",
      causes: "Causados por genética, exceso de sebo, pérdida de elasticidad, acumulación de células muertas o edad.",
      solution:
        'No pueden "cerrarse", pero su apariencia mejora con limpieza profunda, exfoliación y astringentes suaves.',
      keyIngredients: ["Niacinamida", "Ácido salicílico", "Retinol", "Arcillas", "Zinc"],
      routine: {
        essential: [
          "Limpieza profunda",
          "Tónico astringente suave",
          "Sérum con niacinamida",
          "Hidratante ligero no comedogénico",
          "Protector solar mate",
          "Mascarilla de arcilla (semanal)",
          "Exfoliante con BHA (2 veces por semana)",
        ],
      },
      recommendedProducts: [2, 6, 7],
      tips: "Limpia bien el rostro mañana y noche. No uses productos oclusivos. La hidratación adecuada es importante incluso para piel grasa.",
    },
    {
      type: "concern",
      keywords: ["rojez", "rosácea", "sensibilidad", "enrojecimiento", "irritación", "cuperosis"],
      concern: "redness",
      description:
        "La rojez facial puede ser temporal (rubor) o crónica (rosácea, cuperosis), con piel reactiva e inflamada.",
      causes:
        "Causada por vasos sanguíneos dilatados, barrera cutánea debilitada, rosácea, alergias o factores externos.",
      solution: "Ingredientes calmantes, antiinflamatorios y fortalecedores de la barrera cutánea.",
      keyIngredients: ["Centella asiática", "Niacinamida", "Alantoína", "Bisabolol", "Avena coloidal", "Ceramidas"],
      routine: {
        essential: [
          "Limpieza ultra suave",
          "Agua termal",
          "Sérum calmante",
          "Crema reforzadora de barrera",
          "Protector solar mineral",
          "Evitar exfoliantes agresivos",
        ],
      },
      recommendedProducts: [1, 3],
      tips: "Evita extremos de temperatura, alcohol, comidas picantes y productos irritantes. Consulta con un dermatólogo si sospechas rosácea.",
    },

    // Ingredients
    {
      type: "ingredient",
      keywords: ["retinol", "retinoide", "retina", "vitamina a"],
      ingredient: "retinol",
      description:
        "Derivado de la vitamina A que acelera la renovación celular, estimula el colágeno y regula la producción de sebo.",
      benefits:
        "Combate arrugas, acné, manchas, textura irregular y poros dilatados. Es uno de los activos más estudiados y efectivos.",
      howToUse:
        "Aplicar por la noche. Comenzar con concentraciones bajas (0.25-0.5%) 1-2 veces por semana, aumentando gradualmente. Siempre usar protector solar durante el día.",
      precautions:
        "Puede causar irritación, sequedad y fotosensibilidad al inicio. No usar durante embarazo/lactancia. No combinar con AHA/BHA en la misma aplicación.",
      goodFor: ["Envejecimiento", "Acné", "Manchas", "Textura irregular"],
      notRecommendedFor: ["Piel muy sensible", "Rosácea activa", "Dermatitis", "Embarazo/lactancia"],
    },
    {
      type: "ingredient",
      keywords: ["vitamina c", "ácido ascórbico", "antioxidante"],
      ingredient: "vitamin-c",
      description:
        "Potente antioxidante que protege contra daños ambientales, aclara manchas y estimula la producción de colágeno.",
      benefits: "Ilumina, unifica tono, protege contra radicales libres, reduce hiperpigmentación y mejora firmeza.",
      howToUse:
        "Aplicar por la mañana debajo del protector solar para potenciar su protección. Guardar en lugar fresco y oscuro para mantener estabilidad.",
      precautions:
        "Puede oxidarse. Algunas formas pueden irritar pieles sensibles. Verificar pH y concentración para efectividad.",
      goodFor: ["Todo tipo de piel", "Hiperpigmentación", "Piel apagada", "Prevención de envejecimiento"],
      notRecommendedFor: ["Pieles extremadamente sensibles (en altas concentraciones)"],
    },
    {
      type: "ingredient",
      keywords: ["ácido hialurónico", "hialurónico", "hidratación"],
      ingredient: "hyaluronic-acid",
      description:
        "Molécula que retiene hasta 1000 veces su peso en agua, proporcionando hidratación intensa sin obstruir poros.",
      benefits: "Hidrata profundamente, rellena arrugas finas, mejora elasticidad y da aspecto más jugoso a la piel.",
      howToUse:
        "Aplicar sobre piel húmeda para maximizar absorción. Puede usarse mañana y noche. Funciona bien bajo otros productos.",
      precautions: "En climas muy secos, sellar con un hidratante para evitar que extraiga humedad de la piel.",
      goodFor: ["Todos los tipos de piel", "Deshidratación", "Arrugas finas", "Piel apagada"],
      notRecommendedFor: ["No hay contraindicaciones significativas"],
    },
    {
      type: "ingredient",
      keywords: ["niacinamida", "vitamina b3", "nicotinamida"],
      ingredient: "niacinamide",
      description: "Forma de vitamina B3 que regula sebo, reduces poros, fortalece barrera cutánea y mejora textura.",
      benefits:
        "Controla brillos, reduce enrojecimiento, mejora hiperpigmentación, refuerza barrera cutánea y calma inflamación.",
      howToUse:
        "Puede usarse mañana y noche. Concentraciones de 2-5% son efectivas y bien toleradas; 10% para problemas específicos.",
      precautions:
        "Generalmente bien tolerada. Algunas personas pueden experimentar enrojecimiento con altas concentraciones.",
      goodFor: ["Todos los tipos de piel", "Especialmente piel grasa y mixta", "Poros dilatados", "Rojeces"],
      notRecommendedFor: ["Personas con alergia específica a niacinamida (raro)"],
    },
    {
      type: "ingredient",
      keywords: ["ácido salicílico", "bha", "beta hidroxiácido"],
      ingredient: "salicylic-acid",
      description:
        "Exfoliante químico liposoluble que penetra en los poros, eliminando exceso de sebo y células muertas.",
      benefits: "Desobstruye poros, previene y trata acné, reduce puntos negros y afina textura de la piel.",
      howToUse: "Usar en concentraciones de 0.5-2%. Puede aplicarse como tónico, sérum o tratamiento localizado.",
      precautions: "Puede causar sequedad. No usar con retinoides en la misma aplicación. Precaución en embarazo.",
      goodFor: ["Piel grasa", "Acné", "Puntos negros", "Poros obstruidos"],
      notRecommendedFor: ["Piel muy seca", "Piel irritada o con heridas", "Alergia a aspirina"],
    },
    {
      type: "ingredient",
      keywords: ["aha", "alfa hidroxiácidos", "glicólico", "láctico", "mandélico"],
      ingredient: "aha",
      description:
        "Exfoliantes químicos hidrosolubles que eliminan células muertas de la superficie, revelando piel más luminosa.",
      benefits: "Mejoran textura, tono, luminosidad, manchas y líneas finas. Estimulan renovación celular.",
      howToUse:
        "Concentraciones varían según tipo (glicólico 5-10%, láctico 5-12%). Usar 1-3 veces por semana según tolerancia.",
      precautions:
        "Causan fotosensibilidad. Usar protector solar. Introducir gradualmente. No combinar con retinoides inicialmente.",
      goodFor: ["Textura irregular", "Manchas", "Piel apagada", "Líneas finas"],
      notRecommendedFor: ["Piel muy sensible", "Piel irritada", "Rosácea activa"],
    },
    {
      type: "ingredient",
      keywords: ["péptidos", "polipéptidos", "proteínas"],
      ingredient: "peptides",
      description:
        "Cadenas cortas de aminoácidos que actúan como mensajeros, estimulando funciones específicas como producción de colágeno.",
      benefits: "Mejoran firmeza, elasticidad, arrugas y pueden tener efectos calmantes o iluminadores según el tipo.",
      howToUse:
        "Aplicar mañana y/o noche. Funcionan bien en sérums y cremas. Combinar con antioxidantes para mejores resultados.",
      precautions: "Generalmente bien tolerados. Verificar formulación completa para evitar irritantes.",
      goodFor: ["Signos de envejecimiento", "Pérdida de firmeza", "Líneas de expresión"],
      notRecommendedFor: ["No hay contraindicaciones significativas"],
    },

    // Routines
    {
      type: "routine",
      keywords: ["rutina", "básica", "principiante", "comenzar", "empezar"],
      routineType: "basic",
      description:
        "Una rutina básica de skincare debe incluir los pasos fundamentales para mantener la piel limpia, hidratada y protegida.",
      steps: {
        morning: [
          {
            step: "Limpieza",
            purpose: "Eliminar impurezas acumuladas durante la noche",
            tip: "Usar un limpiador suave adecuado para tu tipo de piel",
          },
          {
            step: "Hidratación",
            purpose: "Aportar y retener humedad en la piel",
            tip: "Elegir textura según tipo de piel: gel (grasa), loción (mixta), crema (seca)",
          },
          {
            step: "Protección solar",
            purpose: "Prevenir daño solar, envejecimiento prematuro y manchas",
            tip: "Mínimo SPF 30, aplicar cantidad generosa y renovar cada 2 horas de exposición",
          },
        ],
        evening: [
          {
            step: "Limpieza",
            purpose: "Eliminar maquillaje, protector solar, contaminación y sebo",
            tip: "Doble limpieza recomendada: limpiador oleoso seguido de limpiador acuoso",
          },
          {
            step: "Hidratación",
            purpose: "Nutrir y reparar la piel durante el descanso",
            tip: "Puede ser el mismo producto de la mañana o uno más nutritivo",
          },
        ],
      },
      additionalTips: [
        "Consistencia es clave: mejor rutina simple constante que compleja esporádica",
        "Introducir productos nuevos de uno en uno para identificar reacciones",
        "Escuchar a tu piel y ajustar según necesidades (clima, estrés, hormonas)",
      ],
    },
    {
      type: "routine",
      keywords: ["rutina", "completa", "avanzada", "orden", "productos", "pasos"],
      routineType: "advanced",
      description:
        "Una rutina avanzada incorpora pasos adicionales para tratar preocupaciones específicas y maximizar resultados.",
      steps: {
        morning: [
          {
            step: "Limpieza",
            purpose: "Preparar la piel para los siguientes productos",
            tip: "Limpiador suave, no es necesario que sea espumoso",
          },
          {
            step: "Tónico",
            purpose: "Equilibrar pH, hidratar o tratar según tipo",
            tip: "Evitar tónicos con alcohol. Buscar ingredientes hidratantes o calmantes",
          },
          {
            step: "Sérum antioxidante",
            purpose: "Proteger contra radicales libres y tratar preocupaciones específicas",
            tip: "Vitamina C es excelente opción matutina. Aplicar en piel seca",
          },
          {
            step: "Contorno de ojos",
            purpose: "Tratar área delicada con productos específicos",
            tip: "Aplicar con dedo anular, con toques suaves, sin arrastrar",
          },
          {
            step: "Hidratante",
            purpose: "Sellar hidratación y fortalecer barrera cutánea",
            tip: "Ajustar textura según estación y necesidades de la piel",
          },
          {
            step: "Protector solar",
            purpose: "Protección UV indispensable",
            tip: "Último paso skincare. Esperar absorción antes de maquillaje",
          },
        ],
        evening: [
          {
            step: "Desmaquillante/Limpiador oleoso",
            purpose: "Disolver maquillaje y protector solar",
            tip: "Masajear en seco, emulsionar con agua y enjuagar",
          },
          {
            step: "Limpiador acuoso",
            purpose: "Eliminar residuos restantes",
            tip: "Usar agua tibia, nunca caliente",
          },
          {
            step: "Exfoliante",
            purpose: "Eliminar células muertas (usar 1-3 veces por semana)",
            tip: "Químicos (AHA/BHA) son más efectivos y menos agresivos que físicos",
          },
          {
            step: "Tónico",
            purpose: "Preparar para tratamientos",
            tip: "Aplicar con manos o algodón, dejar que se absorba",
          },
          {
            step: "Tratamientos activos",
            purpose: "Aplicar ingredientes potentes para preocupaciones específicas",
            tip: "Retinoides, péptidos, tratamientos específicos. No mezclar demasiados activos",
          },
          {
            step: "Contorno de ojos",
            purpose: "Nutrir y tratar área ocular",
            tip: "Puede ser el mismo de la mañana o uno más nutritivo",
          },
          {
            step: "Sérum/Aceite facial",
            purpose: "Tratamiento intensivo",
            tip: "Aceites van después de productos acuosos",
          },
          {
            step: "Hidratante/Crema de noche",
            purpose: "Sellar tratamientos y nutrir durante el descanso",
            tip: "Puede ser más rica que la de día",
          },
          {
            step: "Mascarilla (1-2 veces por semana)",
            purpose: "Tratamiento intensivo según necesidad",
            tip: "Usar después de limpieza, antes de resto de rutina",
          },
        ],
      },
      additionalTips: [
        "Esperar 30-60 segundos entre pasos para mejor absorción",
        "No es necesario usar todos los pasos diariamente",
        "Rotar activos: retinoides, exfoliantes y vitamina C en días alternos si hay sensibilidad",
        "Ajustar según estación: más ligera en verano, más nutritiva en invierno",
      ],
    },

    // Special situations
    {
      type: "special",
      keywords: ["embarazo", "embarazada", "lactancia", "amamantando"],
      situation: "pregnancy",
      description: "Durante embarazo y lactancia, ciertos ingredientes deben evitarse por seguridad del bebé.",
      avoid: [
        "Retinoides (retinol, tretinoína, adapaleno)",
        "Altas concentraciones de ácido salicílico (uso tópico localizado ocasional es generalmente aceptado)",
        "Hidroquinona",
        "Aceites esenciales en alta concentración",
        "Filtros químicos controvertidos (oxibenzona, avobenzona)",
      ],
      safe: [
        "Ácido hialurónico",
        "Niacinamida",
        "Vitamina C",
        "Péptidos",
        "Ceramidas",
        "Manteca de karité y otros emolientes naturales",
        "Filtros solares minerales (óxido de zinc, dióxido de titanio)",
      ],
      tips: [
        "Consultar siempre con médico antes de usar nuevos productos",
        "Piel puede cambiar durante embarazo: más sensible, grasa o con hiperpigmentación",
        "Protector solar es esencial para prevenir melasma (máscara del embarazo)",
        "Mantener rutina simple y consistente",
      ],
    },
    {
      type: "special",
      keywords: ["hombre", "masculina", "barba", "afeitar", "afeitado"],
      situation: "men",
      description:
        "La piel masculina tiene características particulares: generalmente más gruesa, más grasa y con necesidades específicas por afeitado.",
      characteristics: [
        "Mayor producción de sebo",
        "Poros más visibles",
        "Más propensa a imperfecciones",
        "Irritación por afeitado",
        "Envejecimiento diferente (menos arrugas finas, más líneas profundas)",
      ],
      routine: {
        basic: [
          "Limpiador específico para hombre o tipo de piel",
          "Exfoliante 1-2 veces por semana (previene pelos enquistados)",
          "Hidratante ligero no graso",
          "Protector solar diario",
          "Bálsamo post-afeitado calmante",
        ],
      },
      tips: [
        "Afeitarse después de la ducha cuando la piel está más suave",
        "Usar productos sin alcohol para evitar irritación",
        "No olvidar el cuello y contorno de barba en la rutina",
        "Exfoliar regularmente para prevenir pelos enquistados",
        "Productos multifunción pueden facilitar adherencia a la rutina",
      ],
    },

    // General questions
    {
      type: "general",
      keywords: ["orden", "productos", "aplicar", "secuencia"],
      question: "product-order",
      answer:
        "El orden correcto de aplicación es de textura más ligera a más espesa: limpiador, tónico, esencias, sérums (acuosos antes que oleosos), contorno de ojos, cremas/hidratantes, aceites, protector solar (de día). Los tratamientos específicos como retinoides o exfoliantes se aplican después del tónico. Esperar 30-60 segundos entre productos para mejor absorción.",
    },
    {
      type: "general",
      keywords: ["cuánto", "tiempo", "resultados", "ver", "efectos", "funciona"],
      question: "results-time",
      answer:
        "El tiempo para ver resultados varía según el producto e ingrediente: hidratantes (inmediato a días), exfoliantes (1-2 semanas para textura), vitamina C (4-8 semanas para luminosidad), niacinamida (4-8 semanas), retinol (12 semanas mínimo), tratamientos antimanchas (8-12 semanas). La renovación celular completa toma aproximadamente 28 días (más en pieles maduras). Consistencia es clave para resultados duraderos.",
    },
    {
      type: "general",
      keywords: ["frecuencia", "exfoliar", "exfoliación", "exfoliante"],
      question: "exfoliation-frequency",
      answer:
        "La frecuencia de exfoliación depende del tipo de piel y exfoliante: piel normal/mixta (2-3 veces por semana), piel grasa (2-3 veces), piel seca/sensible (1 vez). Exfoliantes químicos suaves pueden usarse más frecuentemente que los físicos o químicos intensos. Señales de sobreexfoliación: irritación, sensibilidad, brillo excesivo, tirantez. Siempre escuchar a la piel y ajustar según necesidad.",
    },
    {
      type: "general",
      keywords: ["mezclar", "combinar", "ingredientes", "compatibles", "incompatibles"],
      question: "ingredient-combinations",
      answer:
        "Combinaciones efectivas: Vitamina C + Vitamina E + Ácido Ferúlico (potencian antioxidantes), Niacinamida + Zinc (control sebo), Retinol + Péptidos (anti-edad). Evitar combinar: Retinol con AHA/BHA o Vitamina C (en misma aplicación), múltiples exfoliantes, demasiados activos simultáneamente. Niacinamida y Vitamina C pueden usarse juntas en formulaciones estables o en diferentes momentos del día.",
    },
    {
      type: "general",
      keywords: ["protector", "solar", "spf", "sol", "uv", "rayos"],
      question: "sunscreen",
      answer:
        "El protector solar es el producto más importante para prevenir envejecimiento prematuro y daño cutáneo. Usar SPF 30+ diariamente, incluso en días nublados o interiores (rayos UVA atraviesan ventanas). Aplicar cantidad generosa (1/4 cucharadita para rostro y cuello) y renovar cada 2 horas de exposición solar. Elegir según tipo de piel: filtros minerales para pieles sensibles, fórmulas oil-free para pieles grasas. El protector solar va como último paso de la rutina de skincare, antes del maquillaje.",
    },

    // Greetings and farewells
    {
      type: "greeting",
      keywords: ["hola", "buenos", "días", "tardes", "noches", "saludos"],
      response:
        "¡Hola! Soy Lumi, tu asistente virtual de skincare. ¿En qué puedo ayudarte hoy? Puedo recomendarte productos según tu tipo de piel, explicarte ingredientes o ayudarte a crear una rutina personalizada.",
    },
    {
      type: "farewell",
      keywords: ["gracias", "thank", "thanks", "adiós", "chao", "hasta", "luego", "bye"],
      response:
        "¡Ha sido un placer ayudarte! Si tienes más preguntas sobre skincare, no dudes en consultarme. ¡Que tengas una piel radiante y saludable!",
    },
  ]

  // Send message function
  function sendMessageToBot() {
    const message = chatInput.value.trim()
    if (message === "") return

    // Add user message to chat
    addMessage(message, "user")
    chatInput.value = ""

    // Process the message and get response
    setTimeout(() => {
      const response = getBotResponse(message)
      addMessage(response, "bot")
    }, 500)
  }

  // Add message to chat
  function addMessage(message, sender) {
    const messageElement = document.createElement("div")
    messageElement.className = `message ${sender}`
    messageElement.innerHTML = `
      <div class="message-content">
        ${message}
      </div>
    `
    chatMessages.appendChild(messageElement)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Send message on button click
  chatSendBtn.addEventListener("click", sendMessageToBot)

  // Send message on Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessageToBot()
    }
  })

  console.log("Chatbot inicializado correctamente")

  // Get bot response based on user input
  function getBotResponse(userInput) {
    userInput = userInput.toLowerCase()

    // Verificar si la pregunta está relacionada con skincare o la empresa
    if (!isSkincareRelated(userInput)) {
      return "Lo siento, soy Lumi, un asistente especializado en skincare. Solo puedo responder preguntas relacionadas con el cuidado de la piel y nuestros productos. ¿Hay algo específico sobre skincare en lo que pueda ayudarte?"
    }

    // Verificar si el usuario está seleccionando una sugerencia por número
    const suggestionNumber = extractSuggestionNumber(userInput)
    if (suggestionNumber !== null && userContext.lastSuggestions.length > 0) {
      if (suggestionNumber > 0 && suggestionNumber <= userContext.lastSuggestions.length) {
        const selectedSuggestion = userContext.lastSuggestions[suggestionNumber - 1]
        return handleSuggestionSelection(selectedSuggestion)
      } else {
        return `Lo siento, solo tengo ${userContext.lastSuggestions.length} opciones disponibles. Por favor, selecciona un número entre 1 y ${userContext.lastSuggestions.length}. También puedes preguntarme directamente sobre:
        1. Recomendaciones para tu tipo de piel
        2. Información sobre ingredientes
        3. Rutinas de skincare
        4. Consejos para problemas específicos
        5. Recomendaciones de productos`
      }
    }

    // Check for greetings first
    for (const item of skincareKnowledge) {
      if (item.type === "greeting" && containsAnyKeyword(userInput, item.keywords)) {
        userContext.conversationStage = "initial"
        return item.response
      }
    }

    // Check for farewells
    for (const item of skincareKnowledge) {
      if (item.type === "farewell" && containsAnyKeyword(userInput, item.keywords)) {
        userContext.conversationStage = "farewell"
        return item.response
      }
    }

    // DIRECT PRODUCT RECOMMENDATIONS FOR SKIN TYPES - Check this first for direct questions
    if (
      containsAnyKeyword(userInput, [
        "producto",
        "productos",
        "usar",
        "recomendación",
        "recomendaciones",
        "recomiendas",
        "recomienda",
      ])
    ) {
      // Check for specific skin types in the same question
      if (containsAnyKeyword(userInput, ["piel grasa", "grasa", "grasosa", "acné", "acne", "acneica"])) {
        userContext.skinType = "oily"
        return getDirectProductRecommendations("oily")
      } else if (containsAnyKeyword(userInput, ["piel seca", "seca", "deshidratada", "tirante"])) {
        userContext.skinType = "dry"
        return getDirectProductRecommendations("dry")
      } else if (containsAnyKeyword(userInput, ["piel mixta", "mixta", "combinada"])) {
        userContext.skinType = "combination"
        return getDirectProductRecommendations("combination")
      } else if (containsAnyKeyword(userInput, ["piel sensible", "sensible", "irritada", "irritación", "rojez"])) {
        userContext.skinType = "sensitive"
        return getDirectProductRecommendations("sensitive")
      } else if (containsAnyKeyword(userInput, ["piel normal", "normal", "equilibrada"])) {
        userContext.skinType = "normal"
        return getDirectProductRecommendations("normal")
      } else if (userContext.skinType) {
        // If we already know their skin type from previous conversation
        return getDirectProductRecommendations(userContext.skinType)
      } else {
        // Ask for skin type if not specified
        userContext.currentTopic = "ask-skin-type"
        return "Me encantaría recomendarte productos específicos. ¿Podrías decirme cuál es tu tipo de piel (seca, grasa, mixta, sensible o normal)?"
      }
    }

    // Detect skin type questions
    if (containsAnyKeyword(userInput, ["tipo de piel", "piel tipo", "qué piel tengo", "mi piel es"])) {
      userContext.currentTopic = "skin-type-detection"
      return "Para ayudarte a identificar tu tipo de piel, responde estas preguntas: ¿Cómo se siente tu piel al final del día? ¿Notas brillos, sequedad o ambos en diferentes zonas? ¿Tu piel es sensible o reactiva a productos? Con esta información podré recomendarte los productos más adecuados."
    }

    // Detect routine questions
    if (containsAnyKeyword(userInput, ["rutina", "pasos", "orden", "cómo usar"])) {
      if (userContext.skinType) {
        // If we already know their skin type, give personalized routine
        return getPersonalizedRoutine(userContext.skinType)
      } else if (containsAnyKeyword(userInput, ["piel seca", "seca", "deshidratada"])) {
        userContext.skinType = "dry"
        return getPersonalizedRoutine("dry")
      } else if (containsAnyKeyword(userInput, ["piel grasa", "grasa", "acné", "acne", "espinillas"])) {
        userContext.skinType = "oily"
        return getPersonalizedRoutine("oily")
      } else if (containsAnyKeyword(userInput, ["piel mixta", "mixta", "combinada"])) {
        userContext.skinType = "combination"
        return getPersonalizedRoutine("combination")
      } else if (containsAnyKeyword(userInput, ["piel sensible", "sensible", "irritada"])) {
        userContext.skinType = "sensitive"
        return getPersonalizedRoutine("sensitive")
      } else {
        // Ask for skin type if not specified
        userContext.currentTopic = "ask-skin-type"
        return "Me encantaría recomendarte una rutina personalizada. ¿Podrías decirme cuál es tu tipo de piel (seca, grasa, mixta, sensible o normal)? Así podré sugerirte los productos más adecuados para ti."
      }
    }

    // If we previously asked for skin type and now they're responding
    if (userContext.currentTopic === "ask-skin-type") {
      if (containsAnyKeyword(userInput, ["seca", "deshidratada"])) {
        userContext.skinType = "dry"
        userContext.currentTopic = null
        return getDirectProductRecommendations("dry")
      } else if (containsAnyKeyword(userInput, ["grasa", "acné", "acne", "espinillas", "grasosa"])) {
        userContext.skinType = "oily"
        userContext.currentTopic = null
        return getDirectProductRecommendations("oily")
      } else if (containsAnyKeyword(userInput, ["mixta", "combinada"])) {
        userContext.skinType = "combination"
        userContext.currentTopic = null
        return getDirectProductRecommendations("combination")
      } else if (containsAnyKeyword(userInput, ["sensible", "irritada"])) {
        userContext.skinType = "sensitive"
        userContext.currentTopic = null
        return getDirectProductRecommendations("sensitive")
      } else if (containsAnyKeyword(userInput, ["normal"])) {
        userContext.skinType = "normal"
        userContext.currentTopic = null
        return getDirectProductRecommendations("normal")
      }
    }

    // If we're in skin type detection mode
    if (userContext.currentTopic === "skin-type-detection") {
      // Analyze response to determine skin type
      if (containsAnyKeyword(userInput, ["brilla", "grasa", "acné", "espinillas", "puntos negros", "poros"])) {
        if (containsAnyKeyword(userInput, ["seca", "deshidratada", "tirante", "mejillas"])) {
          userContext.skinType = "combination"
          userContext.currentTopic = null
          return (
            "Basado en tu descripción, parece que tienes piel mixta o combinada. Esto significa que algunas zonas (generalmente la zona T: frente, nariz y barbilla) son más grasas, mientras que otras (como las mejillas) pueden ser normales o secas. " +
            getDirectProductRecommendations("combination")
          )
        } else {
          userContext.skinType = "oily"
          userContext.currentTopic = null
          return (
            "Basado en tu descripción, parece que tienes piel grasa. Este tipo de piel produce exceso de sebo, lo que puede causar brillos, poros dilatados y tendencia al acné. " +
            getDirectProductRecommendations("oily")
          )
        }
      } else if (containsAnyKeyword(userInput, ["seca", "deshidratada", "tirante", "escama", "descama"])) {
        userContext.skinType = "dry"
        userContext.currentTopic = null
        return (
          "Basado en tu descripción, parece que tienes piel seca. Este tipo de piel produce menos sebo de lo necesario, lo que puede causar tirantez, descamación y falta de confort. " +
          getDirectProductRecommendations("dry")
        )
      } else if (containsAnyKeyword(userInput, ["sensible", "irritada", "rojez", "arde", "pica"])) {
        userContext.skinType = "sensitive"
        userContext.currentTopic = null
        return (
          "Basado en tu descripción, parece que tienes piel sensible. Este tipo de piel reacciona fácilmente a productos, cambios ambientales o factores externos, causando rojez, irritación o molestias. " +
          getDirectProductRecommendations("sensitive")
        )
      } else {
        userContext.skinType = "normal"
        userContext.currentTopic = null
        return (
          "Basado en tu descripción, parece que tienes piel normal o equilibrada. Este tipo de piel no es ni muy grasa ni muy seca, con poros finos y buena textura. " +
          getDirectProductRecommendations("normal")
        )
      }
    }

    // Check for product recommendations (legacy path, should be caught by direct product recommendations above)
    if (
      containsAnyKeyword(userInput, [
        "recomienda",
        "recomendación",
        "sugerir",
        "sugerencia",
        "mejor producto",
        "qué usar",
        "qué producto",
      ])
    ) {
      // If asking about specific skin type
      if (containsAnyKeyword(userInput, ["piel seca", "seca", "deshidratada"])) {
        return getDirectProductRecommendations("dry")
      } else if (containsAnyKeyword(userInput, ["piel grasa", "grasa", "acné", "acne", "espinillas"])) {
        return getDirectProductRecommendations("oily")
      } else if (containsAnyKeyword(userInput, ["piel mixta", "mixta", "combinada"])) {
        return getDirectProductRecommendations("combination")
      } else if (containsAnyKeyword(userInput, ["piel sensible", "sensible", "irritada"])) {
        return getDirectProductRecommendations("sensitive")
      } else if (containsAnyKeyword(userInput, ["piel normal", "normal"])) {
        return getDirectProductRecommendations("normal")
      }

      // If asking about specific concerns
      if (containsAnyKeyword(userInput, ["arrugas", "líneas", "edad", "envejecimiento", "flacidez", "anti-edad"])) {
        return getProductRecommendationsForConcern("aging")
      } else if (containsAnyKeyword(userInput, ["acné", "espinillas", "granos", "puntos negros"])) {
        return getProductRecommendationsForConcern("acne")
      } else if (containsAnyKeyword(userInput, ["manchas", "hiperpigmentación", "melasma"])) {
        return getProductRecommendationsForConcern("hyperpigmentation")
      } else if (containsAnyKeyword(userInput, ["poros", "dilatados", "abiertos"])) {
        return getProductRecommendationsForConcern("pores")
      } else if (containsAnyKeyword(userInput, ["rojez", "rosácea", "enrojecimiento"])) {
        return getProductRecommendationsForConcern("redness")
      }

      // If we know their skin type from previous conversation
      if (userContext.skinType) {
        return getDirectProductRecommendations(userContext.skinType)
      } else {
        // Ask for skin type if not specified
        userContext.currentTopic = "ask-skin-type"
        return "Me encantaría recomendarte productos específicos. ¿Podrías decirme cuál es tu tipo de piel (seca, grasa, mixta, sensible o normal)? También me ayudaría saber si tienes alguna preocupación específica como arrugas, acné, manchas, etc."
      }
    }

    // Check for ingredient information
    for (const item of skincareKnowledge) {
      if (item.type === "ingredient" && containsAnyKeyword(userInput, item.keywords)) {
        return `**${capitalizeFirstLetter(item.ingredient)}**: ${item.description}\n\n**Beneficios**: ${item.benefits}\n\n**Cómo usar**: ${item.howToUse}\n\n**Precauciones**: ${item.precautions}`
      }
    }

    // Check for specific concerns
    for (const item of skincareKnowledge) {
      if (item.type === "concern" && containsAnyKeyword(userInput, item.keywords)) {
        userContext.concerns.push(item.concern)
        return `**${capitalizeFirstLetter(item.concern)}**: ${item.description}\n\n**Causas**: ${item.causes}\n\n**Solución**: ${item.solution}\n\n**Ingredientes clave**: ${item.keyIngredients.join(", ")}\n\n**Productos recomendados**: ${getProductNamesById(item.recommendedProducts).join(", ")}\n\n**Consejos**: ${item.tips}`
      }
    }

    // Check for special situations
    for (const item of skincareKnowledge) {
      if (item.type === "special" && containsAnyKeyword(userInput, item.keywords)) {
        if (item.situation === "pregnancy") {
          return `**Skincare durante embarazo y lactancia**:\n\n${item.description}\n\n**Ingredientes a evitar**:\n- ${item.avoid.join("\n- ")}\n\n**Ingredientes seguros**:\n- ${item.safe.join("\n- ")}\n\n**Consejos**:\n- ${item.tips.join("\n- ")}`
        } else if (item.situation === "men") {
          return `**Skincare masculino**:\n\n${item.description}\n\n**Características de la piel masculina**:\n- ${item.characteristics.join("\n- ")}\n\n**Rutina básica recomendada**:\n- ${item.routine.basic.join("\n- ")}\n\n**Consejos**:\n- ${item.tips.join("\n- ")}`
        }
      }
    }

    // Check for general questions
    for (const item of skincareKnowledge) {
      if (item.type === "general" && containsAnyKeyword(userInput, item.keywords)) {
        return item.answer
      }
    }

    // If no specific match, try to find partial matches in knowledge base
    for (const knowledge of skincareKnowledge) {
      for (const keyword of knowledge.keywords || []) {
        if (userInput.includes(keyword)) {
          if (knowledge.type === "skin-type") {
            userContext.skinType = knowledge.skinType
            return `${knowledge.characteristics} ${knowledge.causes} ${knowledge.needs}\n\n**Rutina recomendada**:\n\n**Mañana**:\n- ${knowledge.routine.morning.join("\n- ")}\n\n**Noche**:\n- ${knowledge.routine.evening.join("\n- ")}\n\n**Productos recomendados**: ${getProductNamesById(knowledge.recommendedProducts).join(", ")}`
          } else if (knowledge.response) {
            return knowledge.response
          }
        }
      }
    }

    // Default response if no match is found
    const suggestions = [
      "Recomendaciones para tu tipo de piel",
      "Información sobre ingredientes (retinol, vitamina C, ácido hialurónico, etc.)",
      "Rutinas de skincare básicas o avanzadas",
      "Consejos para problemas específicos (acné, arrugas, manchas, etc.)",
      "Recomendaciones de productos",
    ]

    // Guardar las sugerencias en el contexto del usuario
    userContext.lastSuggestions = suggestions

    return "No tengo información específica sobre eso. ¿Puedo ayudarte con alguna de estas opciones?\n\n1. Recomendaciones para tu tipo de piel\n2. Información sobre ingredientes (retinol, vitamina C, ácido hialurónico, etc.)\n3. Rutinas de skincare básicas o avanzadas\n4. Consejos para problemas específicos (acné, arrugas, manchas, etc.)\n5. Recomendaciones de productos"
  }

  // Función para verificar si la pregunta está relacionada con skincare o la empresa
  function isSkincareRelated(userInput) {
    const skincareKeywords = [
      "piel",
      "skin",
      "cara",
      "rostro",
      "cutis",
      "derma",
      "dermis",
      "epidermis",
      "crema",
      "serum",
      "limpiador",
      "tónico",
      "mascarilla",
      "exfoliante",
      "hidratante",
      "acné",
      "arrugas",
      "manchas",
      "poros",
      "espinillas",
      "puntos negros",
      "rojez",
      "seca",
      "grasa",
      "mixta",
      "sensible",
      "normal",
      "deshidratada",
      "tirante",
      "retinol",
      "vitamina",
      "ácido",
      "hialurónico",
      "niacinamida",
      "salicílico",
      "glicólico",
      "rutina",
      "skincare",
      "cuidado",
      "tratamiento",
      "producto",
      "ingrediente",
      "lumiskin",
      "lumi",
      "comprar",
      "precio",
      "tienda",
      "envío",
      "pedido",
      "producto",
    ]

    return skincareKeywords.some((keyword) => userInput.includes(keyword))
  }

  // Función para extraer el número de sugerencia del input del usuario
  function extractSuggestionNumber(userInput) {
    // Buscar patrones como "1", "1.", "opción 1", "uno", etc.

    // Patrón para números arábigos (1, 2, 3...)
    const arabicMatch = userInput.match(/\b([1-9])\b|\b([1-9])\.|\bopción\s+([1-9])\b|\bopcion\s+([1-9])\b/)
    if (arabicMatch) {
      const number = arabicMatch[1] || arabicMatch[2] || arabicMatch[3] || arabicMatch[4]
      return Number.parseInt(number)
    }

    // Patrón para números escritos en texto (uno, dos, tres...)
    const textNumbers = {
      uno: 1,
      dos: 2,
      tres: 3,
      cuatro: 4,
      cinco: 5,
      seis: 6,
      siete: 7,
      ocho: 8,
      nueve: 9,
    }

    for (const [text, number] of Object.entries(textNumbers)) {
      if (userInput.includes(text)) {
        return number
      }
    }

    return null
  }

  // Función para manejar la selección de sugerencias
  function handleSuggestionSelection(suggestion) {
    if (suggestion.includes("tipo de piel")) {
      userContext.currentTopic = "ask-skin-type"
      return "¿Podrías decirme cuál es tu tipo de piel (seca, grasa, mixta, sensible o normal)? Así podré ofrecerte recomendaciones personalizadas."
    } else if (suggestion.includes("ingredientes")) {
      return "¿Sobre qué ingrediente te gustaría saber más? Puedo informarte sobre retinol, vitamina C, ácido hialurónico, niacinamida, ácido salicílico, AHAs, péptidos, entre otros."
    } else if (suggestion.includes("rutinas")) {
      return "Puedo ayudarte con rutinas de skincare básicas o avanzadas. ¿Prefieres una rutina simple para principiantes o una más completa con múltiples pasos?"
    } else if (suggestion.includes("problemas específicos")) {
      return "¿Qué problema específico te preocupa? Puedo ayudarte con acné, arrugas, manchas, poros dilatados, rojez, entre otros."
    } else if (suggestion.includes("recomendaciones de productos")) {
      userContext.currentTopic = "ask-skin-type"
      return "Para recomendarte los productos más adecuados, necesito saber tu tipo de piel. ¿Es seca, grasa, mixta, sensible o normal?"
    } else {
      return "No entendí tu selección. ¿Podrías reformular tu pregunta?"
    }
  }

  // Helper function to check if the user input contains any of the keywords
  function containsAnyKeyword(userInput, keywords) {
    return keywords.some((keyword) => userInput.includes(keyword))
  }

  // Helper function to get personalized routine based on skin type
  function getPersonalizedRoutine(skinType) {
    let routine = ""
    switch (skinType) {
      case "oily":
        routine = "**Rutina recomendada para piel grasa:**\n\n"
        routine += "**Mañana:**\n"
        routine += "- Limpiador con ácido salicílico\n"
        routine += "- Tónico astringente suave\n"
        routine += "- Sérum ligero con niacinamida\n"
        routine += "- Hidratante en gel o fluido\n"
        routine += "- Protector solar oil-free\n\n"
        routine += "**Noche:**\n"
        routine += "- Limpiador espumoso o con ácido salicílico\n"
        routine += "- Tónico exfoliante (con AHA/BHA)\n"
        routine += "- Tratamiento para acné (si es necesario)\n"
        routine += "- Hidratante ligero\n"
        routine += "- Mascarilla de arcilla (1-2 veces por semana)\n"
        break
      case "dry":
        routine = "**Rutina recomendada para piel seca:**\n\n"
        routine += "**Mañana:**\n"
        routine += "- Limpiador suave sin sulfatos\n"
        routine += "- Tónico hidratante sin alcohol\n"
        routine += "- Sérum de ácido hialurónico\n"
        routine += "- Crema hidratante rica\n"
        routine += "- Protector solar\n\n"
        routine += "**Noche:**\n"
        routine += "- Limpiador suave o aceite limpiador\n"
        routine += "- Tónico hidratante\n"
        routine += "- Sérum hidratante\n"
        routine += "- Aceite facial o crema nutritiva\n"
        routine += "- Mascarilla hidratante (1-2 veces por semana)\n"
        break
      case "combination":
        routine = "**Rutina recomendada para piel mixta:**\n\n"
        routine += "**Mañana:**\n"
        routine += "- Limpiador suave equilibrante\n"
        routine += "- Tónico sin alcohol\n"
        routine += "- Sérum con niacinamida\n"
        routine += "- Hidratante ligero (zona T) y más rico (mejillas)\n"
        routine += "- Protector solar oil-free\n\n"
        routine += "**Noche:**\n"
        routine += "- Limpiador adecuado para piel mixta\n"
        routine += "- Tónico equilibrante\n"
        routine += "- Tratamientos específicos por zonas\n"
        routine += "- Hidratante ligero o medio\n"
        routine += "- Mascarillas multimasking (diferentes para cada zona, 1 vez por semana)\n"
        break
      case "sensitive":
        routine = "**Rutina recomendada para piel sensible:**\n\n"
        routine += "**Mañana:**\n"
        routine += "- Limpiador muy suave sin sulfatos\n"
        routine += "- Agua termal o tónico calmante\n"
        routine += "- Sérum calmante (con centella asiática, alantoína o niacinamida)\n"
        routine += "- Crema hidratante para piel sensible\n"
        routine += "- Protector solar mineral\n\n"
        routine += "**Noche:**\n"
        routine += "- Limpiador suave o leche limpiadora\n"
        routine += "- Agua termal\n"
        routine += "- Sérum reparador de barrera\n"
        routine += "- Crema calmante\n"
        routine += "- Mascarilla calmante (ocasionalmente)\n"
        break
      case "normal":
        routine = "**Rutina recomendada para piel normal:**\n\n"
        routine += "**Mañana:**\n"
        routine += "- Limpiador suave\n"
        routine += "- Tónico hidratante\n"
        routine += "- Sérum antioxidante\n"
        routine += "- Hidratante ligero\n"
        routine += "- Protector solar\n\n"
        routine += "**Noche:**\n"
        routine += "- Limpiador adecuado\n"
        routine += "- Tónico\n"
        routine += "- Sérum específico según preocupación (antioxidante, anti-edad)\n"
        routine += "- Crema hidratante\n"
        routine += "- Exfoliante suave (1-2 veces por semana)\n"
        break
      default:
        routine = "Lo siento, no tengo una rutina específica para ese tipo de piel."
    }
    return routine
  }

  // Helper function to get product recommendations for a specific concern
  function getProductRecommendationsForConcern(concern) {
    let recommendations = ""
    switch (concern) {
      case "aging":
        recommendations = "**Productos recomendados para el envejecimiento:**\n\n"
        recommendations += "- Ácido Hialurónico Hidratante \n"
        recommendations += "- Crema Antiarrugas \n"
        recommendations += "- Contorno de Ojos \n"
        break
      case "acne":
        recommendations = "**Productos recomendados para el acné:**\n\n"
        recommendations += "- Serum de Niacinamida 10% \n"
        recommendations += "- Tratamiento Anti-Acné \n"
        recommendations += "- Tónico Exfoliante \n"
        recommendations += "- Mascarilla de Arcilla Purificante \n"
        break
      case "hyperpigmentation":
        recommendations = "**Productos recomendados para la hiperpigmentación:**\n\n"
        recommendations += "- Serum de Niacinamida 10% \n"
        recommendations += "- Tónico Exfoliante \n"
        recommendations += "- Protector Solar SPF 50 \n"
        recommendations += "- Exfoliante Facial Enzimático \n"
        break
      case "pores":
        recommendations = "**Productos recomendados para los poros dilatados:**\n\n"
        recommendations += "- Serum de Niacinamida 10% \n"
        recommendations += "- Tónico Exfoliante \n"
        recommendations += "- Mascarilla de Arcilla Purificante \n"
        break
      case "redness":
        recommendations = "**Productos recomendados para la rojez:**\n\n"
        recommendations += "- Limpiador Facial Suave \n"
        recommendations += "- Ácido Hialurónico Hidratante \n"
        break
      default:
        recommendations = "Lo siento, no tengo recomendaciones específicas para esa preocupación."
    }
    return recommendations
  }

  // Añadir esta nueva función para recomendaciones directas de productos
  function getDirectProductRecommendations(skinType) {
    let response = ""

    switch (skinType) {
      case "oily":
        response = "**Productos recomendados para piel grasa:**\n\n"
        response +=
          "1. **Limpiador Facial**: El **Limpiador Facial Suave** es ideal para limpiar sin resecar, o el **Tónico Exfoliante** que contiene ácidos que ayudan a controlar el exceso de sebo.\n\n"
        response +=
          "2. **Sérum**: El **Serum de Niacinamida 10%** es perfecto para piel grasa ya que regula la producción de sebo, reduce la apariencia de los poros y mejora el tono de la piel.\n\n"
        response +=
          "3. **Tratamiento**: El **Tratamiento Anti-Acné** combate el acné y previene nuevas erupciones, ideal para zonas problemáticas.\n\n"
        response +=
          "4. **Hidratante**: La **Crema Hidratante Ligera** proporciona hidratación sin sensación grasa, perfecta para pieles que producen exceso de sebo.\n\n"
        response +=
          "5. **Mascarilla**: La **Mascarilla de Arcilla Purificante** es excelente para usar 1-2 veces por semana para absorber el exceso de grasa y purificar los poros.\n\n"
        response +=
          "¿Te gustaría más información sobre alguno de estos productos o sobre cómo incorporarlos en tu rutina diaria?"
        break

      case "dry":
        response = "**Productos recomendados para piel seca:**\n\n"
        response +=
          "1. **Limpiador Facial**: El **Limpiador Facial Suave** es perfecto para pieles secas ya que limpia sin eliminar los aceites naturales de la piel.\n\n"
        response +=
          "2. **Sérum**: El **Ácido Hialurónico Hidratante** proporciona hidratación intensa y ayuda a retener la humedad en la piel.\n\n"
        response +=
          "3. **Hidratante**: La **Crema Hidratante Ligera** o para casos más severos, el **Aceite Facial Nutritivo** que proporciona nutrición profunda.\n\n"
        response +=
          "4. **Tratamiento**: La **Crema Antiarrugas** contiene ingredientes hidratantes y antienvejecimiento, ideal para pieles secas que tienden a mostrar líneas finas.\n\n"
        response += "¿Necesitas más detalles sobre alguno de estos productos o cómo usarlos en tu rutina diaria?"
        break

      case "combination":
        response = "**Productos recomendados para piel mixta:**\n\n"
        response +=
          "1. **Limpiador Facial**: El **Limpiador Facial Suave** equilibra la piel sin resecar las zonas secas ni estimular más producción de grasa.\n\n"
        response += "2. **Tónico**: El **Tónico Exfoliante** ayuda a equilibrar la producción de sebo en la zona T.\n\n"
        response +=
          "3. **Sérum**: El **Serum de Niacinamida 10%** es ideal para pieles mixtas ya que regula el sebo en zonas grasas mientras calma las áreas más secas.\n\n"
        response +=
          "4. **Hidratante**: La **Crema Hidratante Ligera** proporciona hidratación equilibrada para todo el rostro.\n\n"
        response +=
          "5. **Mascarilla**: Puedes usar la **Mascarilla de Arcilla Purificante** en la zona T y otro producto más hidratante en las mejillas.\n\n"
        response +=
          "¿Te gustaría saber más sobre alguno de estos productos o cómo adaptar tu rutina para tu piel mixta?"
        break

      case "sensitive":
        response = "**Productos recomendados para piel sensible:**\n\n"
        response +=
          "1. **Limpiador Facial**: El **Limpiador Facial Suave** está formulado sin irritantes y es perfecto para pieles sensibles.\n\n"
        response +=
          "2. **Exfoliante**: El **Exfoliante Facial Enzimático** ofrece una exfoliación suave sin irritar la piel.\n\n"
        response +=
          "3. **Hidratante**: La **Crema Hidratante Ligera** o el **Ácido Hialurónico Hidratante** proporcionan hidratación sin ingredientes irritantes.\n\n"
        response +=
          "4. **Protección**: El **Protector Solar SPF 50** protege la piel sensible de los daños solares que pueden empeorar la irritación.\n\n"
        response +=
          "¿Quieres más información sobre estos productos o consejos específicos para cuidar tu piel sensible?"
        break

      case "normal":
        response = "**Productos recomendados para piel normal:**\n\n"
        response +=
          "1. **Limpiador Facial**: El **Limpiador Facial Suave** mantiene el equilibrio natural de la piel.\n\n"
        response +=
          "2. **Sérum**: El **Ácido Hialurónico Hidratante** o el **Serum de Niacinamida 10%** son excelentes para mantener la piel hidratada y saludable.\n\n"
        response +=
          "3. **Hidratante**: La **Crema Hidratante Ligera** proporciona la hidratación justa que necesita tu piel.\n\n"
        response +=
          "4. **Tratamiento**: La **Crema Antiarrugas** puede usarse preventivamente para mantener la piel joven.\n\n"
        response +=
          "5. **Protección**: El **Protector Solar SPF 50** es esencial para prevenir el envejecimiento prematuro y mantener la piel saludable.\n\n"
        response += "¿Hay algún producto específico sobre el que te gustaría más información?"
        break

      default:
        response =
          "Lo siento, no tengo recomendaciones específicas para ese tipo de piel. ¿Puedes especificar si tu piel es seca, grasa, mixta, sensible o normal?"
    }

    return response
  }

  // Helper function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Helper function to get product names by their IDs
  function getProductNamesById(productIds) {
    return productIds.map((id) => {
      const product = products.find((p) => p.id === id)
      return product ? product.name : "Producto no encontrado"
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initPage)

// Initialize chatbot
initChatbot()

