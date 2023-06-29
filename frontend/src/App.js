import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from "./screens/ProductScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddressScreen from "./components/Profile/Screens/AddressScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreditCardScreen from "./components/Profile/Screens/CreditCardScreen";
import UploadScreen from "./screens/UploadScreen";
import Categories from "./components/ProductSelling/Categories";
import ProductAttr from "./components/ProductSelling/ProductAttr";
import BidScreen from "./components/Profile/Screens/BidScreen";
import VerifyScreen from "./screens/VerifyScreen";
import UsersProductsScreen from "./components/Profile/Screens/UsersProductsScreen";
import SocialScreen from "./components/Login/SocialScreen";
import SocialRegisterScreen from "./screens/SocialRegisterScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import OrderScreenContainer from "./components/Orders/OrderScreenContainer";
import CompleteOrders from "./components/Orders/CompleteOrders";
import OrderScreen from "./components/Profile/Screens/OrderScreen";
import OrderDetail from "./components/Profile/Order/OrderDetail";
import HelpContact from "./screens/HelpContact";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/cs" element={<HelpContact />}/>
            <Route path="/login" element={<LoginScreen />}>
              <Route index element={<SocialScreen />}/>
              <Route path=":socialParams" element={<SocialScreen />}/>
            </Route>
            <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/register/social" element={<SocialRegisterScreen />}/>
            <Route path="/verify/:uidb64/:token" element={<VerifyScreen />}/>
            <Route path="/profile" element={<ProfileScreen />}>
              <Route index element={<BidScreen />}/>
              <Route path="cards" element={<CreditCardScreen />} />
              <Route path="addresses" element={<AddressScreen />} />
              <Route path="selling" element={<UsersProductsScreen />} />
              <Route path="orders/buying" element={<OrderScreen />} />
              <Route path="orders/selling" element={<OrderScreen />} />
              <Route path="orders/buying/:orderID" element={<OrderDetail />} />
              <Route path="orders/selling/:orderID" element={<OrderDetail />} />
            </Route>
            <Route path="/shopping-cart" element={<ShoppingCartScreen />}>
              <Route index element={<OrderScreenContainer />} />
              <Route path="complete" element={<CompleteOrders />} />
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
