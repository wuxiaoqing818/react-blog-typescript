
import React, { memo,FC,ReactElement } from 'react';
import "./style.less"



const Footer:FC = ():ReactElement => {
    return (
        <div className="footer">
            <div>欢迎来到小阿晴i的博客</div>
            <div>aqingi.cn</div>
        </div>
    )


}



export default memo(Footer)
