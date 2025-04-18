import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { SearchProvider } from './contexts/SearchContext';

import Home from './Components/home/Home';
import Footer from "./Components/footer/Footer"
import Header from "./Components/header/Header"
import Register from "./Components/register/Register"
import Login from "./Components/login/Login"
import About from "./Components/about/About"
import PartDetails from './Components/part-details/PartDetails';
import PartCatalog from './Components/part-catalog/PartCatalog';
import PartImport from './Components/part-import/PartImport';
import PartEdit from './Components/part-edit/PartEdit';
import Logout from './Components/logout/Logout';
import MyAccount from './Components/my-account/My-Account';
import Contact from './Components/contact/Contact';
import AuthGuard from './Components/components/AuthGuard';


function App() {

    return (
        <AuthContextProvider>
            <CategoryProvider>
                <SearchProvider>
                    <div className="main-wrapper">

                        <Header />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/catalog" element={<PartCatalog />} />
                            <Route path="/catalog/:partId/details" element={<PartDetails />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/my-account" element={<MyAccount />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route element={<AuthGuard />}>
                                <Route path="/catalog/import" element={<PartImport />} />
                                <Route path="/catalog/:partId/edit" element={<PartEdit />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>

                        </Routes>

                        <Footer />

                    </div>
                </SearchProvider>
            </CategoryProvider>
        </AuthContextProvider>
    )
}

export default App
