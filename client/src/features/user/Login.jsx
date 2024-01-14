import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserThunkAPI from './UserThunkAPI';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, errMessage } = useSelector((state) => state.user);

  useEffect(() => {
    status === 'success' && navigate('/');
  }, [status]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleReset() {
    setFormData({
      userId: '',
      password: '',
    });
  }
  return (
    <div className="loginUserContainer">
      <div className="loginUser">
        <h1 className="loginUser__heading">Sign In</h1>
        {errMessage && (
          <p style={{ textAlign: 'center' }} className="error">
            {errMessage.message}
          </p>
        )}
        <form className="loginUser__form">
          <input
            type="email"
            placeholder="Enter email"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(UserThunkAPI.userLogin(formData));
              handleReset();
            }}
            style={status === 'loading' ? { opacity: 0.6 } : {}}
            disabled={status === 'loading'}
          >
            {status === 'loading' && <ClipLoader color="#051320" size={20} />}
            <p>Sign Up</p>
          </button>
        </form>
        <p className="loginUser__query">
          {"Don't have an account?"} <Link to={'/register'}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
