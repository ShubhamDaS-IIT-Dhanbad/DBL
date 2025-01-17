import {configureStore} from '@reduxjs/toolkit';

import pincodestate from '../features/pincodeUpdatedSlice.jsx'

// search page
import searchproducts from '../features/searchProductSlice.jsx'
import searchproductfiltersection from '../features/searchProductFilterSectionSlice.jsx'
import searchproductsortbysection from '../features/searchProductSortbySectionSlice.jsx'

//search shops
import searchshops from '../features/searchShopSlice.jsx'
import searchshopfiltersection from '../features/searchShopFilterSectionSlice.jsx'
import searchshopsortbysection from '../features/searchShopSortbySectionSlice.jsx'
import singleshops from '../features/singleShopSlice.jsx'


//refurbished products
import refurbishedproducts from '../features/refurbishedProductsSlice.jsx'
import refurbishedproductfiltersection from '../features/refurbishedProductFilterSectionSlice.jsx'
import refurbishedproductsortbysection from '../features/refurbishedProductSortbySectionSlice.jsx'

//user refurbished products
import userRefurbishedProducts from '../features/user/userAllRefurbishedProductsSlice.jsx'

const store=configureStore({
    reducer:{
        pincodestate:pincodestate,

        // search page
        searchproducts:searchproducts,
        searchproductfiltersection:searchproductfiltersection,
        searchproductsortbysection:searchproductsortbysection,

        //search shops
        searchshops:searchshops,
        searchshopfiltersection:searchshopfiltersection,
        searchshopsortbysection:searchshopsortbysection,
        singleshops:singleshops,

        //refurbished products
        refurbishedproducts:refurbishedproducts,
        refurbishedproductfiltersection:refurbishedproductfiltersection,
        refurbishedproductsortbysection:refurbishedproductsortbysection,


        //user refurbished products
        userRefurbishedProducts:userRefurbishedProducts,

    }
});
export default store;