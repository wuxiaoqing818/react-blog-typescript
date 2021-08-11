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
import { Row, Col, List, Tooltip, message, Spin } from "antd"
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
import Tree from "@components/TreeList"
import { FieldTimeOutlined, TrophyOutlined, CodeOutlined } from '@ant-design/icons';
import api from "@services/index"
import marked from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"
import InfiniteScroll from 'react-infinite-scroller';

interface ArticleType {
    addTime: string;
    id: number;
    introduce: string,
    title: string,
    typeName: string,
    view_count: number;
}


const Home = () => {

    let history = useHistory();
    const [mylist, setMylist] = useState<Array<ArticleType>>([])
    const [list, setList] = useState<Array<ArticleType>>([])
    const [pageSize, setPageSize] = useState<number>(5)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        // @ts-ignore
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code: string) {
            return hljs.highlightAuto(code).value
        }
    })
    useEffect(() => {
        api.home.getArticleList().then((res: { data: any }) => {
            console.log(res)
            setMylist(res.data.slice(0, pageNumber * pageSize))
            setPageNumber(pageNumber + 1)
            setList(res.data)
        })
    }, [])

    // console.log(new Date().getTime())
    const linkDetailed = (id: any) => {
        history.push({
            pathname: '/detailed',
            search: `?id=${id}`,
            hash: '',
            state: { detailedParams: { id: id } }
        })

    }

    const handleInfiniteOnLoad = () => {

        if (mylist.length >= list.length) {
            message.warning('到底了宝宝');
            setHasMore(false)
            setLoading(false)
            return false;
        }
        setLoading(true)
        setTimeout(() => {
            console.log(pageNumber * pageSize)
            setMylist(list.slice(0, (pageNumber + 1) * pageSize))
            setLoading(false)
            setPageNumber(pageNumber + 1)
        }, 500);



    };


    return (
        <div className="home">
            <Header></Header>
            <Row className="comm-main" justify="center" >
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!loading && hasMore}
                        useWindow={true}
                    >
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={(item: ArticleType) => (
                                <List.Item key={item.id}>
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
                                            < FieldTimeOutlined />
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
                        >

                            {loading && hasMore && (
                                <div style={{ textAlign: 'center' }}>
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                    {/* <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={(item: ArticleType) => (
                            <List.Item>
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
                                        < FieldTimeOutlined />
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
                    /> */}
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author></Author>
                    <Advert></Advert>
                    <Tree />
                    <div className="detailed-nav">
                        <div className="nav-title">文章列表</div>

                        <ul>
                            {
                                mylist.map((item: ArticleType, index) => {

                                    return (

                                        <li onClick={e => linkDetailed(item.id)} key={index}>
                                            <span className="serial-number">{index + 1}</span>


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

