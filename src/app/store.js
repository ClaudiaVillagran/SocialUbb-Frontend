import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";


import studentSlice from "../features/studentSlice";
import chatSlice from "../features/chatSlice";
import publicationSlice from "../features/publicationSlice";

import commentSlice from "../features/commentSlice";
import projectSlice from "../features/projectSlice";

import notificationSlice from "../features/notificationSlice";
import storage from "redux-persist/lib/storage";
//  import AsyncStorage from "react-native-async-storage/async-storage";
//saveUserOnlyFilter

const saveUserOnlyFilter = createFilter("student", ["student"]);

//persist config
const persistConfig = {
    key: "student",
    storage,
    whitelist: ["student","notification", "chat", "publication", "comment", "project"],
    transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
    student: studentSlice,
    chat: chatSlice,
    publication: publicationSlice,
    comment: commentSlice,
    project: projectSlice,
    notification: notificationSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store);
