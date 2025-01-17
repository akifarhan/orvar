/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and Expect only
 * contain code that Expect be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component Expect technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Notify from 'containers/Notify';
import ProductView from 'containers/ProductView';
import HomePage from 'containers/HomePage';
import LogoutForm from 'containers/LogoutForm';
import MallPage from 'containers/MallPage';
import NotFoundPage from 'containers/NotFoundPage';
import OnboardingPage from 'containers/OnboardingPage';
import ProfilePage from 'components/ProfilePage';
// import Cart from 'containers/CartPage';
import PrivateRoute from 'containers/App/PrivateRoute';
import CheckoutPage from 'containers/CheckoutPage';
import ProfileOrderList from 'containers/ProfileOrderList';
import ProfileOrderDetail from 'containers/ProfileOrderDetail';
import ProfileEditInfo from 'containers/ProfileEditInfo';
import ProfileWishlist from 'containers/ProfileWishlist';
import ProfileReview from 'containers/ProfileReview';
import AboutUs from 'containers/AboutUs';
import FeedbackPage from 'containers/FeedbackPage';

import Header from 'containers/Header';
import { ProfileWallet } from '../ProfileWallet';
import './style.scss';

export default function App() {
    return (
        <section>
            <Notify></Notify>
            <Header />
            <div
                id="hershop-content-container"
            >
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <PrivateRoute exact={true} path="/login" component={LogoutForm} />
                    <PrivateRoute exact={true} path="/logout" component={LogoutForm} />
                    <PrivateRoute exact={true} path="/onboarding" component={OnboardingPage} />

                    <Route exact={true} path="/mall" component={MallPage} />
                    <Route exact={true} path="/mall/page-:pageNum?" component={MallPage} />
                    {/* group or category without pagenum */}
                    <Route
                        exact={true}
                        path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?"
                        component={MallPage}
                    />
                    {/* group or category with pagenum */}
                    <Route
                        exact={true}
                        path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/page-:pageNum(\d+)"
                        component={MallPage}
                    />
                    {/* subcategory without pagenum */}
                    <Route
                        exact={true}
                        path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/:subCategoryQueries?"
                        component={MallPage}
                    />
                    {/* subcategory with pagenum */}
                    <Route
                        exact={true}
                        path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/:subCategoryQueries?/page-:pageNum(\d+)"
                        component={MallPage}
                    />
                    <Route exact={true} path="/mall/:productId" component={ProductView} />
                    <Route
                        exact={true}
                        path="/about/:abouthermo(joinus|contactus|shippinginfo|returnpolicy|membership|privacypolicy|termandcondition|faq|userterm|hermobankaccount)?"
                        component={AboutUs}
                    />
                    <PrivateRoute exact={true} path="/feedback" component={FeedbackPage} />
                    <PrivateRoute exact={true} path="/checkout" component={CheckoutPage} />
                    <PrivateRoute exact={true} path="/profile" component={ProfilePage} />
                    <PrivateRoute exact={true} path="/profile/wallet" component={ProfileWallet} />
                    <PrivateRoute exact={true} path="/profile/detail" component={ProfileEditInfo} />
                    <PrivateRoute exact={true} path="/profile/review" component={ProfileReview} />
                    <PrivateRoute exact={true} path="/profile/wishlist" component={ProfileWishlist} />
                    <PrivateRoute exact={true} path="/profile/order" component={ProfileOrderList} />
                    <PrivateRoute exact={true} path="/profile/order:ordercatergory(/to-paid|/to-ship|/to-receive|/reviewable)" component={ProfileOrderList} />
                    <PrivateRoute exact={true} path="/profile/order/:orderID" component={ProfileOrderDetail} />

                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </section>
    );
}
