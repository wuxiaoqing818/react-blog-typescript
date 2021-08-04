/*
 * @Author: 吴晓晴
 * @Date: 2021-05-22 20:25:28
 * @LastEditTime: 2021-07-25 18:06:55
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\pages\Home\index.jsx
 */
/*
 * @Author: 吴晓晴
 * @Date: 2021-05-19 22:21:05
 * @LastEditTime: 2021-05-23 13:47:39
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\wxq-blog\src\pages\Home\index.jsx
 */
import React, { memo, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./style.less"
import { Row, Col, List,Tooltip } from "antd"
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
import Tree from "@components/TreeList"
import { FieldTimeOutlined, TrophyOutlined,CodeOutlined } from '@ant-design/icons';
import api from "@services"

import marked from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"






const Home = () => {

    let history = useHistory();
    const [mylist, setMylist] = useState([])

    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    useEffect(() => {
        api.home.getArticleList().then(res => {
            console.log(res)
            setMylist(res.data)
        })
    }, [])

    // console.log(new Date().getTime())
    const linkDetailed = (id) => {
        history.push({
            pathname: '/detailed',
            search: `?id=${id}`,
            hash: '',
            state: { detailedParams: { id: id } }
        })

    }


    return (
        <div className="home">
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center" >
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                {/* <div className="list-title" onClick={linkDetailed(item.id)}>{item.title}</div> */}
                                <div className="list-title">
                                    <Link to={{
                                        pathname: '/detailed',
                                        search: `?id=${item.id}`,
                                        hash: '',
                                        state: { detailedParams: { id: item.id } }
                                    }} style={{ cursor: 'pointer' }}>
                                        {item.title}
                                    </Link>

                                </div>
                                <div className="list-icon">
                                    <span>
                                        < FieldTimeOutlined/>
                                        {item.addTime}
                                    </span>
                                    <span>
                                        <TrophyOutlined />
                                        {item.typeName}
                                    </span>
                                    <span>
                                        <CodeOutlined />
                                        {item.view_count}
                                    </span>
                                </div>
                                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author></Author>
                    <Advert></Advert>
                    <Tree/>
                    <div className="detailed-nav">
                        <div className="nav-title">文章列表</div>

                        <ul>
                            {
                                mylist.map((item, index) => {

                                    return (
                                      
                                        <li onClick={e => linkDetailed(item.id)} key={index}>
                                        <span className="serial-number">{index+1}</span>


                                        <Tooltip placement="left" title={item.title}>

                                            <span className="article-title">{item.title}</span>

                                        </Tooltip>
                                    </li>
                                    )
                                })
                            }
                        </ul>



                    </div>
                </Col>
            </Row>

            <Footer></Footer>

            {/* 袁瑞普是傻逼 */}
{/* 
            <div className="parent">
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
            </div> */}
        </div>


    )

}







export default memo(Home)

