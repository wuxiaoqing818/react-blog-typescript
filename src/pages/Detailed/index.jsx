
import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.less"
import { Row, Col, Breadcrumb, Affix, Tooltip } from "antd"
import { SettingOutlined,StarFilled,SmileFilled,LikeFilled } from '@ant-design/icons';
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
import api from "@services"

import marked from "marked"








const Detailed = (props) => {


    let history = useHistory()
    const [detailedInfo, setDetailedInfo] = useState({ title: '' })
    const [html, setHtml] = useState('')
    const [mylist, setMylist] = useState([])



    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })



    useEffect(async () => {
        console.log(props)
        const { location } = props;
        let detailedParams;
        if (location.state && location.state.detailedParams) {//判断当前有参数
            detailedParams = location.state.detailedParams;
            sessionStorage.setItem('detailedParams', JSON.stringify(detailedParams));// 存入到sessionStorage中
        } else {
            detailedParams = JSON.parse(sessionStorage.getItem('detailedParams'));// 当state没有参数时，取sessionStorage中的参数
        }
        console.log(detailedParams.id)
        const data = await getDetailedInfo(detailedParams.id)
        const list = await getListById(data.typeId)
        const otherList = list.filter(item => item.id != data.id)
        setDetailedInfo(data)
        setHtml(data.article_content)
        setMylist(otherList)
    }, [html, props])

    //获取文章详情
    const getDetailedInfo = (id) => {
        return new Promise(resolve => {
            api.detailed.getDetailedInfo({ id }).then(res => {
                resolve(res.data[0])
            })

        })

    }

    //获取当前类型的文章列表  
    const getListById = (id) => {
        return new Promise(resolve => {
            api.mylist.getListById({
                id
            }).then(res => {
                resolve(res.data)

            })
        })
    }

    const linkDetailed = (id) => {
        history.push({
            pathname: '/detailed',
            search: `?id=${id}`,
            hash: '',
            state: { detailedParams: { id: id } }
        })

    }

    const linkMyList = (id) => {
        if (id) {
            history.push({
                pathname: '/mylist', search: `?id=${id}`,
                hash: '', state: { params: { id: id } }
            })
        } else {
            history.push({
                pathname: '/'
            })
        }
    }


    return (
        <div className="detailed">
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center" >
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
                    <div>
                        <div className="bread-box">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <a href="/">首页</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => linkMyList(detailedInfo.typeId)}>
                                        {detailedInfo.typeName}
                                    </span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {detailedInfo.title.slice(0, 10) + '...'}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">
                                {detailedInfo.title}
                            </div>
                            <div className="list-icon center">
                                <span>
                                    <SettingOutlined />{detailedInfo.addTime}
                                </span>
                                <span>
                                    {
                                        {
                                            1: <StarFilled />,
                                            2: <SmileFilled />,
                                            3: <LikeFilled />
                                        }[detailedInfo.typeId]
                                    }
                                    {detailedInfo.typeName}
                                </span>
                                <span>
                                    <SettingOutlined />{detailedInfo.view_count}
                                </span>

                            </div>
                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: marked(html) }}


                            >

                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
                    <Author></Author>
                    <Advert></Advert>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">同类型文章</div>

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
                    </Affix>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}

export default memo(Detailed)
