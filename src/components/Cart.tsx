import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/productsSlice'

const CartList=(()=>{
    const cartItems=useSelector((state: RootState)=>state.shop).currentCart;

    const dispatch =useDispatch();

    function removeItem(index: number){
        console.log("IN REMOVE ITEM WITH INDEX "+ index);
        dispatch(removeFromCart(index));
    }   

    function getCartBill(){
       let cartBill=0;
       for(let i=0; i<cartItems.length;i++){
           cartBill+=cartItems[i].cost;
       } 
       return cartBill;
    }

    return(
        <div className="cartWrapper">
            <h2 className="cartHeading">Items In cart</h2>
            <ul>
                {cartItems.map((item)=>(
                    <li key={item.productID}>
                        <div className="cartEachRow">
                            <p className="cartText">
                                {item.productName} {item.productPrice} x {item.quantity} = {item.cost}
                            </p>
                            <button className="removeFromCart" onClick={()=>removeItem(item.productID)} >x</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2 className="cartTotalBill">Your total bill is <b> Rs. {getCartBill()}</b></h2>
        </div>
    )
});

export default CartList;