import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersTable from "./pages/UsersTable";
import "./App.css";
import UserDetails from "./pages/UserDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
