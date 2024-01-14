import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserThunkAPI from './UserThunkAPI';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    userId: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, errMessage } = useSelector((state) => state.user);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleReset() {
    setFormData({
      username: '',
      userId: '',
      password: '',
    });
  }
  return (
    <div className="registerUserContainer">
      <div className="registerUser">
        {status === 'success' ? (
          <div className="registerUser__success">
            <p style={{ color: '#FFF' }}>
              Your account has been created successfully!
            </p>
            <button onClick={() => navigate('/login')}>Sign In</button>
          </div>
        ) : (
          <>
            <h1 className="registerUser__heading">Sign Up/Register</h1>

            {errMessage && (
              <p style={{ textAlign: 'center' }} className="error">
                {errMessage.message}
              </p>
            )}
            <form className="registerUser__form">
              <input
                type="text"
                placeholder="Enter name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
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
                  dispatch(UserThunkAPI.createUser(formData));
                  handleReset();
                }}
                style={status === 'loading' ? { opacity: 0.6 } : {}}
                disabled={status === 'loading'}
              >
                {status === 'loading' && (
                  <ClipLoader color="#051320" size={20} />
                )}
                <p>Sign Up</p>
              </button>
            </form>
            <p className="registerUser__query">
              Already have an account? <Link to={'/login'}>Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
