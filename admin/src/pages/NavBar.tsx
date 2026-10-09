import {useState} from 'react'
import {PlayCircleOutlined, CommentOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';


function NavBar({setCurrentPage}: { setCurrentPage: any }) {


    const items: MenuProps['items'] = [
        {
            label: 'Generate',
            key: 'generate',
            icon: <PlayCircleOutlined/>,
            onClick: () => {
                setCurrentPage('generate');
            },
        },
        {
            label: 'History',
            key: 'history',
            icon: <CommentOutlined/>,
            onClick: () => {
                setCurrentPage('history');
            },
        },
        {
            label: 'Draw',
            key: 'draw',
            icon: <CommentOutlined/>,
            onClick: () => {
                setCurrentPage('draw');
            },
        }
    ];

    const [current, setCurrent] = useState('generate');


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </>
    )
}

export default NavBar;
