class UI {
    constructor(){
        this.form = document.getElementById('productForm')
        this.productsListSection = document.getElementById('productslist')
    }

    cleanForm = () => this.form.reset()

    showMessage = (section, message = '', messageType = 'success') => {
        if(section){
            section.innerHTML = ''
            section.innerHTML = `
                <div class="alert alert-${messageType}">
                    <h6 class="m-0 text-center">${message}</h6>
                </div>
            `
            setTimeout(() => {
                section.innerHTML = ''
            }, 3000)
        }
        else console.error('Section parameter is required')
    }

    renderProducts = () => {
        const localProducts = JSON.parse(localStorage.getItem('products'))

        let template = ''
        if(localProducts && localProducts.length > 0){
            this.productsListSection.innerHTML = ''

            localProducts.map(product =>{
                const { id, name, price, year, description, image } = product
                template += `
                    <div class="card bg-ligth mt-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-7 col-sm-6 col-md-8">
                                    <div>
                                        <h6><strong>Name: </strong>${name}</h6>
                                        <h6><strong>Price: </strong>${price}</h6>
                                        <h6><strong>Year: </strong>${year}</h6>
                                        <p class="mb-0"><strong>Description: </strong>${description}</p>
                                    </div>
                                </div>
                                <div class="col-5 col-sm-6 col-md-4 justify-content-center">
                                    <img loading="lazy" src="${image}" alt="img" class="img-thumbnail">
                                </div>
                            </div>
                            <div class="row">
                                <div class="mt-2 p-1">
                                    <button class="btn btn-danger m-1" name="delete" id="${id}">Delete</button>
                                    <button class="btn btn-warning m-1 text-white" name="update" id="${id}">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            })

            this.productsListSection.innerHTML = template
        }
        else{
            this.productsListSection.innerHTML = ''
            template = `
                <div class="alert alert-warning mx-5">
                    <h3 class="text-center">No are products</h3>
                </div>
            `
            this.productsListSection.innerHTML = template
        }
    }

    // CRUD
    addProduct = product => {
        const { name, price, year, description, image } = product
        const messageSection = document.getElementById('message')

        if( name && name.length > 0 &&
            price && price.length > 0 &&
            year && year.length > 0 &&
            description && description.length > 0 &&
            image && image.length > 0
        ){
            const localProducts = JSON.parse(localStorage.getItem('products'))

            let products
            if(localProducts && localProducts.length > 0){
                products = [...localProducts, product]
            }
            else products = [product]

            localStorage.setItem('products', JSON.stringify(products))
            this.renderProducts()
            this.cleanForm()

            this.showMessage(messageSection, 'Product added')
        }
        else this.showMessage(messageSection, 'All fields are required', 'danger')
    }

    deleteProduct = (button, id, noMessage = false) => {
        if(id || button && button.name === 'delete'){
            const productId = id || button.id
            const localProducts = JSON.parse(localStorage.getItem('products'))
            const products = localProducts.filter(product => product.id != productId)
            localStorage.setItem('products', JSON.stringify(products))

            this.renderProducts()

            const messageSection = document.getElementById('messageList')
            if(!noMessage) this.showMessage(messageSection, 'Product deleted')
        }
    }

    updateProduct = (button, id) => {
        if(id || button && button.name === 'update'){
            const productId = id || button.id
            const localProducts = JSON.parse(localStorage.getItem('products'))
            const product = localProducts.filter(product => product.id == productId)[0]

            const { name, price, year, description } = product

            document.getElementById('productName').value = name
            document.getElementById('productPrice').value = price
            document.getElementById('productYear').value = year
            document.getElementById('productDescription').value = description

            this.form.addEventListener('submit', e => {
                this.deleteProduct(null, productId, true)
            })
        }
    }
}