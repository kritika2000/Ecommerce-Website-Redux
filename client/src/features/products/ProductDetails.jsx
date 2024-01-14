import ProductAPI from '../../api/apiProducts';
import { useLoaderData, useNavigate } from 'react-router-dom';
import capitalize from '../../utils/capitalize';
import getCategory from '../../utils/getCategory';
import CartThunkAPI from '../cart/CartThunkAPI';
import { useSelector, useDispatch } from 'react-redux';

// loading the products before the component is rendered, unlike useEffect
export async function productLoader({ params }) {
  try {
    const { id } = params;
    const product = await ProductAPI.getProduct(id);
    return product;
  } catch (err) {
    throw new Error(err);
  }
}

function ProductDetails() {
  const product = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const productFound = cart.find((item) => item.id === product.id);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="productDetails">
      <img
        width={300}
        className="productDetails__image"
        src={product.image}
        alt="product details image"
      />
      <div className="productDetails__info">
        <h1 className="productDetails__title">{capitalize(product.title)}</h1>
        <p className="productDetails__description">{product.description}</p>
        <p className="productDetails__price">Rs {product.price}</p>
        <p className="productDetails__category">
          <b>Category:</b> {capitalize(getCategory(product.category))}
        </p>
        <div className="controls">
          <button
            className="productDetails__cartBtn"
            style={
              productFound
                ? { backgroundColor: '#d4d4d4', color: '#010f1c' }
                : {}
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
          <button
            className="productDetails__backToProducts"
            onClick={() => navigate(-1)}
          >
            Back To Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
