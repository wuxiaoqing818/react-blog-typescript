/*
 * @Author: 吴晓晴
 * @Date: 2021-05-24 21:49:42
 * @LastEditTime: 2021-05-24 21:50:23
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\services\header.js
 */
import {post,get} from "../config/axios"



//请求方式
const getTypeInfo = (data:object)=> get('/default/getTypeInfo',data);


export default{
    getTypeInfo
}