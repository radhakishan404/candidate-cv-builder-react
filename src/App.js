import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SnackBarContainer from "./component/common/Snackbar";
import UsersView from "./pages/Users";
import UsersAddView from "./pages/UsersAdd";

function App() {
  return (
    <>
      <SnackBarContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<UsersView />} />
          <Route exact path="/add-user" element={<UsersAddView />} />
          <Route exact path="/add-user/:user_id" element={<UsersAddView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
