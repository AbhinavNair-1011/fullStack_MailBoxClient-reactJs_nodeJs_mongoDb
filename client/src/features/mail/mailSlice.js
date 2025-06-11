import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMail as sendMailApi } from './mailApi';

export const sendMail = createAsyncThunk(
  'mail/sendMail',
  async (mailData, thunkAPI) => {
    try {
      const response = await sendMailApi(mailData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Something went wrong'
      );
    }
  }
);

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = mailSlice.actions;
export default mailSlice.reducer;
