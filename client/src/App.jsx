import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Products, { productsLoader } from './features/products/Products';
import Cart from './features/cart/Cart';
import Error from './components/Error';
import Loader from './components/Loader';
import ProductDetails, {
  productLoader,
} from './features/products/ProductDetails';
import Spinner from './components/Loader';
import Login from './features/user/Login';
import Register from './features/user/Register';
import { useDispatch, useSelector } from 'react-redux';
import UserThunkAPI from './features/user/UserThunkAPI';

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  React.useEffect(() => {
    /* 
      THIS ACTION WILL BE FIRED WHEN THE APP RENDERS FOR THE FIRST
      TIME ONLY, WHICH MAKES SURE THE USER REMAINS LOGGED IN UNLESS
      THE CORRECT ACCESS TOKEN EXISTS IN LOCAL STORAGE.
    */
    dispatch(UserThunkAPI.authorizeUser());
  }, []);
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <Error />,
      fallbackElement: <Spinner />,
      children: [
        {
          path: '',
          children: [
            {
              index: true,
              element: <Products />,
              errorElement: <Error />,
              fallbackElement: <Loader />,
              loader: () => productsLoader(dispatch, currentUser),
            },
            {
              path: ':id',
              element: <ProductDetails />,
              errorElement: <Error />,
              loader: productLoader,
            },
          ],
        },
        {
          path: 'cart',
          element: <Cart />,
          errorElement: <Error />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
