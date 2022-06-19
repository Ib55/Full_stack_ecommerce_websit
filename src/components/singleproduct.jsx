import React from 'react'
import { Link } from 'react-router-dom'
function Singleproduct({ item }) {
    return (

        <div class="card single_product my-3">
            <Link to={`/product/${item.id}`}>
                <img src={item.image} class="card-img-top" alt="..." />
            </Link>
            <div class="card-body">
                <h5 class="card-title">{(item.title).substring(0, 22)} </h5>
                <p class="card-text">{(item.description).substring(0, 80)}...<Link to={`/product/${item.id}`}>more</Link></p>
                <a href="#" class="btn btn-primary">Add to Cart</a>
            </div>
            <div className='card-footer'>
                <h5>Price <del>{item.market_price}</del> <span>{item.selling_price}</span></h5>
            </div>
        </div>

    )
}

export default Singleproduct