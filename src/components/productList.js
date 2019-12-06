import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../Context';


class productList extends Component {
     render() {
        return (

            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products"/>
                        <div className="row">
                            <ProductConsumer>
                                {value=>{
                                   return value.Products.map(product=>{
                                       return <Product key={product.id} product={product}/>
                                   })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // <div>
            //    <Product/>
            // </div>
        );
    }
}

export default productList;