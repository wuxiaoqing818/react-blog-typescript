import React from 'react'
import { Button } from 'antd';

export default function index() {
    return (
        <div>
            <Button>测试按钮</Button>
            <Button className="hello">测试按钮带className</Button>
            <h2 className="hello">测试</h2>
        </div>
    )
}
