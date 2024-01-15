import { useLoaderData, useNavigate } from 'react-router-dom';
import Product from './Product';
import ProductAPI from '../../api/apiProducts';
import CartThunkAPI from '../cart/CartThunkAPI';
import UserThunkAPI from '../user/UserThunkAPI';
import CategoryAPI from '../../api/apiCategories';
import { setAllCategories } from '../filters/filterSlice';
import Categories from '../filters/Categories';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../filters/Filters';
import { useEffect } from 'react';

export async function productsLoader(dispatch) {
  // loaders intercept the request being made to the server to fetch products
  try {
    const [products, categories] = await Promise.all([
      ProductAPI.getProducts(),
      CategoryAPI.getCategories(),
    ]);
    dispatch(setAllCategories(categories));
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

function Products() {
  const products = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategories } = useSelector((state) => state.filter);

  useEffect(() => {
    /* 
     THIS ACTION WILL BE FIRED WHEN THE APP RENDERS FOR THE FIRST
     TIME ONLY, WHICH MAKES SURE THE USER REMAINS LOGGED IN UNLESS
     THE CORRECT ACCESS TOKEN EXISTS IN LOCAL STORAGE.
    */
    dispatch(UserThunkAPI.authorizeUser());
    dispatch(CartThunkAPI.setCart());
  }, []);

  const allProducts = products.map((product) => (
    <Product
      key={product.id}
      product={product}
      onClick={() => navigate(`${product.id}`)}
    />
  ));
  const filteredProducts = products
    .filter((product) =>
      selectedCategories.find(({ category }) => category === product.category)
    )
    .map((product) => (
      <Product
        key={product.id}
        product={product}
        onClick={() => navigate(`${product.id}`)}
      />
    ));
  return (
    <div className="productsAndFilters">
      <Categories />
      <div>
        {selectedCategories.length > 0 && <Filters />}
        <div className="products">
          {selectedCategories.length === 0 ? allProducts : filteredProducts}
        </div>
      </div>
    </div>
  );
}

export default Products;
