class Product {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Component {
  constructor(hookId) {
    this.hookId = hookId;
  }

  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) rootElement.className = cssClass;
    if (attributes) rootElement.setAttribute(attributes.name, attributes.value);
    document.getElementById(this.hookId).appendChild(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, hookId) {
    super(hookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  renderItem() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
                  <div>
                      <img src=${this.product.imageURL} alt=${this.product.title}></img>
                      <div class="product-item__content">
                          <h2>${this.product.title}</h2>
                          <h3>\$${this.product.price}</h3>
                          <p>${this.product.description}</p>
                          <button> Add to Cart </button>
                      </div>
                  </div>
                  `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(hookId) {
    super(hookId);
  }

  get totalAmount() {
    return this.items.reduce((pVal, curItem) => pVal + curItem.price, 0);
  }

  addProduct(product) {
    this.items.push(product);
    this.totalAmountEl.innerHTML = `<h2>Total Cost: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  orderProducts(){
      console.log("Order Placed");
      console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>Total Cost: \$${this.totalAmount}</h2>
        <button>Place Order</button>
        `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", () => this.orderProducts());
    this.totalAmountEl = cartEl.querySelector("h2");
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "Pillow",
      "https://images-na.ssl-images-amazon.com/images/I/61-Th9Ai7-L._SL1000_.jpg",
      20.0,
      "A soft pillow"
    ),

    new Product(
      "Toy Bike",
      "https://4.imimg.com/data4/QX/SH/MY-3932909/bike-toy-500x500.jpg",
      5.0,
      "Metallic bike toy"
    ),
    new Product(
      "Table",
      "https://www.ikea.com/in/en/images/products/taerendoe-table__0737362_PE741023_S5.JPG",
      15.0,
      "A nice wooden table"
    ),
  ];

  constructor(hookId) {
    super(hookId);
  }

  render() {
    const prodList = this.createRootElement(
      "ul",
      "product-list",
      new ElementAttribute("id", "prod-list")
    );
    for (const product of this.products) {
      const prodItem = new ProductItem(product, "prod-list");
      prodItem.renderItem();
    }
  }
}

class Shopping {
  render() {
    this.cart = new ShoppingCart("app");
    this.cart.render();
    this.productList = new ProductList("app");
    this.productList.render();
  }
}

class App {
  static cart;
  static init() {
    const shopping = new Shopping();
    shopping.render();
    this.cart = shopping.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
