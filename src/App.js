import React from "react";
import Cart from './Cart';
import NavBar from './NavBar';
// import * as firebase from 'firebase';
// import firebase from 'firebase/app';   
import firebase from 'firebase/app';

import '@firebase/firestore'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
         products: [],
         loading: true
    }

    this.db = firebase.firestore()
}

  componentDidMount() {
    // firebase
    // .firestore()
    // .collection('products')
    // .get()           //it returns a promise
    // .then((snapshot) => {
    //   console.log(snapshot);

    //   snapshot.docs.map((doc) => {
    //     console.log(doc.data);
    //   });

    //   const products = snapshot.docs.map((doc) => {
    //     const data = doc.data();

    //     data['id'] = doc.id;
    //     return data();
    //   });

    //   this.setState({
    //     products,          //same as products: products
    //     loading: false
    //   })
    // })

    this.db
      .collection('products')
      .onSnapshot((snapshot) => {       //onsnapshot is fired automatically whenever change is made in database
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data);
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        });

        this.setState({
          products,          //same as products: products
          loading: false
        })
      
      })
        
  }

  handleIncreaseQuantity = (product) => {
      const { products } = this.state;
      const index = products.indexOf(product);

      // products[index].qty += 1;
      // this.setState({
      //     products: products        //or simply right products both mean same
      // });

      const docRef = this.db.collection("products").doc(products[index].id);

      docRef
        .update({ qty: products[index].qty + 1 })
        .then(() => {
          console.log("Document updated sucessfully");
        })
        .catch(error => {
          console.log(error);
        });

  }

  handleDecreaseQuantity = (product) =>{
      const { products } = this.state;
      const index = products.indexOf(product);
      
      if(products[index].qty == 0){
          return;
      }

      // products[index].qty -= 1;
      // this.setState({
      //     products: products        //or simply right products both mean same
      // });

      const docRef = this.db.collection("products").doc(products[index].id);

      docRef
        .update({ qty: products[index].qty - 1 })
        .then(() => {
          console.log("Document updated sucessfully");
        })
        .catch(error => {
          console.log(error);
        });

  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted sucessfully");
      })
      .catch(err => {
        console.log(err);
      });

    // const items = products.filter((item) => item.id !== id);     //this will return an array
    // this.setState({
    //     products: items
    // });
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
      console.log('cartTotal: ', cartTotal);
    });

    return cartTotal;
  }

  addProduct = () => {
    this.db
    .collection('products')
    .add({
      img: '',
      price: 900,
      qty: 3,
      title: 'washing machine'
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })

    .catch((err) => {
      console.log('Error: ', err);
    })
  }

  render(){
    const { products,loading } = this.state;
    return (
      <div className="App">
        <NavBar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20, fontSize: 20}}> Add a Product </button> */}
        <Cart 
          products= {products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onHandleDeleteProduct={this.handleDeleteProduct}
        />

        {loading && <h1> Loading Products</h1>}
        <div style= { {padding: 10 ,fontSize: 20} }>
          TOTAL: {this.getCartTotal()} 
        </div>
      </div>
    );
    }
}



export default App;



    // "prod_start": "NODE_ENV=production nodemon index.js",