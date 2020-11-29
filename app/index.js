// Product
class Product {
    constructor(name, price, year, description, image) {
        this.id = Math.random()
        this.name = name
        this.price = price
        this.year = year
        this.description = description
        this.image = image
    }
}

// User Interface
const ui = new UI

// DOM
const productForm = document.getElementById('productForm')
productForm.addEventListener('submit', setNewProduct)

const productImage = document.getElementById('productImage')
    let image
    productImage.addEventListener('change', evt => {
        let file = evt.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => image = reader.result
        reader.onerror = err => console.error(err)
    })

function setNewProduct(evt) {
    evt.preventDefault()
    const productName = document.getElementById('productName').value
    const productPrice = document.getElementById('productPrice').value
    const productYear = document.getElementById('productYear').value
    const productDescription = document.getElementById('productDescription').value

    const product = new Product(productName, productPrice, productYear, productDescription, image)
    ui.addProduct(product)
}

const productList = document.getElementById('productslist')
productList.addEventListener('click', evt => {
    ui.deleteProduct(evt.target)
    ui.updateProduct(evt.target)
})

// Render products list
ui.renderProducts()
