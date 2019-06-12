import React from "react"
import './item-component.css'

function ShoppingItem(props) {
    return (
        <div className="rows">
            <div className="name">
                {props.shopitem.productname}
            </div>
            <div className="cost">
                {props.shopitem.cost + "$"}
            </div>
            <div className="cost">
                quantity: {props.shopitem.quant}
            </div>
            <div className="buttons">
                <button onClick={() => props.handleplus(props.shopitem)}  className="row">
                    +
                </button>
                <button onClick={() => props.handleminus(props.shopitem)}  className="row">
                    -
                </button>
                <button onClick={() => props.handledel(props.shopitem)} className="row">
                    X
                </button>
            </div>
            
        </div>
    )
}

export default ShoppingItem;