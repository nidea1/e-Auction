import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyBids from "./components/MyBids";
import AddressScreen from "./screens/AddressScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreditCardScreen from "./screens/CreditCardScreen";
import SellingScreen from "./screens/SellingScreen";
import Categories from "./components/ProductSelling/Categories";
import ProductAttr from "./components/ProductSelling/ProductAttr";


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
            <Route path="/profile" element={<ProfileScreen />}>
              <Route index element={<MyBids />}/>
              <Route path="cards" element={<CreditCardScreen />} />
              <Route path="addresses" element={<AddressScreen />} />
            </Route>
            <Route path="/product/:productParams" element={<ProductScreen />}/>
            <Route path="/product/upload" element={<SellingScreen />}>
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
