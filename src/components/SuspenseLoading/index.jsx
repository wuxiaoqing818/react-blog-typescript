import React from 'react'
import { Spin } from 'antd';
import './style.less'

export default function SuspenseLoading() {
    return (
        <div className="Suspense-loading">
            <Spin size="large"/>
        </div>
    )
}
