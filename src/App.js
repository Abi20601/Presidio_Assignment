import './App.css';
import Signup from "./components/Signup";
import { Container } from 'react-bootstrap';
import { Authprovider } from './components/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login"
import  Dashboardseller from './components/Dasboardseller';
import  Dashboardbuyer from './components/Dashboardbuyer';
import PropertyForm from './PropertyDetails/PropertyForm';
import PropertiesList from './PropertyDetails/PropertiesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuyerPage from './PropertyDetails/PropertyBuyer';
import  ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Router>
          <Authprovider>
              <Routes>
              <Route path="/dashboardseller" element={
                <PrivateRoute>
                  <Dashboardseller />
                </PrivateRoute>
              } />
              <Route path="/dashboardbuyer" element={
                <PrivateRoute>
                  <Dashboardbuyer />
                </PrivateRoute>
              } />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/property-form" element={<PropertyForm />} />
              <Route path="/property-list" element={<PropertiesList />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/buyerpage" element={<BuyerPage />} />
              </Routes>
          </Authprovider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
