import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import capitalize from '../../utils/capitalize';
import CartThunkAPI from './CartThunkAPI';

function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      CartThunkAPI.updateCart({
        id: item.id,
        quantity,
      })
    );
  }, [quantity]);
  return (
    <>
      <div className="cartItem">
        <div className="cartItem__info">
          <img className="item__image" src={item.image} alt="product image" />
          <div className="item__info">
            <p className="item__title">{capitalize(item.title)}</p>
            <button
              className="item__remove"
              onClick={() =>
                dispatch(CartThunkAPI.removeFromCartThunk(item.id))
              }
            >
              Remove
            </button>
          </div>
        </div>
        <p className="cartItem__price">Rs {item.price.toFixed(2)}</p>
        <input
          className="cartItem__quantity"
          type="number"
          name="quantity"
          value={quantity || 1}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <p className="cartItem__total">
          Rs {(item.quantity * item.price).toFixed(2)}
        </p>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
