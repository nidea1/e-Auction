import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddressScreen from "./screens/AddressScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreditCardScreen from "./screens/CreditCardScreen";
import UploadScreen from "./screens/UploadScreen";
import Categories from "./components/ProductSelling/Categories";
import ProductAttr from "./components/ProductSelling/ProductAttr";
import SellingScreen from "./screens/SellingScreen";
import BidScreen from "./screens/BidScreen";
import VerifyScreen from "./screens/VerifyScreen";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/verify/:uidb64/:token" element={<VerifyScreen />}/>
            <Route path="/profile" element={<ProfileScreen />}>
              <Route index element={<BidScreen />}/>
              <Route path="cards" element={<CreditCardScreen />} />
              <Route path="addresses" element={<AddressScreen />} />
              <Route path="selling" element={<SellingScreen />} />
            </Route>
            <Route path="/product/:productParams" element={<ProductScreen />}/>
            <Route path="/product/upload" element={<UploadScreen />}>
              <Route index element={<Categories />} />
              <Route path="attr" element={<ProductAttr />} />
            </Route>
            <Route path="/categories/:categoryParams" element={<CategoryScreen />}/>
            <Route path="/?search=:keywordParams" element={<CategoryScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
