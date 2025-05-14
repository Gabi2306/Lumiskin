import { products, getCategoryName } from "./products.js"
import { addToCart } from "./cart.js"

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
              <div class="product-price">${(product.price/1000).toFixed(3)}$</div>
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

// Parse URL parameters and apply filters
function applyUrlFilters() {
  const urlParams = new URLSearchParams(window.location.search)
  const categoryParam = urlParams.get('category')
  
  if (categoryParam) {
    // Uncheck "all" checkbox
    const allCategoryCheckbox = document.querySelector('input[name="category"][value="all"]')
    if (allCategoryCheckbox) {
      allCategoryCheckbox.checked = false
    }
    
    // Check the specific category checkbox
    const categoryCheckbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`)
    if (categoryCheckbox) {
      categoryCheckbox.checked = true
      
      // Apply filters immediately
      filterProducts()
    }
  }
}

// Initialize catalogue page
function initCataloguePage() {
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
      priceValue.textContent = `${(priceRange.value/1000).toFixed(3)}$`
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
  
  // Apply filters from URL parameters
  applyUrlFilters()
}

// Exportar funciones
export { renderProducts, filterProducts, initCataloguePage }