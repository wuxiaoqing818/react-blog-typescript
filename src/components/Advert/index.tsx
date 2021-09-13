/*
 * @Author: 吴晓晴
 * @Date: 2021-08-03 22:54:22
 * @LastEditTime: 2021-08-04 00:06:36
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\react-blog-typescript\src\components\Advert\index.tsx
 */

import React, { memo, FC, ReactElement, useEffect, useState } from 'react';
import "./style.less"
import UsePrevious from "../../hooks/usePrevious"

interface AdvertType {
    name: string;
    href:string
}


const arr: AdvertType[] = [
    { name: 'react中文文档', href:'https://react.docschina.org/'},
    { name: 'vue中文文档' ,href:'https://cn.vuejs.org/'},
    { name: 'element中文文档' ,href:'https://element.eleme.cn/#/zh-CN'},
    { name: 'antd中文文档' ,href:'https://ant.design/index-cn'},
]


const Advert: FC = (): ReactElement => {
    // const [count, setCount] = useState<number>(1)
    // useEffect(() => {
    //     let timer = setTimeout(() => {
    //         setCount(count + 1)
    //     }, 2000);
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [count])

    // const prevCount = UsePrevious(count)


    return (
        <div className="advert">
            {/* <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" /></div>
            <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" /></div>
            <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div> */}
            <h2>学习文档</h2>
            {/* <h1>{`prev:${prevCount} current:${count}`}</h1> */}
            <ul>
                {
                    arr.map((item, index) => {
                        return (
                            <li
                                key={index}
                            >
                                <a href={item.href} target="view_window">{item.name}</a>
                            </li>

                        )
                    })
                }
            </ul>

        </div>
    )


}



export default memo(Advert)
