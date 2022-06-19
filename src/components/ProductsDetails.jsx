import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain } from '../env'
import Singleproduct from './singleproduct'

function ProductsDetails() {
  const { id } = useParams()
  const [products, setProducts] = useState(null)
  const [categoryProduct,setCategoryProduct]=useState(null)
  console.log(products?.category['id']);
  useEffect(() => {
    const getdata = async () => {
      await Axios({
        method: 'get',
        url: `${domain}/api/product/${id}/`

      }).then((response) => {
        console.log(response.data);
        setProducts(response?.data)
        getCategory(response?.data?.category['id']);
      }).catch(error => {
        console.log(error);
    })
    }
    getdata()
  }, [id])


  // function for Category 
 

    const getCategory = async (id) => {
      await Axios({
        method: 'get',
        url: `${domain}/api/categori/${id}/`
      }).then(response => {
        console.log(response.data)
        setCategoryProduct(response?.data)

      })
    }


  return (
    <div className='container overflow-hidden'>
      {
        products !== null && (
          <div className='row '>
            <div className="col-md-6 align-self-center"> <img src={products?.image} alt="" className='img-fluid' /></div>
            <div className="col-md-6 align-self-center">
              <h2>{products?.title}</h2>
              <h2><del>{products?.market_price}</del></h2>
              <h2>Price: {products?.selling_price} tk</h2>
              <button className='btn btn-info my-3'>Add to Cart</button>
              <p>{(products?.description).substring(0, 500)}</p>
            </div>
          </div>
        )
      }

      <div className="row">
        <h1>Related Product</h1>
        {
          categoryProduct !==null && categoryProduct[0]?.category_products_me?.map((product,i)=>(
            <div className='col-md-4' key={i}>
              <Singleproduct item={product} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProductsDetails