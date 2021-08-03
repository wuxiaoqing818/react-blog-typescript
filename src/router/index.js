/*
 * @Author: 吴晓晴
 * @Date: 2021-05-19 22:21:05
 * @LastEditTime: 2021-05-22 22:49:39
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\router\index.js
 */
import React from 'react';
// import {
//     Redirect
// } from "react-router-dom";
const Home = React.lazy(() => import("@/pages/Home"));
const MyList = React.lazy(() => import("@/pages/MyList"));
const Detailed = React.lazy(() => import("@/pages/Detailed"));




const routes = [{
        path: "/",
        exact: true,
        component: Home
    },

    {
        path: "/mylist",
        component: MyList
    },
    {
        path: "/detailed",

        component: Detailed

    }
]

export default routes