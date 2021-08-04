import React,{FC,ReactElement}from 'react'
import { Spin } from 'antd';
import './style.less'

const SuspenseLoading:FC=():ReactElement=> {
    return (
        <div className="Suspense-loading">
            <Spin size="large"/>
        </div>
    )
}

export default SuspenseLoading
