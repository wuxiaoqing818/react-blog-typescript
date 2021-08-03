/*
 * @Author: 吴晓晴
 * @Date: 2021-08-03 22:54:22
 * @LastEditTime: 2021-08-04 00:07:17
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\react-blog-typescript\src\components\Drawer\index.tsx
 */
import React, { useState, useEffect, FC, ReactElement } from 'react';
// import TypingCard from '@components/TypingCard'
// import Mallki from '@/components/Mallki'
import TypingCard from '../TypingCard'
import Mallki from '../Mallki'
import { Drawer } from 'antd';
import "./style.less"


const cardContent: string = `
1、一花一世界，一叶一追寻，一曲一场叹，一生为一人。人世间有种爱，没有奢求，没有谁对谁错，
亦不怪缘浅情深，对望，两两相知；转身，无怨无悔。默默里，珍藏聚散离合，只消得，一季花香，暖到落泪。
<br>
<br>
2、有暖风在心中，何必畏惧寒冬。生活，是一张多彩的网。主要由红、绿、蓝三种主流色调编织而成。
红色是炽热如火的亲情，绿色是生机勃发的友情，蓝色是清纯美丽的爱情。
<br>
<br>
3、流年花寂，风儿滑过脸颊，懵懂的记忆覆盖了深幽的冬季，如雪静涤心灵，一种温暖于心才会绽放花蕾，
暗香美丽了心野。才会弹奏一曲梅花三弄，让一种心情跳跃着音符流淌在雪海，独钓月色寒江。
<br>
<br>
4、忘记一切，清清白白的忘记一切，脑海里，思绪里，只在一棵樱桃树下，没完没了地端详你发梢的细腻，
鲜美，精湛华美，想着我们的故事，无数个情节，无数个画面的回放。
<br>
<br>
5、时光短，浮云散，尘世里，我高斋怅望，眼波渴求你缓归的身影；流光过，回音荡，短亭头，我三寸思量，
蓦然回望你灿烂的笑靥。多年忘怀，时日过却，我采撷了过往的风景，响在回廊。
`

interface DrawerProps {
    drawerVisible: boolean;
    closeDrawer: () => void
}


const DrawerPage: FC<DrawerProps> = (props): ReactElement => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.drawerVisible)
    }, [props.drawerVisible])


    return (
        <Drawer
            title="爱技术，爱生活，简单并快乐着"
            placement="right"
            closable={false}
            onClose={props.closeDrawer}
            visible={visible}
            width="350"
            destroyOnClose={true}
            className="drawer-container"
        >
            <TypingCard title={
                <Mallki className="mallki-text" text="WarmWind~i" />
            } source={cardContent} />

        </Drawer>

    )
}

export default DrawerPage