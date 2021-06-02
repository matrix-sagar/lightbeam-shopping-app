import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import{ replaceProductList } from '../redux/productsSlice';
import ProductItem from './ProductItem';
import { RootState } from '../redux/store';
import axios from 'axios';

const ProductsList=(()=>{
    let productItems:any[]= (useSelector((state :RootState)=>state.shop)).productsList;

    let dispatch=useDispatch();

    let refreshed=false;

    useEffect(()=>{
        if(!refreshed){
            axios.get('https://shopping-appserver.herokuapp.com/getproducts').then((res)=>{
                console.log(res.data);
                productItems=res.data;
                dispatch(replaceProductList(productItems));
                
            }).catch((err)=>{
                console.log("Error while fetching.");
            })
        }
        refreshed=true;
    },[])


    console.log('IN products List');
    

    return(
        <div className='productListWrapper'>
			{productItems.map((productItem) => (
				<ProductItem productID={productItem.productID} productName={productItem.productName} productDescription={productItem.productDescription} productPrice={productItem.productPrice} />
			))}
		</div>
    );
})

export default ProductsList;