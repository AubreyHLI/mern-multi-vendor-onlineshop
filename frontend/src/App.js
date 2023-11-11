import './App.css';
import '@stripe/react-stripe-js';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/Customer/LoginPage'
import SignupPage from './pages/Customer/SignupPage';
import InitLayout from './components/Layout/InitLayout';
import UserCommonLayout from './components/Layout/UserCommonLayout';
import HomePage from './pages/Customer/HomePage';
import BestSelling from './pages/Customer/BestSelling';
import ProductsPage from './pages/Customer/ProductsPage';
import SingleProductPage from './pages/Customer/SingleProductPage';
import EventsPage from './pages/Customer/EventsPage';
import FAQPage from './pages/Customer/FAQPage';
import ShopPage from './pages/Customer/ShopPage';
import CartPage from './pages/Customer/CartPage';
import AccountPage from './pages/Customer/AccountPage';
import Auth from './components/Account/Auth';
import AccountCommonLayout from './components/Layout/AccountCommonLayout';
import OrdersPage from './pages/Customer/OrdersPage';
import SingleOrderPage from './pages/Customer/SingleOrderPage';
import AddressBookPage from './pages/Customer/AddressBookPage';
import ChangePwPage from './pages/Customer/ChangePwPage';
import InboxPage from './pages/Customer/InboxPage';
import CheckoutCommonLayout from './components/Layout/CheckoutCommonLayout';
import CheckoutPage from './pages/Customer/CheckoutPage';
import PaymentPage from './pages/Customer/PaymentPage';
import PaymentSuccessPage from './pages/Customer/PaymentSuccessPage';

import ShopSignup from './pages/Business/ShopSignup';
import ShopLogin from './pages/Business/ShopLogin';
import VerifyEmailPage from './pages/Business/VerifyEmailPage';
import ShopAuth from './components/Shop/ShopAuth';
import ShopCommonLayout from './components/ShopLayout/ShopCommonLayout';
import ShopHomePage from './pages/Business/ShopHomePage';
import ShopProductsPage from './pages/Business/ShopProductsPage';
import ShopOrdersPage from './pages/Business/ShopOrdersPage';
import ShopShippingPage from './pages/Business/ShopShippingPage';
import ShopSalePage from './pages/Business/ShopSalePage';
import ShopStatisPage from './pages/Business/ShopStatisPage';
import ShopAccountPage from './pages/Business/ShopAccountPage';
import ShopInboxPage from './pages/Business/ShopInboxPage';


const App = () => {

    return (
    <BrowserRouter>
        <div className='app w-screen h-auto min-w-[360px] bg-gray-50'>
            <Routes>
                <Route path='/' element={<InitLayout />}>
                    <Route element={<UserCommonLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path='bestselling' element={<BestSelling />} />
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='product/:id' element={<SingleProductPage />} />
                        <Route path='events' element={<EventsPage />} />
                        <Route path='faq' element={<FAQPage />} />
                        <Route path='shop/:id' element={<ShopPage />} />
                    </Route>
                    <Route path='cart' element={<CartPage />} />
                    <Route path='account' element={<Auth />}>
                        <Route element={<AccountCommonLayout />}>
                            <Route index element={<AccountPage />} />
                            <Route path='orders' element={<OrdersPage />} />
                            <Route path='order/:id' element={<SingleOrderPage />} />
                            <Route path='inbox' element={<InboxPage />} />
                            <Route path='addresses' element={<AddressBookPage />} />
                            <Route path='changePW' element={<ChangePwPage />} />
                        </Route>
                        <Route element={<CheckoutCommonLayout />}>
                            <Route path='checkout' element={<CheckoutPage />} />
                            <Route path='payment' element={<PaymentPage />} />
                            <Route path='paymentSuccess' element={<PaymentSuccessPage />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                
                <Route path='/business' element={<ShopAuth><ShopCommonLayout /></ShopAuth>}>
                    <Route index element={<ShopHomePage />} />
                    <Route path='products' element={<ShopProductsPage />} />
                    <Route path='orders' element={<ShopOrdersPage />} />
                    <Route path='shipping' element={<ShopShippingPage />} />
                    <Route path='sales' element={<ShopSalePage />} />
                    <Route path='statis' element={<ShopStatisPage />} />
                    <Route path='shop' element={<ShopAccountPage />} />
                    <Route path='inbox' element={<ShopInboxPage />} />
                </Route>
                <Route path='/business/signup' element={<ShopSignup />} />
                <Route path='/business/login' element={<ShopLogin />} />
                <Route path='/business/verify-email' element={<VerifyEmailPage />}/>
            </Routes>
        </div>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </BrowserRouter>
    )
}

export default App