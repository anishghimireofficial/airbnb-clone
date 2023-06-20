import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import Loginpage from "./pages/Loginpage";
import Layout from "./Layout";
import axios from "axios";
import Registerpage from "./pages/RegisterPage";
import { UserContextProvider } from "./userContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Registerpage />} />
              <Route path="/account/:subpage?" element={<ProfilePage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route
                path="/account/places/:id"
                element={<PlacesFormPage />}
              />{" "}
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />{" "}
              <Route path="/account/bookings/:id" element={<BookingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
