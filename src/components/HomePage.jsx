// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { domain } from '../env'
import Singleproduct from './singleproduct'
import { Link } from 'react-router-dom'


const HomePage = () => {
    const [products, setProducts] = useState(null)
    const [category, setCategory] = useState(null)
    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/product/`

            }).then((response) => {
                console.log(response.data);
                setProducts(response.data)
            })
        }
        getdata()
    }, [])

    // next page code
    const nextPage = async () => {
        await Axios({
            method: 'get',
            url: products?.next
        }).then((response) => {
            console.log(response.data);
            setProducts(response.data)
        })
    }
    // previous page code 
    const previousPage = async () => {
        await Axios({
            method: 'get',
            url: products?.previous
        }).then(response => {
            console.log(response.data)
            setProducts(response.data)
        })
    }

    // useEffect for category
    useEffect(() => {
        const getCategory = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/categori/`
            }).then((response) => {
                console.log(response.data)
                setCategory(response.data)
            })

        }
        getCategory()
    }, [])


    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-3 mt-5">
                    <h2>All Category</h2>

                    {
                        category !== null && category?.map((category, i) => (
                            <div key={i} className='mt-1 d-flex'>
                                <Link to={`/category/${category.id}`} className='btn btn-success'>{category?.title}</Link>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {
                            products !== null && products?.results.map((item, i) => (
                                <div key={i} className='col-md-4'>
                                    <Singleproduct item={item} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="d-flex justify-content-between">
                        {
                            products?.previous !== null ? (
                                <button onClick={previousPage} className='btn btn-link'><b>Previous</b></button>

                            ) : (<button className='btn btn-link disabled '><b>Previous</b></button>
                            )
                        }
                        <div>
                            {
                                products?.next !== null ? (<button onClick={nextPage} className='btn btn-link'><b>Next</b></button>) :
                                    (<button className='btn btn-link disabled'><b>Next</b></button>)
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePage 