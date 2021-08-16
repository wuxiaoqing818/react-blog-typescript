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
    name: string
}


const arr: AdvertType[] = [
    { name: '猪哥yyds' },
    { name: '蛇蛇yyds' },
    { name: '彭于晏yyds' },
    { name: '罐神yyds' },
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
            <h2>前端四大才子</h2>
            {/* <h1>{`prev:${prevCount} current:${count}`}</h1> */}
            <ul>
                {
                    arr.map((item, index) => {
                        return (
                            <li
                                key={index}
                            >
                                {item.name}
                            </li>

                        )
                    })
                }
            </ul>

        </div>
    )


}



export default memo(Advert)
