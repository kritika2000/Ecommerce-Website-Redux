import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import ProductAPI from '../../api/apiProducts';
import Product from './Product';
import CartThunkAPI from '../cart/CartThunkAPI';

export async function productsLoader(dispatch, currentUser) {
  // loaders intercept the request being made to the server to fetch products
  try {
    const products = await ProductAPI.getProducts();
    currentUser && dispatch(CartThunkAPI.setCart());
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

function Products() {
  const products = useLoaderData();
  const navigate = useNavigate();

  const allProducts = products.map((product) => (
    <Product
      key={product.id}
      product={product}
      onClick={() => navigate(`${product.id}`)}
    />
  ));
  return <div className="products">{allProducts}</div>;
}

export default Products;
