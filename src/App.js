import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRoutes from "./components/routes/userRoutes";
import AdminRoute from "./components/routes/adminRoute";
import "./App.css";
import NotFound from "./components/layout/NotFound";

function App() {
  const userRoutes = UserRoutes();
  const adminRoutes = AdminRoute();
  return (
    <>
      <Router>
        <div className="App">
          <Toaster position="top-center" />
          <Header />
          <div className="container">
            <Routes>
              {userRoutes}
              {adminRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
