
import React, { memo } from 'react';
import "./style.less"



const arr  = [
    {name:'猪哥yyds'},
    {name:'蛇蛇yyds'},
    {name:'彭于晏yyds'},
    {name:'罐神yyds'},
]




const Advert = () => {

    return (
        <div className="advert">
            {/* <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" /></div>
            <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" /></div>
            <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div> */}
            <h2>前端四大才子</h2>
           <ul>
           {
                arr.map((item,index)=>{
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
