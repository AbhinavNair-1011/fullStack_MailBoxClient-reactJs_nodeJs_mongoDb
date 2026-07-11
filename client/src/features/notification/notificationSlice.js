import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },

    clearInboxNotifications: (state) => {
      state.notifications = state.notifications.filter(
        (n) => n.target !== "inbox"
      );
    },

    clearSentNotifications: (state) => {
      state.notifications = state.notifications.filter(
        (n) => n.target !== "sent"
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearInboxNotifications,
  clearSentNotifications,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;