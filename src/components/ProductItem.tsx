import React,{ FC } from 'react';
import { addToCart } from '../redux/productsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {replaceProductList} from '../redux/productsSlice'


interface props{
    productID:number,
    productName: string,
    productDescription: string,
    productPrice: number;
}; 

const ProductItem:FC<props>= ({productID ,  productName, productDescription, productPrice })=>{

    const dispatch=useDispatch();

    const currentProduct={
        productID: 0,
        productName: '',
        productDescription: '',
        productPrice: 0,
    }

    function dispatchAddToCart(){
        dispatch(addToCart(currentProduct))
    }

    function refreshProductsList(){
        axios.get('https://shopping-appserver.herokuapp.com/getproducts').then((res)=>{
                console.log(res.data);
                dispatch(replaceProductList(res.data));
                
            }).catch((err)=>{
                console.log("Error while fetching.");
            })
    }

    function deleteProduct(){
        let descision=window.confirm("Are you sure you want to delete : "+currentProduct.productName);
        if(descision){
            let obj={
                data: {
                    productID: currentProduct.productID
                }
            }
            console.log("Delete confirm : " +currentProduct.productID)
            axios.delete('https://shopping-appserver.herokuapp.com/deleteproduct',obj).then(()=>{
                console.log("Deleted Successfully");
                refreshProductsList();
            }).catch((err)=>{
                console.log("Error deleting."+err);
            })
        }
    }

    currentProduct.productID=productID;
    currentProduct.productName=productName;
    currentProduct.productDescription=productDescription;
    currentProduct.productPrice=productPrice;
    
    
    return (
        <div className="productItemWrapper">
            <div className="productItemImageDiv"></div>
            <p className="productName">{ productName }</p>
            <p className="productDescription">{ productDescription }</p>
            <p className="productPrice">Rs. { productPrice }</p>
            <button className="buttonPrimary" onClick={dispatchAddToCart}>Add</button>
            <button className="buttonPrimary" onClick={deleteProduct} >Delete</button>
        </div>
	);
};

export default ProductItem

