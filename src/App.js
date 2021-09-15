import React from "react";
import Cart from './Cart';
import NavBar from './NavBar';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products: [
            {
              price: 1000,
              title: 'Watch',
              qty: 1,
              img: '',
              id: 1 
            },
            {
              price: 1000,
              title: 'Mobile Phone',
              qty: 10,
              img: '', 
              id: 2
            },
            {
              price: 1000,
              title: 'Laptop',
              qty: 4,
              img: '',
              id: 3
            }
        ] 
    }
}

  handleIncreaseQuantity = (product) => {
      const { products } = this.state;
      const index = products.indexOf(product);

      products[index].qty += 1;
      this.setState({
          products: products        //or simply right products both mean same
      });

  }

  handleDecreaseQuantity = (product) =>{
      const { products } = this.state;
      const index = products.indexOf(product);
      
      if(products[index].qty == 0){
          return;
      }
      products[index].qty -= 1;
      this.setState({
          products: products        //or simply right products both mean same
      });

  }

  handleDeleteProduct = (id) => {
      const { products } = this.state;

      const items = products.filter((item) => item.id !== id);     //this will return an array
      this.setState({
          products: items
      });
  }

  getCartCount = () =>{
    const {products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });
    
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });

    return cartTotal;
  }

  render(){
    const { products } = this.state;
    return (
      <div className="App">
        <NavBar 
          count={this.getCartCount()}
        />
        <Cart 
          products= {products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onHandleDeleteProduct={this.handleDeleteProduct}
        />

        <div style= { {padding: 10 ,fontSize: 20} }>
          TOTAL: {this.getCartTotal()} 
        </div>
      </div>
    );
    }
}



export default App;



    // "prod_start": "NODE_ENV=production nodemon index.js",