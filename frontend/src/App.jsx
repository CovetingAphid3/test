import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactPage from './pages/ContactPage'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Submit from './pages/Submit'
import Prescription from './pages/Prescription'
import Login from './components/Login'
import Signup from './components/SignUp'
import Availability from './pages/Availability'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import ProductManagement from './pages/ProductManagement'
import Customers from './pages/Customers'
import Requests from './pages/Requests'
import UserDashboard from './pages/UserDashboard'
import PrescriptionManagement from './pages/PrescriptionManagement'

function App() {
    const location = useLocation();

    return (
        <div>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={150}>
                    <div className="route-section">
                        <Routes location={location}>
                            <Route path="/" element={<Home/>} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/submit" element={<Submit />} />
                            <Route path="/log" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/prescription-submission" element={<Prescription />} />
                            <Route path="/check-availability" element={<Availability />} />
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/dashboard/messages" element={<Messages />} />
                            <Route path="/admin/dashboard/products" element={<ProductManagement />} />
                            <Route path="/admin/dashboard/customers" element={<Customers />} />
                            <Route path="/admin/dashboard/requests" element={<Requests />} />
                            <Route path="/user/dashboard" element={<UserDashboard />} />
                            <Route path="/admin/dashboard/prescriptions" element={<PrescriptionManagement />} />
                        </Routes>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;

