import capitalize from '../../utils/capitalize';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import CartThunkAPI from '../cart/CartThunkAPI';
import { useNavigate } from 'react-router-dom';

function renderRating(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push(<BsStarFill key={i} />)
      : i - rating < 1
      ? stars.push(<BsStarHalf key={i} />)
      : stars.push(<BsStar key={i} />);
  }
  return stars;
}

function Product({ product, onClick }) {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const productFound = cart.find((item) => item.id === product.id);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <div className="product" onClick={onClick}>
      <img className="product__image" src={product.image} alt="product image" />
      <p className="product__title">{capitalize(product.title)}</p>
      <p className="product__price">${product.price}</p>
      <p className="product__rating">{renderRating(product.rating.rate)}</p>
      <button
        className="product__cartBtn"
        style={
          productFound ? { backgroundColor: '#d4d4d4', color: '#010f1c' } : {}
        }
        onClick={(e) => {
          e.stopPropagation();
          if (!currentUser) {
            navigate('/login');
            return;
          }
          return !productFound
            ? dispatch(CartThunkAPI.addToCart(product))
            : dispatch(CartThunkAPI.removeFromCart(product.id));
        }}
      >
        {!productFound ? 'Add To Cart' : 'Remove From Cart'}
      </button>
    </div>
  );
}

export default Product;
