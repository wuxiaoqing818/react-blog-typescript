/*
 * @Author: 吴晓晴
 * @Date: 2021-05-24 21:49:42
 * @LastEditTime: 2021-05-24 23:06:00
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\services\mylist.js
 */
import {post,get} from "../config/axios"
import {paramsType} from "./interface"

//请求方式
const getListById = (data:paramsType)=> get('/default/getListById/'+data.id,{});


export default{
    getListById
}