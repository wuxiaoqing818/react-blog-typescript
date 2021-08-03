/*
 * @Author: 吴晓晴
 * @Date: 2021-05-24 21:49:42
 * @LastEditTime: 2021-08-03 23:26:09
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\react-blog-typescript\src\services\mylist.ts
 */
import {post,get} from "../config/axios"
import {paramsType} from "./typings"

//请求方式
const getListById = (data:paramsType)=> get('/default/getListById/'+data.id,{});


export default{
    getListById
}