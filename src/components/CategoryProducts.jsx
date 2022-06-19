import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { domain } from '../env'
import Singleproduct from './singleproduct'

const CategoryProducts = () => {
     const [category,setCategory]=useState(null)
    const { id } = useParams()
    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/categori/${id}/`
            }).then((response) => {
                console.log(response.data[0])
                setCategory(response.data[0])
            })

        }
        getdata()
    }, [])
    return (
        <div className='container'>
              <h2 className='text-center mt-5 text-info'>{category?.title}</h2>
              <div className="row">
               {
                category !==null && category?.category_products_me.map((product,i)=>(
                   <div key={i} className='col-md-4'>
                    <Singleproduct item={product}/>
                   </div> 
                ))
               }
              </div>
        </div>
    )
}

export default CategoryProducts