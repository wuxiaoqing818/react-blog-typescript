import React, { useState, useEffect } from 'react'
import './style.less'
import { Row, Col, Menu, Divider } from "antd"
import { useHistory, Link } from 'react-router-dom';
import { HomeFilled, SmileFilled, StarFilled, LikeFilled } from '@ant-design/icons';
// import api from "@services"
import api from "../../services"
import { TypeInfoType } from '../../typings/common'


const Header = () => {
    let history = useHistory()
    const [navArr, setNavArr] = useState<Array<TypeInfoType>>([])
    const [currentId,setCurrentId] = useState<number>(0)
    useEffect(() => {
        api.header.getTypeInfo().then((res: { data: any }) => {
            console.log(res)
            setNavArr([...navArr, ...res.data])
        })
    }, [])



    const handleClick = (id: number) => {
        console.log(id)
        setCurrentId(id)
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
        <div className="header">
            <Row justify="center" align="middle">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">小阿晴i</span>
                    <span className="header-txt">专注前端开发，喜欢和小姐姐一起学习。</span>
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <ul className="clearfix">
                        <li 
                        key="home"
                         onClick={e => handleClick(0)}
                         className={[currentId===0?"active":null].join(' ')}
                         >
                            <HomeFilled />
                            首页
                        </li>
                        {
                            navArr.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={[currentId===item.id?"active":null].join(' ')}

                                        onClick={e => handleClick(item.id)}>
                                        {{
                                            1: <StarFilled />,
                                            2: <SmileFilled />,
                                            3: <LikeFilled />
                                        }[item.icon]}
                                        {item.typeName}

                                    </li>

                                )
                            })
                        }
                    </ul>
                    {/* <Menu mode="horizontal">
                        <Menu.Item key="home" icon={<HomeFilled />} onClick={e => handleClick(0)}>

                            首页
                        </Menu.Item>
                        {
                            navArr.map((item, index) => {
                                return (
                                    <Menu.Item
                                        key={index}
                                        icon={
                                            {
                                                1: <StarFilled />,
                                                2: <SmileFilled />,
                                                3: <LikeFilled />
                                            }[item.icon]
                                        }
                                        onClick={e => handleClick(item.id)}>
                                        {item.typeName}

                                    </Menu.Item>

                                )
                            })
                        }


                    </Menu> */}
                </Col>

            </Row>

        </div>

    )
}










export default Header