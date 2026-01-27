import { useState } from "react";
import "./App.css";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Body from "./components/Body.jsx";
import Feed from "./components/Feed.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connection from "./components/Connection.jsx";
import Requests from "./components/Requests.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={appStore}>{/*Used for providing REACT-redux store to APP.jsx file*/}
        <BrowserRouter basename="/">{/*Used for creating Router */}
          <Routes>{/*Used as wrapper for wrapping all the routes */}
            <Route path="/" element={<Body />}>{/*Base route when no route clicked so on first this at HomePage this will be seen*/}
              <Route path="/" element={<Feed />} />{/*They all are children routes*/}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
