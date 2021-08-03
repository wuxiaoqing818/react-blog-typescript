import React, { memo, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./style.less"
import { Row, Col, List, Breadcrumb, Tooltip } from "antd"
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
import { SettingOutlined, FieldTimeOutlined } from '@ant-design/icons';
import api from "@services"


const MyList = (props) => {
    let history = useHistory();

    const [mylist, setMylist] = useState([])
    useEffect(() => {
        const { location } = props;
        let mylistParams;
        if (location.state && location.state.params) {//判断当前有参数
            mylistParams = location.state.params;
            sessionStorage.setItem('mylistParams', JSON.stringify(mylistParams));// 存入到sessionStorage中
        } else {
            mylistParams = JSON.parse(sessionStorage.getItem('mylistParams'));// 当state没有参数时，取sessionStorage中的参数
        }
        console.log(mylistParams.id)
        api.mylist.getListById({
            id: mylistParams.id
        }).then(res => {
            console.log(res)
            setMylist(res.data)

        })


    }, [props])

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
                    />
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

