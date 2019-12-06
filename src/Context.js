import React, { Component } from 'react';
import{storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();



class ProductProvider extends Component {
    state={
        Products:[],
        detailProduct:detailProduct,
        cart :[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts=()=>{
        let temProducts=[];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            temProducts =[...temProducts, singleItem];
        });
        this.setState(()=> {
            return {Products:temProducts};
        });
    }
    getItem= id => {
    const product = this.state.Products.find(item => item.id === id);
    return product;
    }
    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }
    addToCart = id => {
            let Products = [...this.state.Products];
            const index = Products.indexOf(this.getItem(id));
            const Product = Products[index];
            Product.inCart =true;
            Product.count = 1;
            const price = Product.price;
            Product.total = price;
            this.setState(()=>{
                return {products:Products, cart :[...this.state.cart, Product]}
                
            },
            () => {
                this.addTotals();
            }
            )
    }
    openModal= id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    }
    closeModal = id => {
        this.setState(()=> {
            return {modalOpen:false}
        });
    }

    increase = id => {
       let tempCart = [...this.state.cart];
       const selectedProduct = tempCart.find(item => item.id === id);
       const index = tempCart.indexOf(selectedProduct);
       const product = tempCart[index];

       product.count = product.count + 1;
       product.total = product.count * product.price;

       this.setState(()=>{
           return {cart:[...tempCart]}
       },
       ()=>{
           this.addTotals()
       })
    }
    decrease = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
 
        product.count = product.count - 1;
        if(product.count===0){
            this.removeItem(id);
        }else{
            product.total = product.count * product.price;
        this.setState(()=>{
            return {cart:[...tempCart]}
        },
        ()=>{
            this.addTotals()
        })
        }
     
    }
    removeItem = id => {
       let tempProducts = [...this.state.products];
       let tempCart = [...this.state.cart];

       tempCart = tempCart.filter(item => item.id !==id);

       const index = tempProducts.indexOf(this.getItem(id));
       let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

       this.setState(()=>{
           return {
               cart : [...tempCart],
               products: [...tempProducts]
           };
       },()=> {
                this.addTotals();
       })
    }
    clearCart = () => {
        this.setState(()=> {
            return {cart:[]};
        }, ()=> {
            this.setProducts();
            this.addTotals();
        })
    }

    addTotals = ()=> {
        let subtotal = 0;
        this.state.cart.map(item => ( subtotal += item.total));
        const tempTax = subtotal *0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax;
        this.setState(()=>{
            return {
                cartSubtotal : subtotal,
                cartTax : tax,
                cartTotal : total
            }
        }
        )
    }
    render() {
        return (
            <ProductContext.Provider value={{...this.state,
                    handleDetail :this.handleDetail, 
                    addToCart : this.addToCart, 
                    openModal : this.openModal, 
                    closeModal : this.closeModal,
                    increase : this.increase,
                    decrease : this.decrease,
                    removeItem : this.removeItem,
                    clearCart : this.clearCart,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;
export {ProductProvider,ProductConsumer};