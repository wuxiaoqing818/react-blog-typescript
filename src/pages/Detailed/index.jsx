
import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.less"
import { Row, Col, Breadcrumb, Affix, Tooltip } from "antd"
import { SettingOutlined } from '@ant-design/icons';
import Header from "@components/Header"
import Author from "@components/Author"
import Advert from "@components/Advert"
import Footer from "@components/Footer"
// import ReactMarkdown from "react-markdown"
// import MarkNav from "markdown-navbar"
// import "markdown-navbar/dist/navbar.css"
import api from "@services"

import marked from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"

import Tocify from '@components/tocify.tsx'







const Detailed = (props) => {

    // let markdown = '# P01:课程介绍和环境搭建\n' +
    //     '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    //     '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    //     '**这是加粗的文字**\n\n' +
    //     '*这是倾斜的文字*`\n\n' +
    //     '***这是斜体加粗的文字***\n\n' +
    //     '~~这是加删除线的文字~~ \n\n' +
    //     '\`console.log(111)\` \n\n' +

    //     '# p02:来个Hello World 初始Vue3.0\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n' +
    //     '***\n\n\n' +
    //     '# p03:Vue3.0基础知识讲解\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n\n' +
    //     '# p04:Vue3.0基础知识讲解\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n\n' +
    //     '#5 p05:Vue3.0基础知识讲解\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n\n' +
    //     '# p06:Vue3.0基础知识讲解\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n\n' +
    //     '# p07:Vue3.0基础知识讲解\n' +
    //     '> aaaaaaaaa\n' +
    //     '>> bbbbbbbbb\n' +
    //     '>>> cccccccccc\n\n' +
    //     '``` var a=11; ```'

    let history = useHistory()
    const [detailedInfo, setDetailedInfo] = useState({ title: '' })
    const [html, setHtml] = useState('')
    const [mylist, setMylist] = useState([])

    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
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
        // console.log(otherList)
        // console.log(data)
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



    // useEffect(() => {
    //     setHtml(markdown)
    //     setMarkDownStr(markdown)

    // }, [html, markedDownStr])
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
                                    {detailedInfo.typeName}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {detailedInfo.title.slice(0, 10) + '...'}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">
                                React实战技术教程
                            </div>
                            <div className="list-icon center">
                                <span>
                                    <SettingOutlined />{detailedInfo.addTime}
                                </span>
                                <span>
                                    <SettingOutlined />{detailedInfo.typeName}
                                </span>
                                <span>
                                    <SettingOutlined />{detailedInfo.view_count}
                                </span>

                            </div>
                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: marked(html) }}


                            >
                                {/* <ReactMarkdown
                                    children={html}
                                    escapeHtml={false}
                                /> */}



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
                                                    <span className="serial-number">{index+1}</span>


                                                    <Tooltip placement="left" title={item.title}>

                                                        <span className="article-title">{item.title}</span>

                                                    </Tooltip>
                                                </li>
                                        
                                        )
                                    })
                                }
                            </ul>


                            {/* <MarkNav
                                className="article-menu"
                                source={markedDownStr}
                                ordered={false}
                                
                            /> */}

                            {/* <div className="toc-list" style={{height:'100px'}}>
                                {tocify && tocify.render()}
                            </div> */}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}

export default memo(Detailed)
