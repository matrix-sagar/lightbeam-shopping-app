import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/productsSlice'
import{ replaceProductList } from '../redux/productsSlice';
import  axios  from 'axios'


const AddProduct=()=>{

 
    const [value,setValue]=useState({
        productID: '',
        productName: '',
        productDescription: '',
        productPrice: '',        
    });

    let prID=0;
    let prName='';
    let prDesc='';
    let prPrice=0;


    const dispatch=useDispatch();

    const onSubmit=(event: any)=>{
        event.preventDefault();
        dispatch(addProduct({
            productID: value.productID,
            productName: value.productName,
            productDescription: value.productDescription,
            productPrice: value.productPrice,
        }))
    };

    function postProduct(){
        let newProduct={
            productID: 0,
            productName: 'default',
            productDescription: 'default',
            productPrice: 0,
        };
        newProduct.productID=prID;
        newProduct.productName=prName;
        newProduct.productDescription=prDesc
        newProduct.productPrice=prPrice;
        axios.post('https://shopping-appserver.herokuapp.com/insertproduct',newProduct).then(()=>{
            console.log("Successfully posted");
            refreshProductsList();
        }).catch((err)=>{
            console.log("Error while posting."+err)
        })

    }
    

    function setPrID(event: any){
        prID=event.target.value
    }
    function setPrName(event: any){
        prName=event.target.value
    }
    function setPrDesc(event: any){
        prDesc=event.target.value
    }
    function setPrPrice(event: any){
        prPrice=event.target.value
    }

    function refreshProductsList(){
        axios.get('https://shopping-appserver.herokuapp.com/getproducts').then((res)=>{
                console.log(res.data);
                dispatch(replaceProductList(res.data));
                
            }).catch((err)=>{
                console.log("Error while fetching.");
            })
    }



    return(

        <div  className='adminformWrapper'>
            <input
            type= 'text'
            placeholder='ProductID'
            onChange={setPrID}
            />
            <input 
            type="text" 
            placeholder='ProductName'
            onChange={setPrName}
            />
            <input 
            type="text"
            placeholder='ProductDescription'
            onChange={setPrDesc} 
            />
            <input 
            type="text" 
            placeholder='ProductPrice'
            onChange={setPrPrice}
            />
            <button className="buttonSubmit" onClick={postProduct}>Submit</button>
        </div>

    )
}

export default AddProduct;

