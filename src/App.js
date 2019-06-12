import React from 'react';
import './App.css';
import cart from './cart'
import shop from './shop'
import ShoppingItem from './item-component'
import { tsInferType } from '@babel/types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: cart.items,
      shop: shop.items,
      selected: {...shop.items[0], quant: 1},
      total: 0
    };

    this.handleonadd = this.handleonadd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const newtotal = this.calcTotal(this.state.cart)
    this.setState({total: newtotal})
  }

  calcTotal(cart) {
    let newtotal = 0


    for(let i = 0; i < cart.length; i++) {

      newtotal += parseInt(cart[i].cost) * parseInt(cart[i].quant)
    }

    return newtotal
  }

  handleonadd() {
    if (this.state.shop.length > 0) {
      const newshop = this.state.shop.filter(item => 
        item.key !== this.state.selected.key
      )
      console.log(this.state.selected)
      const newcart = [...this.state.cart, this.state.selected]

      const newtotal = this.calcTotal(newcart)

      this.setState({
        cart: [...newcart],
        shop: [
          ...newshop
        ],
        selected: {...newshop[0], quant: 1},
        total: newtotal
      })
    }
    
  }

  handleondelete(cartitem) {
    const newcart = this.state.cart.filter(item => 
      item.key !== cartitem.key
    )
    const newshop = [...this.state.shop, cartitem]

    const newtotal = this.calcTotal(newcart)

    this.setState({
      cart: [...newcart],
      shop: [
        ...newshop
      ],
      selected: {...newshop[0], quant: 1},
      total: newtotal
    })
  }

 /* handleplus(item) {
    const cart = this.state.cart.filter(item => 
      item.key !== item.key
    )

    const newitem = {
      ...item,
      quant: item.quant + 1
    }

    newcart = [
      ...cart,
      newitem
    ]
    this.setState({
      cart: 

    })
  }

  handleminus(item) {

  }*/

  handleChange = (e) => {
    if (e.target.value !== undefined) {
      this.setState({selected: e.target.value})
    } 
  }

  render() {

    const shopping_items = this.state.cart.map(item => 
      <ShoppingItem 
        shopitem = {item}
        handledel={this.handleondelete.bind(this)}
        /*haleleplus={this.handleplus.bind(this)}
        handlemminus={this.handleminus.bind(this)}*/
        />
      )
    
      const items_in_shop = this.state.shop.map(item => {
        const itemval = {
          ...item,
          quant: 1
        }
        return(
          <option value={itemval}>{itemval.productname}</option>
        );
      })
        

    return (
      <div className="App">
        <div className="ItemContainer">
          {shopping_items}
          <div>
           Total: {this.state.total}$
          </div>
          <select value={this.state.value} onChange={() => this.handleChange()}>
            {items_in_shop}
          </select>
          <button onClick={() => this.handleonadd()}>Add to Shoppingcart</button>
        </div>
      </div>
    );
  }
  
}

export default App;
