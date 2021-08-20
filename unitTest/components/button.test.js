// button.test.js
import TestButton from '../../src/components/TestButton';
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow, configure } from 'enzyme'; // shallow(浅渲染，只渲染父组件)
import Adapter from 'enzyme-adapter-react-16'; // 适应React-16
configure({ adapter: new Adapter() }); // 适应React-16，初始化
const props = {
    text: '按钮测试用例',
    type: 'white',
    style: { marginTop: 15 },
    size: 'big',
    disabled: false,
    height: 'middle',
    isLock: true,
    cname: 'hello',
    onClick: () => {}
};
describe('test Button', () => {
    it('button render correctly', () => {
        const tree = renderer.create(<TestButton {...props} />).toJSON();// 生成快照
        expect(tree).toMatchSnapshot(); // 匹配之前的快照
    });
});
