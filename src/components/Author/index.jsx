
import React, { memo, useState } from 'react';
import "./style.less"
import { Avatar, Divider, Popover } from "antd"
import { GithubFilled, QqCircleFilled, WechatFilled } from '@ant-design/icons';
import DrawerBox from '../Drawer';
import Mallki from '@/components/Mallki'









const Author = () => {

    const [drawerVisible, setDrawerVisible] = useState(false);


    const closeDrawer = e => {
        setDrawerVisible(false)
    }

    const qqContent = (
        <div>
            <p>1874424779</p>
        </div>
    )

    const githubContent = (
        <div>
            <p>https://github.com/wuxiaoqing818</p>
        </div>
    )

    const weixinContent = (
        <div>
            <p>NV1874424779</p>
        </div>
    )



    return (
        <div className="author">
            <div className="author-div comm-box" >
                <div>
                    <Avatar
                        size={80}
                        src={require("../../assets/img/avatar.jpg").default}
                        className="avatar"
                        // onClick={e => setDrawerVisible(true)}
                        onMouseOver={e => setDrawerVisible(true)}
                    />
                    <div className="author-introdution">
                      
                        <Mallki className="mallki-text" text="只会吹牛逼的菜鸡前端日哥" />
                        <Divider>社交账号</Divider>
                        <Popover content={githubContent} title="GitHub">
                            <Avatar size={28} icon={<GithubFilled style={{ color: 'green' }} />} className="account" />
                        </Popover>
                        <Popover content={qqContent} title="QQ">

                            <Avatar size={28} icon={<QqCircleFilled style={{ color: 'green' }} />} className="account" />
                        </Popover>
                        <Popover content={weixinContent} title="Wechat">

                            <Avatar size={28} icon={<WechatFilled style={{ color: 'green' }} />} className="account" />
                        </Popover>


                    </div>
                </div>
            </div>
            <DrawerBox drawerVisible={drawerVisible} closeDrawer={closeDrawer} />
        </div>
    )


}



export default memo(Author)
