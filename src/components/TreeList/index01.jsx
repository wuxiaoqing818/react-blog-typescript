import React, { useEffect, useState, useRef } from 'react';//首先引入hooks常用方法
import { Tree } from 'antd';  //引入组件
import { DownOutlined } from '@ant-design/icons'; //引入图标
const TreeList = (props) => {
    const treeData = [{
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                    },
                ],
            },
        ],
    }]
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }


    return (
        <div className="myDemo" >
            <Tree
                showLine={true}   //是否开启节点之间带连接线的树  开启之后可以用 switcherIcon 修改默认图标
                switcherIcon={<DownOutlined />}  //默认图标
                defaultExpandedKeys={['0-0-0']}  //默认展开指定的树节点 key 
                onSelect={onSelect}  //点击树节点触发的回调
                treeData={treeData}
            />
        </div >
    )
}
//暴露此组件
export default TreeList
