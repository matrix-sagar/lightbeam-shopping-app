import { createSlice } from '@reduxjs/toolkit';

interface productDetails{
   productID:number,
   productName: string,
   productDescription: string,
   productPrice: number, 
}
interface cart{
    productID: number,
    productName: string,
    productPrice: number,
    quantity: number,
    cost: number,
}
interface completeState{
    productsList: productDetails[],
    currentCart: cart[]
}

const initialState={
    productsList:[],
    currentCart:[]

} as completeState


const productsSlice=createSlice({
    name: 'products',
    initialState,
    reducers:{
      
        addToCart: (state,action)=>{
            let alreadyExists=false;
            if(state.currentCart.length===0){
                let newItem={
                    productID: Number( action.payload.productID) ,
                    productName: action.payload.productName,
                    productPrice: Number(action.payload.productPrice),
                    quantity:1,
                    cost: Number(action.payload.productPrice),
                }
                state.currentCart.push(newItem);
                console.log("Current cart : " + state.currentCart);
                console.log("NEW ITEM : " + newItem)
            }
            else{
                let index=0;
                state.currentCart.forEach((cartItem, idx)=>{
                    if(action.payload.productID==cartItem.productID){
                        alreadyExists=true;
                        index=idx
                    }
                })
                if(alreadyExists){
                    state.currentCart[index].quantity++;
                    state.currentCart[index].cost+=state.currentCart[index].productPrice
                }
                if(!alreadyExists)
                {
                    let newItem={
                        productID: Number( action.payload.productID) ,
                        productName: action.payload.productName,
                        productPrice: Number(action.payload.productPrice),
                        quantity:1,
                        cost: Number(action.payload.productPrice),
                    }
                    state.currentCart.push(newItem);
                    console.log("Current cart : " + state.currentCart);
                    console.log("NEW ITEM : " + newItem)
                }
            }
            console.log(state.currentCart);
            console.log("Add to cart called");
        },

        addProduct: (state, action)=>{
            let newProduct= {
                productID:Number(action.payload.productID),
                productName:  action.payload.productName,
                productDescription: action.payload.productDesription,
                productPrice: Number(action.payload.productPrice),
            }
            console.log('AddProduct called in slice');
            state.productsList.push(newProduct);
        },

        removeFromCart: (state, action)=>{
            console.log("REMOVE FROM CART CALLED")
            let prID=Number(action.payload);
            console.log("ID: "+prID);
            //state.currentCart.filter(cartItem=>(cartItem.productID)!==index);
            for(let i=0;i<state.currentCart.length;i++){
                if(state.currentCart[i].productID==prID){
                    state.currentCart.splice(i,1);
                    break;
                }
            }
        },

        replaceProductList:(state, action)=>{
            state.productsList=action.payload;
        }

    },
});

export const { addToCart, addProduct, removeFromCart, replaceProductList }=productsSlice.actions;
export default productsSlice.reducer;