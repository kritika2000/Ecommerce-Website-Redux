import { useState } from 'react';
import { IoCart } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import capitalize from '../utils/capitalize';
import UserThunkAPI from '../features/user/UserThunkAPI';
import ClipLoader from 'react-spinners/ClipLoader';

// Import images/assets in vite -> https://medium.com/@andrewmasonmedia/how-to-use-images-with-vite-and-vue-937307a150c0
function Header() {
  const { cart } = useSelector((state) => state.cart);
  const { currentUser, status } = useSelector((state) => state.user);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <header className="header">
      <img
        className="header__logo"
        src="/images/app-logo.png"
        alt="ecommerce app logo"
      />
      <div className="header__search">
        <input
          type="text"
          placeholder="Search..."
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="header__user">
        {currentUser && (
          <h3 className="header__username">
            Hi {capitalize(currentUser.username)}
          </h3>
        )}
        <button
          className="header__loginBtn"
          onClick={(e) => {
            e.preventDefault();
            currentUser
              ? dispatch(UserThunkAPI.logoutUser())
              : navigate('/login');
          }}
          style={status === 'loading' ? { opacity: 0.6 } : {}}
          disabled={status === 'loading'}
        >
          {status === 'loading' && <ClipLoader color="#051320" size={20} />}
          <span>{!currentUser ? 'Sign In' : 'Sign Out'}</span>
        </button>
        {location.pathname !== '/cart' && (
          <div
            className="header__cart"
            onClick={() =>
              currentUser ? navigate('cart') : navigate('/login')
            }
          >
            {cart.length > 0 && (
              <div className="cart__numItems">{cart.length}</div>
            )}
            <IoCart size={40} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
