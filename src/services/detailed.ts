/*
 * @Author: 吴晓晴
 * @Date: 2021-05-23 13:53:19
 * @LastEditTime: 2021-08-03 23:26:12
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\react-blog-typescript\src\services\detailed.ts
 */
import {get} from "../config/axios"
import {paramsType} from "./typings"




//请求方式
const getDetailedInfo = (data:paramsType)=> get('/default/getArticleById/'+data.id,{});


export default{
    getDetailedInfo
}