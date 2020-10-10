import React from "react";
import Routes from "./Routes/routes";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";
import firebase from "firebase/app";
import { createFirestoreInstance } from "redux-firestore";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from "./Config/fbConfig";
import Loading from "./Component/Loading/index";
import rootReducer from "./Store/Reducers";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig)
  )
);
// eslint-disable-next-line
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return children;
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        {" "}
        <BrowserRouter>
          <AuthIsLoaded>
            <Routes />
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
