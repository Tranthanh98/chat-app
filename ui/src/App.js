import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import CheckIn from "./components/CheckIn";
import Loading from "./components/Loading";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useBoundStore } from "./slices";
import * as httpClient from "./utils/httpClient";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);

  const { userInfo, setUserInfo } = useBoundStore();
  const navigate = useNavigate();

  useEffect(() => {
    httpClient
      .sendGet("/user")
      .then((res) => {
        setUserInfo(res.data.userInfo);
      })
      .catch((err) => {
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, setUserInfo]);

  if (loading) {
    return <Loading />;
  }

  if (userInfo) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

const App = () => {
  return (
    <CheckIn>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={ChatPage} />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route
            exact
            path="/chat"
            element={<PrivateRoute element={ChatPage} />}
          />
          <Route
            exact
            path="/chat/:conversationId"
            element={<PrivateRoute element={ChatPage} />}
          />
        </Routes>
      </Router>
    </CheckIn>
  );
};

export default App;
