/**
 *
 * FormsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import globalScope from 'globalScope';
import { dataDig, Events } from 'globalUtils';

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Drawer,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    InputLabel,
    Link,
    MobileStepper,
    OutlinedInput,
    Paper,
    // Radio,
    // RadioGroup,
    Select,
    Snackbar,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import {
    Close,
    Edit,
    ExpandLess,
    ExpandMore,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    ShoppingCart,
} from '@material-ui/icons';

import AddressForm from 'components/AddressForm';
import Cart from 'components/Cart';
import InputForm from 'components/InputForm';
import ProductCard from 'components/ProductCard';
import ProductDetails from 'components/ProductDetails';

import * as actions from './actions';
import makeSelectFormsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';

const formSetting = [
    {
        type: 'product',
        title: 'Select Product',
    },
    {
        type: 'addressInfo',
        title: 'Where do you want us to mail to you?',
    },
    {
        type: 'confirmOrder',
        title1: 'Confirm your details',
        title2: 'How can we contact you?',
    },
    {
        type: 'payment',
        title: 'Choose payment method',
    },
];

// const mockData = {
//     cart: [{ 'id': 45710, 'product': { 'id': 45710, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'plain_name': 'Dress & Living Clear Perfume', 'display_name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'extra_name': '70ml', 'prefix_name': '[Limited Edition]', 'choosable_name': '[6 Types To Choose]', 'ingredients': '', 'brief': 'German luxury undiluted solution, maintain natural and soft scent for bathroom, toilet, kitchen, bed room, work, shoe rack, car, capet, valentine gifts.', 'brand': { 'id': 543, 'name': 'W.Dressroom', 'logo': 'https://devshop.hermo.my/images/logos/wdressroom_1462962419.png', 'country_code': 'KR', 'attribute': { 'is_new': false, 'is_flagship': false }, 'url': '/brand/543-wdressroom', '_applink': { 'target': 'new-page', 'type': 'brand', 'id': 543, 'page': { 'id': 'mall-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/brand/543' }] } }, '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/brand/543' } } }, 'merchant': { 'id': 1, 'name': 'Hermo', 'country': { 'id': 'MY', 'name': 'Malaysia' }, 'shipping': { 'courier': { 'name': 'Motorex', 'code': 'Motorex', 'tracking_url': 'http://www.motorex.com.my/tracking.php' }, 'estimate_arrival': '1-3 working days', 'currency': { 'id': 'MYR', 'code': 'MYR', 'symbol': 'RM' }, 'value': 'RM6.80(WM) / RM12.00(EM)', 'default_fee_wm': '6.80', 'default_fee_em': '12.00', 'free_shipping_cfg': { 'min_amount_wm': '50.00', 'min_amount_em': '150.00', 'min_qty_wm': 0, 'min_qty_em': 0 }, 'duration_normal': '1-3', 'duration_longer': '5-7' }, 'logo': { 'id': 4248, 'code': null, 'name': 'Hermo Logo', 'title': '', 'brief': 'Free Shipping above RM50(WM)/RM150(EM)', 'content': '', 'image': { 'desktop': null, 'mobile': null, 'tablet': null, 'app': null }, 'visibility': { 'desktop': true, 'mobile': true, 'tablet': true, 'app': true }, 'property': { 'image': { 'desktop': null, 'mobile': null, 'tablet': null, 'app': null } }, 'cta': { 'title': '', 'description': '', 'button_text': '', 'color': 'dark', 'alignment': 'center', 'action': { 'text': '', '_weblink': null, '_applink': { 'target': 'new-page', 'type': 'view', 'id': 'on-sale', 'page': { 'id': 'event-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/on-sale' }] } }, '_click': { 'type': 'Imagelink', 'key': '4248' } } }, 'timer': null, 'counter': null, 'url': '', '_weblink': null, '_applink': { 'target': 'new-page', 'type': 'view', 'id': 'on-sale', 'page': { 'id': 'event-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/on-sale' }] } }, '_click': { 'type': 'Imagelink', 'key': '4248' } }, 'banner': [], 'tax': { 'rate': '0.0000', 'is_taxable': 0 } }, 'url': '/mall/45710-limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose', 'image': { 'small': 'https://devshop.hermo.my/product_images/malls/45710_limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose_185_210_1574998711.png', 'medium': 'https://devshop.hermo.my/product_images/malls/45710_limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose_200_125_1574998711.png', 'large': 'https://devshop.hermo.my/product_images/malls/45710_limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose_440_280_1574998710.png', 'hotdeal': 'https://devshop.hermo.my/images/mall/hotdeal-image-not-found.jpg' }, 'currency': { 'id': 'MYR', 'code': 'MYR', 'symbol': 'RM' }, 'price': { 'retail': 32.9, 'normal': 28.9, 'selling': 28.9, 'saving': 4, 'discount_text': '12%', 'inclusive_tax': true }, 'tax': { 'price': 28.9, 'gst': { 'taxable': 28.9, 'rate': 0, 'text': '0% GST', 'value': 0 } }, 'instock': true, 'on_sale': true, 'deal': { 'type': 'default', 'expired_time': 1578671999, 'total_bought': 90, 'remaining_qty': 9999, 'image': { 'background': null }, 'attribute': { 'is_show_timer': false } }, 'status_bar': { 'is_active': false, 'move_image': null, 'bg_image': null, 'result': null, 'attribute': { 'is_show_status_bar': false } }, 'attribute': { 'is_selectable': true, 'is_notifiable': true, 'is_wishlistable': true, 'is_coming_soon': false }, 'estimate_arrival': '1-3 working days', 'review': { 'rating': 0, 'count': 0 }, 'features': [{ 'type': 'image', 'value': 'https://devshop.hermo.my/images/tags/hotdeal-200.png' }], 'extra_features': [], '_user': { 'notified': false, 'wishlisted': false }, '_google': { 'analytic': { 'ecommerce': { 'product': { 'id': '45710', 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'price': '28.90', 'brand': 'W.Dressroom', 'category': 'Home Fragrance' } } } }, '_applink': { 'target': 'new-page', 'type': 'mall', 'id': 45710, 'page': { 'id': 'mall-view', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/mall/45710' }] } }, '_weblink': null, 'selections': [[{ 'id': 56063, 'name': '[#No. 75 Yang Yang]', 'instock': true, 'product': { 'id': 45693, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No. 75 Yang Yang]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45693_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no-75-yang-yang_440_280_1574998623.png' } }, { 'id': 56064, 'name': '[#No.76 Yeo Su]', 'instock': true, 'product': { 'id': 45694, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No.76 Yeo Su]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45694_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no76-yeo-su_440_280_1574998583.png' } }, { 'id': 56065, 'name': '[#No.77 Jeju]', 'instock': true, 'product': { 'id': 45695, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No.77 Jeju]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45695_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no77-jeju_440_280_1574998534.png' } }, { 'id': 56066, 'name': '[#No.78 Han Gang]', 'instock': true, 'product': { 'id': 45696, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No.78 Han Gang]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45696_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no78-han-gang_440_280_1574998485.png' } }, { 'id': 56067, 'name': '[#No.79 Dam Yang]', 'instock': true, 'product': { 'id': 45697, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No.79 Dam Yang]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45697_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no79-dam-yang_440_280_1574998438.png' } }, { 'id': 56068, 'name': '[#No.80 Gyeong Ju]', 'instock': true, 'product': { 'id': 45698, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [#No.80 Gyeong Ju]', 'plain_name': 'Dress & Living Clear Perfume', 'choosable_name': '', 'image': 'https://devshop.hermo.my/product_images/malls/45698_limited-edition-wdressroom-dress-living-clear-perfume-70ml-no80-gyeong-ju_440_280_1574998386.png' } }]], 'description': '<p>&nbsp;</p>\r\n\r\n<p><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">German luxury undiluted solution, maintain natural and soft scent for bathroom, toilet, kitchen, bed room, work, shoe rack, car, capet, valentine gifts. Dress &amp; Living Clear Perfume, Anti-bacteria, deodorant. by Korean Designer Bum Seok Choi.&nbsp;</span></span></span></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style="text-align:center"><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2018/02/images/WD001-point_EN-1.jpg" style="border:0px; color:rgb(0, 0, 0); font-family:arial,helvetica,sans-serif; font-size:14px; height:990px; max-width:100%; text-align:center; vertical-align:middle; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2018/02/images/WD001-point_EN-2.jpg" style="border:0px; color:rgb(0, 0, 0); font-family:arial,helvetica,sans-serif; font-size:14px; height:1056px; max-width:100%; text-align:center; vertical-align:middle; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_-75-Yang-Yang-1_01.jpg" style="height:835px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_-75-Yang-Yang-1_02.jpg" style="height:999px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_-75-Yang-Yang-1_03.jpg" style="height:1170px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_-75-Yang-Yang-1_04.jpg" style="height:593px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_76-Yeo-Su-1_01.jpg" style="height:834px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_76-Yeo-Su-1_02.jpg" style="height:1006px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_76-Yeo-Su-1_03.jpg" style="height:1156px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_76-Yeo-Su-1_04.jpg" style="height:601px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_77-Jeju-1_01.jpg" style="height:832px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_77-Jeju-1_02.jpg" style="height:998px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_77-Jeju-1_03.jpg" style="height:1172px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_77-Jeju-1_04.jpg" style="height:595px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_78-Han-Gang-1_01.jpg" style="height:833px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_78-Han-Gang-1_02.jpg" style="height:975px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_78-Han-Gang-1_03.jpg" style="height:798px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_78-Han-Gang-1_04.jpg" style="height:440px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_79-Dam-Yang-1_01.jpg" style="height:839px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_79-Dam-Yang-1_02.jpg" style="height:963px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_79-Dam-Yang-1_03.jpg" style="height:786px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_79-Dam-Yang-1_04.jpg" style="height:458px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_80-Gyeong-Ju-1_01.jpg" style="height:833px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_80-Gyeong-Ju-1_02.jpg" style="height:975px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_80-Gyeong-Ju-1_03.jpg" style="height:780px; width:900px" /><img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_80-Gyeong-Ju-1_04.jpg" style="height:458px; width:900px" /></p>\r\n', 'usage': '<p><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">Directly spread it to the stinky fiber or space.(in the case of fiber, spread it 20~30 cm apart from the fiber. and refrain using it from leather. For the use of luxuary textile, recommended to use it after testing.</span></span></span></p>\r\n\r\n<p><strong><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">Suggested Use</span></span></span></strong></p>\r\n\r\n<p><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">For use in any room, your car or directly on garments and clothes as you iron or after to freshen. Test on an inside seam prior to spraying on delicate fabrics and avoid spraying on finished wood.</span></span></span></p>\r\n', 'photos': '<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No. 75 Yang Yang<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_-75-Yang-Yang(1).png" style="height:500px; width:500px" /></span></span></span></p>\r\n\r\n<p style="text-align:center">&nbsp;</p>\r\n\r\n<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No.76 Yeo Su<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_76-Yeo-Su.png" style="height:500px; width:500px" /></span></span></span></p>\r\n\r\n<p style="text-align:center">&nbsp;</p>\r\n\r\n<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No.77 Jeju<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_77-Jeju.png" style="height:500px; width:500px" /></span></span></span></p>\r\n\r\n<p style="text-align:center">&nbsp;</p>\r\n\r\n<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No.78 Han Gang<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_78-Han-Gang.png" style="height:500px; width:500px" /></span></span></span></p>\r\n\r\n<p style="text-align:center">&nbsp;</p>\r\n\r\n<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No.79 Dam Yang<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_79-Dam-Yang.png" style="height:500px; width:500px" /></span></span></span></p>\r\n\r\n<p style="text-align:center">&nbsp;</p>\r\n\r\n<p style="text-align:center"><span style="color:#000000"><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">#No.80 Gyeong Ju<br />\r\n<img alt="" src="https://cdn.hermo.my/hermo/Uploads/2019/11/images/%23No_80-Gyeong-Ju.png" style="height:500px; width:500px" /></span></span></span></p>\r\n', 'specification': [{ 'key': 'capacity', 'title': 'Capacity', 'value': '70ml' }, { 'key': 'effect', 'title': 'Effect', 'value': 'Covering Odor' }, { 'key': 'made_in', 'title': 'Made In', 'value': 'Korea' }, { 'key': 'ingredient', 'title': 'Ingredient', 'value': '' }], 'disclaimer': '<p><span style="color:#000000"><span style="font-size:11px">*Results from the use of beauty product above may vary depending upon the individual and will depend on multiple factors, including your age, gender, skin type and condition, use of other products used, health history, lifestyle, diet and others</span></span></p>\r\n', 'group': { 'id': 3, 'name': 'Fragrance', 'url': '/fragrance', '_applink': { 'target': 'new-page', 'type': 'group', 'id': 3, 'page': { 'id': 'mall-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/group/3' }] } }, '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/group/3' } } }, 'category': { 'id': 98, 'name': 'Home Fragrance', 'url': '/fragrance/98-home-fragrance', '_applink': { 'target': 'new-page', 'type': 'category', 'id': 98, 'page': { 'id': 'mall-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/category/98' }] } }, '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/category/98' } } }, 'subcategory': null, 'styles': null, 'hashtags': [{ 'id': 'deodorant', 'name': 'deodorant', 'url': '/tag/search?tag=deodorant', '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/mall/tag/deodorant' } } }, { 'id': 'frageance', 'name': 'frageance', 'url': '/tag/search?tag=frageance', '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/mall/tag/frageance' } } }, { 'id': 'roommist', 'name': 'roommist', 'url': '/tag/search?tag=roommist', '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/mall/tag/roommist' } } }], 'wishlist': { 'count': 136 }, 'meta': { 'title': ' | Hermo Online Beauty Shop Malaysia', 'description': 'Your most loved is now available at HERMO Malaysia! Grab it now at the best price with FREE shipping included. Visit here for more details to experience the magic today!', 'keywords': ',W.Dressroom' }, 'breadcrumbs': [{ 'text': 'W.Dressroom', 'url': '/brand/543-wdressroom', '_click': { 'type': 'Brand', 'key': '543' } }, { 'text': 'Fragrance', 'url': '/fragrance', '_click': { 'type': 'Group', 'key': '3' } }, { 'text': 'Home Fragrance', 'url': '/fragrance/98-home-fragrance', '_click': { 'type': 'Category', 'key': '98' } }], 'theme': { 'background': null }, '_schema': { '@context': 'http://schema.org/', '@type': 'Product', 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'image': 'https://devshop.hermo.my/product_images/malls/45710_limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose_440_280_1574998710.png', 'description': 'German luxury undiluted solution, maintain natural and soft scent for bathroom, toilet, kitchen, bed room, work, shoe rack, car, capet, valentine gifts.', 'mpn': '', 'offers': { '@type': 'Offer', 'priceCurrency': 'MYR', 'price': '28.90', 'itemCondition': 'http://schema.org/NewCondition', 'availability': 'http://schema.org/InStock', 'seller': { '@type': 'Organization', 'name': 'Hermo MY' } }, 'brand': { '@type': 'Thing', 'name': 'W.Dressroom' }, 'category': { '@type': 'Thing', 'name': 'Home Fragrance' }, 'aggregateRating': { '@type': 'AggregateRating', 'bestRating': 5, 'ratingValue': 0, 'ratingCount': 0, 'worstRating': 0 } }, '_analytic': [{ 'moe_data': { 'id': 45710, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'group_id': 3, 'group_name': 'Fragrance', 'category_id': 98, 'category_name': 'Home Fragrance', 'sub_category_id': 0, 'sub_category_name': '', 'price': 28.9 }, 'event': 'analytic_productView' }], '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/mall/45710' } }, 'suggestions': [], '_gtm': [{ 'hermo.mall.id': 45710, 'hermo.mall.brand.id': 543, 'hermo.mall.group.id': 3, 'hermo.mall.category.id': 98, 'hermo.mall.subcategory.id': null, 'ematics.products': [{ 'id': '45710', 'categoryId': '98', 'price': 'RM28.90', 'quantity': 1, 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'brandName': 'W.Dressroom', 'desc': 'German luxury undiluted solution, maintain natural and soft scent for bathroom, toilet, kitchen, bed room, work, shoe rack, car, capet, valentine gifts.', 'imageUrl': 'https://devshop.hermo.my/product_images/malls/45710_limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose_440_280_1574998710.png', 'link': 'https://devshop.hermo.my/mall/45710-limited-edition-wdressroom-dress-living-clear-perfume-70ml-6-types-to-choose', 'totalPrice': '28.90', 'merchant': 'Hermo Creative', 'dimension2': 'Hermo Creative' }], 'event': 'mallView' }, { 'ecommerce': { 'currencyCode': 'MYR', 'detail': { 'products': [{ 'id': '45710', 'name': '[Limited Edition] W.Dressroom Dress & Living Clear Perfume 70ml [6 Types To Choose]', 'price': '28.90', 'brand': 'W.Dressroom', 'category': 'Home Fragrance' }] } }, 'event': 'ecProductDetail' }] }, 'qty': 1, 'merchantId': 1 }],
//     email: 'ac@g.com',
//     sms_prefix: '+6011',
//     sms_number: '12345678',
//     otp: '',
//     receiver_name: 'Lim Tien Ping',
//     line_1: '2606',
//     city: 'Johor Bahru',
//     postal_code: '81100',
//     state_code: 'MY-01',
// };
const PROMOTION_ID = 8722;
const CURRENCY = 'RM';
const initialState = {
    cart: [],
    email: '',
    sms_prefix: '+6010',
    sms_number: '',
    otp: '',
    receiver_name: '',
    line_1: '',
    city: '',
    postal_code: '',
    state_code: 'MY-01',
};

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                borderTopRightRadius: '2rem',
                borderTopLeftRadius: '2rem',
                marginBottom: '4rem',
            },
        },
    },
});

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            // ...mockData,
            ...initialState,
            cart: [],
            pageIndex: 0,
            total: 0,
            // openProduct: true,  // [TEST] => PRODUCT DETAILS TEST
            openProduct: false,
            // openCart: true, // [TEST] => ITEM IN CART
            openCart: false,
            openSnackBar: false,
            subtotal: 0,
            activeStep: 0,
            // formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        this.props.dispatch(actions.getProductList({ url: `/mall/list?promotion_id=${PROMOTION_ID}` }));
        this.props.dispatch(actions.getConfig());

        // this.props.dispatch(actions.getProduct({ id: 45710 })); // [TEST] => PRODUCT DETAILS TEST
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formsPage.otp.success !== this.props.formsPage.otp.success && nextProps.formsPage.otp.success) {
            this.setState({
                otpSent: true,
                canResend: false,
                sendSuccess: true,
                timer: nextProps.formsPage.otp.data.data.ttl,
            });

            if (this.state.sendClick) {
                this.resendTimer(nextProps.formsPage.otp.data.data.ttl);
            }
        }
        if (nextProps.formsPage.cart !== this.props.formsPage.cart && nextProps.formsPage.cart) {
            this.setState({ cart: nextProps.formsPage.cart });
        }
        // if (nextProps.formsPage.signup.data !== this.props.formsPage.signup.data && nextProps.formsPage.signup.success) {
        //     if (globalScope.token) {
        //         const { receiver_name, line_1, city, postal_code, state_code, sms_number, sms_prefix } = this.state;
        //         this.props.dispatch(actions.addAddress({ receiver_name, line_1, city, postal_code, state_code, sms_number, sms_prefix }));
        //     } else {
        //         alert('Signup failed');
        //     }
        // }
    }

    onClear = (event) => {
        this.setState({ [event.target.id]: '' });
    }

    checkCart = (id) => {
        const { cart } = this.state;
        let result = false;
        if (cart.length) {
            cart.forEach((item) => {
                if (item.id === id) {
                    result = true;
                }
            });
        }
        return result;
    }
    handleAddToCart = (item) => {
        this.props.dispatch(actions.updateCart([...this.state.cart, item]));
    }

    handleChange = (event, MAX) => {
        if (MAX) {
            if (event.target.value.length < MAX) {
                this.setState({ [event.target.id]: event.target.value });
            }
        } else {
            this.setState({ [event.target.id]: event.target.value });
        }
    }

    handleChangeNumber = (event, MAX = 15) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < MAX) {
            this.setState({ [event.target.id]: onlyNums });
        }
    }

    resendTimer = (RESEND_TIME) => {
        const interval = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState((prevState) => ({
                    timer: prevState.timer - 1,
                }));
            } else {
                clearInterval(interval);
                this.setState(() => ({
                    canResend: true,
                    timer: RESEND_TIME,
                    sendClick: false,
                    sendSuccess: false,
                }));
            }
        }, 1000);
        return (interval);
    }

    renderLoading = () => (
        <Backdrop className={this.props.classes.loader} open={true}>
            <CircularProgress />
        </Backdrop>
    )

    renderHeader = () => {
        const onClickPrev = () => {
            if (this.state.openCart) {
                return this.setState({ openCart: false });
            } else if (this.state.openProduct) {
                return this.setState({ openProduct: false });
            }
            return this.setState((state) => ({ pageIndex: state.pageIndex - 1 }));
        };
        const onClickNext = () => {
            this.setState((state) => ({ pageIndex: state.pageIndex + 1 }));
        };
        const disablePrev = !!(this.state.pageIndex === 0);
        const disableNext = () => {
            const { receiver_name, line_1, city, postal_code, state_code } = this.state;
            switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
                case 'product':
                    return !(this.state.cart.length > 0);
                case 'addressInfo' :
                    if (receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '' && state_code !== '') {
                        return false;
                    }
                    return true;
                case 'confirmOrder':
                    return !dataDig(globalScope, 'token');
                default:
                    return !!(this.state.pageIndex === formSetting.length - 1);
            }
        };
        return (
            <AppBar className={this.props.classes.header} position="fixed" color="default">
                <Toolbar className={this.props.classes.headerBar}>
                    <Hidden smDown={true}>
                        <Container className={this.props.classes.headerBar}>
                            {
                                this.state.pageIndex === 0 ?
                                    <IconButton>
                                        <Badge
                                            color="secondary"
                                            badgeContent={this.state.cart.length}
                                            invisible={this.state.cart.length === 0}
                                        >
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton>
                                    :
                                    <Button className={this.props.classes.prevButton} variant="outlined" color="primary" disabled={disablePrev} aria-label="prev" onClick={onClickPrev}>
                                        Prev
                                    </Button>
                            }
                            <Button type="submit" className={this.props.classes.nextButton} variant="outlined" color="primary" disabled={disableNext()} aria-label="Next" onClick={onClickNext}>
                                Next
                            </Button>
                        </Container>
                    </Hidden>
                    <Hidden mdUp={true}>
                        {
                            this.state.openProduct || this.state.pageIndex > 0 || this.state.openCart ?
                                <Box className={this.props.classes.leftHeader} component="span">
                                    <IconButton onClick={onClickPrev}>
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                    {
                                        this.state.openCart
                                        &&
                                        <Box component="span">
                                            <Typography variant="h1" color="primary" display="inline" style={{ fontSize: '2rem' }}>Cart</Typography>
                                            <Typography variant="h2" color="textSecondary" display="inline" style={{ fontSize: '1.9rem' }}> {this.state.cart.length}</Typography>
                                        </Box>
                                    }
                                </Box>
                                :
                                <Link href="https://www.hermo.my">
                                    <img src={require('images/hermo-logo.png')} alt="Hermo Logo" width="100%" height="100%" />
                                </Link>
                        }
                        {
                            !this.state.openCart
                            &&
                            <IconButton
                                disabled={this.state.cart.length === 0}
                                onClick={() => this.setState((state) => ({ openCart: !state.openCart }))}
                            >
                                <Badge
                                    color="secondary"
                                    badgeContent={this.state.cart.length}
                                    invisible={this.state.cart.length === 0}
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        }
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }

    renderFooter = () => {
        const onClickNext = () => {
            this.setState((state) => ({ pageIndex: state.pageIndex + 1 }));
        };
        const disableNext = () => {
            const { receiver_name, line_1, city, postal_code, state_code } = this.state;
            switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
                case 'product':
                    return !(this.state.cart.length > 0);
                case 'addressInfo' :
                    if (receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '' && state_code !== '') {
                        return false;
                    }
                    return true;
                case 'confirmOrder':
                    return !dataDig(globalScope, 'token');
                default:
                    return !!(this.state.pageIndex === formSetting.length - 1);
            }
        };
        return (
            <AppBar className={this.props.classes.footer} position="fixed" color="default">
                <Toolbar className={this.props.classes.footerBar} >
                    <Box>
                        <Typography variant="subtitle1" display="inline">Total</Typography>
                        <Typography variant="body1" display="inline" style={{ paddingLeft: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }} component="div">
                            {CURRENCY} {Number(this.state.total).toFixed(2)}
                        </Typography>
                        <Tooltip title="Summary" aria-label="summary">
                            <IconButton onClick={() => this.setState((state) => ({ openSummary: !state.openSummary }))}>
                                {
                                    this.state.openSummary ?
                                        <ExpandMore />
                                        :
                                        <ExpandLess />
                                }
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button className={this.props.classes.nextButton} variant="contained" color="primary" disabled={disableNext()} aria-label="Next" onClick={onClickNext}>
                        Next
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    renderProductList = (data) => {
        if (this.state.openProduct) {
            const product = dataDig(this.props.formsPage, 'product');
            const content = () => {
                if (dataDig(product, 'data')) {
                    return (
                        <ProductDetails
                            product={product.data}
                            addToCart={(item) => this.handleAddToCart(item)}
                            checkCart={this.checkCart}
                        />
                    );
                }
                if (dataDig(product, 'error')) {
                    return <Box>Product not found</Box>;
                }
                return <Box className={this.props.classes.productLoading}><CircularProgress /></Box>;
            };
            return (
                <Box className={this.props.classes.productDetails}>
                    {content()}
                </Box>
            );
        }
        return (
            <Container>
                <Grid container={true} alignItems="flex-start" spacing={2}>
                    {
                        data.items.map((product) => (
                            <Grid key={product.id} item={true} xs={6} md={3}>
                                <ProductCard
                                    product={product}
                                    image={true}
                                    onClickImage={() => {
                                        this.props.dispatch(actions.getProduct({ id: product.id }));
                                        this.setState({ openProduct: true });
                                    }}
                                    rating={true}
                                    disableBrandClick={true}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <MobileStepper
                    className={this.props.classes.stepper}
                    variant="dots"
                    steps={data._meta.pageCount}
                    position="static"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={() => {
                                this.props.dispatch(actions.getProductList({ url: data._links.next.href }));
                                this.setState((state) => ({ activeStep: state.activeStep + 1 }));
                            }}
                            disabled={this.state.activeStep === data._meta.pageCount - 1}
                        >
                            Next <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={() => {
                                this.props.dispatch(actions.getProductList({ url: data._links.prev.href }));
                                this.setState((state) => ({ activeStep: state.activeStep - 1 }));
                            }}
                            disabled={this.state.activeStep === 0}
                        >
                            <KeyboardArrowLeft /> Back
                        </Button>
                    }
                />
            </Container>
        );
    }

    renderDeliveryInfo = () => {
        const statesList = () => {
            if (!dataDig(this.props.formsPage, 'config.data.state.items.length')) {
                return null;
            }
            return this.props.formsPage.config.data.state.items.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.name}
                </option>
            ));
        };
        return (
            <Box className="address-form">
                <Paper>
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title}</Typography>
                        <AddressForm
                            handleChange={this.handleChange}
                            onClear={this.onClear}
                            state={this.state}
                            statesList={statesList()}
                            handleChangePostCode={(event) => this.handleChangeNumber(event, 6)}
                            handleChangeCity={(event) => this.handleChange(event, 51)}
                            hideExtra={true}
                        />
                    </Container>
                </Paper>
            </Box>
        );
    }

    renderSignUp = () => {
        const { sms_number, sms_prefix, email, otp } = this.state;
        const disableSubmit = () => {
            if (sms_number === '' || email === '' || otp === '') {
                return true;
            }
            return false;
        };
        const smsPrefixList = () => {
            if (!dataDig(this.props.formsPage, 'config.data.mobile_prefix.items.length')) {
                return null;
            }
            return this.props.formsPage.config.data.mobile_prefix.items.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.name}
                </option>
            ));
        };
        const handleSendOTP = () => {
            if (sms_number && sms_prefix) {
                this.props.dispatch(actions.sendOTP({ sms_prefix, sms_number }));
                this.setState({ sendClick: true });
            }
        };
        const handleSubmit = () => {
            event.preventDefault();
            const password = `${email.substr(0, 4).toUpperCase()}${otp}`;
            this.props.dispatch(actions.signUp({ sms_prefix, sms_number, email, tac: otp, password, password_confirmation: password }));
        };
        return (
            <Box className={this.props.classes.contact}>
                <Paper>
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title2}</Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth={true}>
                                <InputForm
                                    label="Email address"
                                    id="email"
                                    type="email"
                                    handleChange={this.handleChange}
                                    value={this.state.email}
                                    onClear={this.onClear}
                                />
                            </FormControl>
                            <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
                            <Grid container={true} direction="row" justify="space-around" align="stretch">
                                <Grid item={true} xs={3}>
                                    <FormControl variant="outlined">
                                        <Select
                                            native={true}
                                            id="sms_prefix"
                                            value={this.state.sms_prefix}
                                            onChange={this.handleChange}
                                            input={<OutlinedInput />}
                                            required={true}
                                        >
                                            {smsPrefixList()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={9}>
                                    <FormControl>
                                        <InputForm
                                            id="sms_number"
                                            handleChange={this.handleChangeNumber}
                                            value={this.state.sms_number}
                                            placeholder="e.g. 7654321"
                                            onClear={this.onClear}
                                            onClick={handleSendOTP}
                                            requestOTP={true}
                                            canResend={this.state.canResend}
                                            otpSent={this.state.otpSent}
                                            timer={this.state.timer}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FormControl fullWidth={true}>
                                <InputForm
                                    label="OTP Number"
                                    variant="outlined"
                                    id="otp"
                                    placeholder="e.g. 01234"
                                    handleChange={(event) => this.handleChangeNumber(event, 6)}
                                    value={this.state.otp}
                                    onClear={this.onClear}
                                />
                            </FormControl>
                            <Button fullWidth={true} type="submit" variant="contained" color="primary" disabled={disableSubmit()}>
                                Submit
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Box>
        );
    }

    renderConfirmOrder = () => {
        const { receiver_name, line_1, postal_code, city, state_code, sms_prefix, sms_number, pageIndex } = this.state;
        let state_name = '';
        const info = (title, detail) => (
            <Box>
                <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
                <Typography className="text-capitalize" variant="body1" component="div" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{detail}</Typography>
            </Box>
        );
        if (dataDig(this.props.formsPage.config, 'data.state.items.length')) {
            this.props.formsPage.config.data.state.items.forEach((item) => {
                if (item.value === state_code) {
                    state_name = item.name;
                }
            });
        }
        return (
            <Box>
                <Paper className="mt-1">
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[pageIndex].title1}</Typography>
                        <Paper className="p-1">
                            <IconButton
                                onClick={() => this.setState({ pageIndex: 1 })}
                                style={{ float: 'right' }}
                            >
                                <Edit />
                            </IconButton>
                            {info('Receiver', receiver_name)}
                            {info('Contact', `${sms_prefix}${sms_number}`)}
                            {info('Address', <Box>{line_1},<br />{postal_code}, {city},<br />{state_name}, Malaysia</Box>)}
                        </Paper>
                    </Container>
                </Paper>
            </Box>
        );
    }
    renderPayment= () => (
        <Box>
            <Paper className="mt-1">
                <Container className="py-2">
                    <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title}</Typography>
                </Container>
            </Paper>
        </Box>
    )

    renderFormPage = () => {
        const data = dataDig(this.props.formsPage.productList, 'data');
        switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
            case 'product':
                if (dataDig(data, 'items.length')) {
                    return this.renderProductList(data);
                } else if (dataDig(data, 'items.length') === 0) {
                    return <Typography>No product found</Typography>;
                } else if (dataDig(this.props.formsPage.productList, 'error')) {
                    return (
                        <Typography>{this.props.formsPage.productList.data.messages[0].text}</Typography>
                    );
                }
                return this.renderLoading();
            case 'addressInfo': return this.renderDeliveryInfo();
            case 'confirmOrder':
                if (dataDig(globalScope, 'token')) {
                    return this.renderConfirmOrder();
                }
                return this.renderSignUp();
            case 'payment': return this.renderPayment();
            default: return <Box>Unknown page index</Box>;
        }
    }

    renderCart = (cart) => {
        const handleCart = (type, params) => {
            const changeQty = (operation) => {
                cart.forEach((item, count) => {
                    if (count === params) {
                        if (operation === '+') {
                            // eslint-disable-next-line no-param-reassign
                            item.qty += 1;
                        } else if (operation === '-') {
                            // eslint-disable-next-line no-param-reassign
                            item.qty -= 1;
                        }
                    }
                });
            };
            const updateCart = (item = [...cart]) => this.props.dispatch(actions.updateCart(item));
            switch (type) {
                case 'remove':
                    cart.splice(params, 1);
                    updateCart();
                    break;
                case 'removeAll':
                    updateCart([]);
                    break;
                case 'removeMultiple':
                    for (let i = params.length - 1; i >= 0; i--) {
                        cart.splice(params[i], 1);
                    }
                    updateCart();
                    break;
                case 'addQty':
                    changeQty('+');
                    updateCart();
                    break;
                case 'reduceQty':
                    changeQty('-');
                    updateCart();
                    break;
                default:
                    break;
            }
        };
        return (
            <Box>
                <Cart
                    items={this.state.cart}
                    handleCart={handleCart}
                />
            </Box>
        );
    }
    renderSummary = () => (
        <Box className="py-1">
            <Box className={this.props.classes.summaryHeader}>
                <IconButton onClick={() => this.setState({ openSummary: false })}>
                    <Close />
                </IconButton>
                <Typography variant="h5" display="inline">Summary</Typography>
            </Box>
            <Divider />
            <Box className="py-2 px-2">
                <Box className={this.props.classes.summaryContent}>
                    <Typography variant="h6" display="inline">
                        Subtotal:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" display="inline" style={{ fontSize: '1.4rem' }}>
                        {CURRENCY} {Number(this.state.subtotal).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )


    render = () => (
        <Box className="fast-checkout-page">
            {/* <Box className="ppf-version">
                {globalScope.formVersion}
            </Box> */}
            {this.renderHeader()}
            <Box className={this.props.classes.content}>
                {
                    this.state.openCart ?
                        this.renderCart(this.state.cart)
                        :
                        this.renderFormPage()
                }
            </Box>
            <ThemeProvider theme={theme}>
                <Drawer
                    anchor="bottom"
                    open={this.state.openSummary}
                    onClose={() => this.setState({ openSummary: false })}
                >
                    {this.renderSummary()}
                </Drawer>
            </ThemeProvider>
            <Snackbar
                className={this.props.classes.snackbar}
                open={this.state.openSnackBar}
                autoHideDuration={2000}
                message={<Typography>Item added into cart</Typography>}
                onClose={() => this.setState({ openSnackBar: false })}
            />
            {this.renderFooter()}
        </Box>
    );
}

FormsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    formsPage: makeSelectFormsPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'formsPage', reducer });
const withSaga = injectSaga({ key: 'formsPage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(FormsPage);
