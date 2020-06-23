import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* PLOP_DUCKS_IMPORT */

const rootReducer = combineReducers({
  /* PLOP_COMBINE_IMPORT */
});

const persistConfig = {
  storage,
  key: "root",
  whitelist: ["userReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

let persistor = persistStore(store);

export { store, persistor };
