import React, { memo, useState, useEffect, FC, ReactElement } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./style.less"
import { Row, Col, List, Breadcrumb, Tooltip, message, Spin } from "antd"
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
import { SettingOutlined, FieldTimeOutlined } from '@ant-design/icons';
import api from "@services/index"
import InfiniteScroll from 'react-infinite-scroller';

interface ArticleType {
    addTime: string;
    id: number;
    introduce: string,
    title: string,
    typeName: string,
    view_count: number;
}

interface PropsType {
    location: any
}




const MyList: FC<PropsType> = (props): ReactElement => {
    let history = useHistory();

    const [mylist, setMylist] = useState<Array<ArticleType>>([])
    const [list, setList] = useState<Array<ArticleType>>([])
    const [pageSize, setPageSize] = useState<number>(5)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    useEffect(() => {
        const { location } = props;
        let mylistParams;
        if (location.state && location.state.params) {//判断当前有参数
            mylistParams = location.state.params;
            sessionStorage.setItem('mylistParams', JSON.stringify(mylistParams));// 存入到sessionStorage中
        } else {
            // @ts-ignore
            mylistParams = JSON.parse(sessionStorage.getItem('mylistParams'));// 当state没有参数时，取sessionStorage中的参数
        }
        console.log(mylistParams.id)
        api.mylist.getListById({
            id: mylistParams.id
        }).then((res: any) => {
            console.log(res)
            setMylist(res.data.slice(0, pageNumber * pageSize))
            setPageNumber(pageNumber + 1)
            setList(res.data)

        })


    }, [props])

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
                    <div className="bread-box">

                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/">首页</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {mylist[0]?.typeName || '该类型无数据'}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

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
                            renderItem={item => (
                                <List.Item onClick={e => linkDetailed(item.id)}>
                                    <div className="list-title">{item.title}</div>
                                    <div className="list-icon">
                                        <span>
                                            <SettingOutlined />
                                            {item.addTime}
                                        </span>
                                        <span>
                                            <FieldTimeOutlined />
                                            {item.typeName}
                                        </span>
                                        <span>
                                            <SettingOutlined />
                                            {item.view_count}
                                        </span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
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
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author></Author>
                    <Advert></Advert>
                    <div className="detailed-nav">
                        <div className="nav-title">文章列表</div>

                        <ul>
                            {
                                mylist.map((item, index) => {

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
        </div>


    )

}



export default memo(MyList)

