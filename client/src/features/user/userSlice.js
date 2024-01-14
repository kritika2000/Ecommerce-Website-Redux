import { createSlice } from '@reduxjs/toolkit';
import UserThunkAPI from './UserThunkAPI';
import LocalStorage from '../../api/apiStorage';

const initialState = {
  allUsers: [],
  currentUser: null,
  status: null,
  errMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET USERS
    builder.addCase(UserThunkAPI.setUsers.pending, (state) => {
      state.status = 'loading';
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.setUsers.fulfilled, (state, action) => {
      state.status = 'success';
      state.allUsers = action.payload;
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.setUsers.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // GET USER
    builder.addCase(UserThunkAPI.getUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.currentUser = action.payload;
      state.errMessage = null;
    });

    // CREATE USER
    builder.addCase(UserThunkAPI.createUser.pending, (state) => {
      state.status = 'loading';
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.createUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.allUsers.push(action.payload);
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.createUser.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // UPDATE PASSWORD
    builder.addCase(UserThunkAPI.updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.allUsers = state.allUsers.map((user) =>
        user.userId === action.payload.userId ? action.payload : user
      );
      state.errMessage = null;
    });

    // DELETE USER
    builder.addCase(UserThunkAPI.deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = state.allUsers.filter(
        (user) => user.userId !== action.payload
      );
      state.errMessage = null;
    });

    // LOGIN USER
    builder.addCase(UserThunkAPI.userLogin.pending, (state) => {
      state.status = 'loading';
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.userLogin.fulfilled, (state, action) => {
      state.status = 'success';
      state.currentUser = {
        userId: action.payload.userId,
        username: action.payload.username,
      };
      LocalStorage.setAccessToken(action.payload.accessToken);
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.userLogin.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });

    // AUTHORIZE
    builder.addCase(UserThunkAPI.authorizeUser.fulfilled, (state, action) => {
      const { currentUser } = action.payload;
      state.status = 'success';
      state.currentUser = {
        userId: currentUser.userId,
        username: currentUser.username,
      };
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.authorizeUser.rejected, (state) => {
      state.status = 'error';
      state.currentUser = null;
      state.errMessage = null;
    });

    // LOGOUT USER
    builder.addCase(UserThunkAPI.logoutUser.pending, (state) => {
      state.status = 'loading';
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.logoutUser.fulfilled, (state) => {
      state.status = 'success';
      LocalStorage.clearAccessToken('token');
      window.location.href = 'http://localhost:3000/';
      state.errMessage = null;
    });
    builder.addCase(UserThunkAPI.logoutUser.rejected, (state, action) => {
      state.status = 'error';
      state.errMessage = action.payload;
    });
  },
});

export const {
  setUsers,
  getUser,
  createUser,
  updatePassword,
  deleteUser,
  userLogin,
  authorizeUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
