import CartItem from './CartItem';
import Spinner from '../../components/Loader';
import CartThunkAPI from './CartThunkAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart: cartItems, status } = useSelector((state) => state.cart);
  const allCartItems = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return status === 'loading' ? (
    <Spinner />
  ) : (
    <div className="cart">
      <h1 className="cart__heading">My Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart__items">
          <div className="cartItem__header">
            <h3>PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>QUANTITY</h3>
            <h3>TOTAL PRICE</h3>
          </div>
          <hr />
          {allCartItems}
          <div className="cart__footer">
            <button
              className="clearCartBtn"
              onClick={() => dispatch(CartThunkAPI.clearCartThunk())}
            >
              Clear Cart
            </button>
            <div className="cartItem__subtotal">
              <div className="subtotal">
                <h3 className="subtotal__text">Subtotal</h3>
                <p className="subtotal__totalPrice">Rs {subTotal.toFixed(2)}</p>
              </div>
              <button className="placeOrderBtn">Place Order</button>
              <button
                className="continueShoppingBtn"
                onClick={() => navigate(-1)}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="emptyCart">Your cart is empty</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
