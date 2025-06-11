import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMail as sendMailApi } from './mailApi';
import { getInboxMails ,fetchMailById,SendreplyMail} from './mailApi';

export const fetchInboxMails = createAsyncThunk(
  'mail/fetchInboxMails',
  async (_, thunkAPI) => {
    try {
      const response = await getInboxMails();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchMailId = createAsyncThunk('mail/fetchMailById', async (id) => {
  const response = await fetchMailById(id);
  return response.data;
});

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

export const replyMail = createAsyncThunk(
  'mail/replyMail',
  async (replyData, thunkAPI) => {
    try {
      const res = await SendreplyMail(replyData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to send reply');
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
    inbox:[],
    selectedMail: null,

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
      })
      .addCase(fetchInboxMails.pending, (state) => {
      })
      .addCase(fetchInboxMails.fulfilled, (state, action) => {
        state.inbox = action.payload;
      })
      .addCase(fetchInboxMails.rejected, (state, action) => {
      })
        .addCase(fetchMailId.pending, (state) => {
      })
      .addCase(fetchMailId.fulfilled, (state, action) => {
        state.selectedMail = action.payload;
      })
      .addCase(fetchMailId.rejected, (state, action) => {
             })
  }
});

export const { reset } = mailSlice.actions;
export default mailSlice.reducer;
