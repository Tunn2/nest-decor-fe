import { ToastContainer } from "react-toastify";
import { router } from "./configs/router";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
