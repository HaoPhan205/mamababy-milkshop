
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { Affix, Avatar, Button, ConfigProvider, Menu, theme } from 'antd';
import { AiOutlineHome } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { BiCategoryAlt, BiMessageAltError } from "react-icons/bi";
import { FaRegHeart, FaRegQuestionCircle } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuFlag } from 'react-icons/lu';
import './SideBar.scss'
// import { Button, Layout, Menu, c } from 'antd';

function SideBar({ collapsed }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      icon: <AiOutlineHome />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <RiLiveLine />,
      label: 'Live Streams',
    },
    {
      key: '3',
      icon: <BsSearch />,
      label: 'Explore',
    },
    {
      key: 'sub1',
      label: 'Categories',
      icon: <BiCategoryAlt />,
      children: [
        {
          key: '5',
          label: 'Development',
        },
        {
          key: '6',
          label: 'Business',
        },
        {
          key: '7',
          label: 'Finance & Accounting',
        },
        {
          key: '8',
          label: 'IT & Software',
        },
        {
          key: '9',
          label: 'Office Productivity',
        },
        {
          key: '10',
          label: 'Personal Development',
        },
        {
          key: '11',
          label: 'Design',
        },
        {
          key: '12',
          label: 'Marketing',
        },
        {
          key: '13',
          label: 'Lifestyle',
        },
        {
          key: '14',
          label: 'Photography',
        },
        {
          key: '15',
          label: 'Health & Fitness',
        },
        {
          key: '16',
          label: 'Music',
        },
        {
          key: '17',
          label: 'Teaching & Academics',
        },
      ],
    },
    {
      key: '18',
      icon: <FaRegHeart />,
      label: 'Saved Course',
    },
  ];

  const channels = [
    {
      key: '1',
      icon: <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUp4mwCInaXf85sk3DClzRmRqwFVm8jpwoOg&usqp=CAU' />,
      label: 'Rock Smith',
    },
    {
      key: '2',
      icon: <Avatar src='https://i.pinimg.com/originals/f5/22/be/f522bec617497a43cabb94accdd2367b.jpg' />,
      label: 'Jassica William',
    },
    {
      key: '3',
      icon: <Avatar src='https://m.media-amazon.com/images/I/61Sz-RayqyL._AC_UF1000,1000_QL80_.jpg' />,
      label: 'Stella Melanie',
    },
    {
      key: '4',
      icon: <IoMdAddCircleOutline />,
      label: 'Browse Instructors',
    },
  ];

  const settings = [
    {
      key: '1',
      icon: <IoSettingsOutline />,
      label: 'Setting',
    },
    {
      key: '2',
      icon: <FaRegQuestionCircle />,
      label: 'Help',
    },
    {
      key: '3',
      icon: <LuFlag />,
      label: 'Report History',
    },
    {
      key: '4',
      icon: <BiMessageAltError />,
      label: 'Send Feedback',
    },
  ];
  return (
    <Affix offsetTop={52} style={{ position: 'sticky' }}>

      <Sider trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={{
          background: colorBgContainer
        }}
        className='slide-bar-container'
      >
        {/* <div className="slide-bar-container"> */}
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: 'black',
                itemSelectedColor: '#ed2a26',
                itemSelectedBg: '#FFECEC',
                collapsedWidth: 50,
                // itemHeight:45,
                iconSize: 18,
                itemHoverBg: '#FFECEC',
                // activeBarHeight:5
              },
            },
          }}
        >
          <Menu
            defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
            className='menu-style'
          />
        </ConfigProvider>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: 'black',
                itemSelectedColor: '#ed2a26',
                itemSelectedBg: '#FFECEC',
                // collapsedWidth: 50,
                // itemHeight:45,
                iconSize: 23,
                itemHoverBg: '#FFECEC',
                // activeBarHeight:5
              },
            },
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            items={channels}
            className={`menu-style ${collapsed ? 'collapsed-menu' : 'menu-collapsed'}`}
            inlineCollapsed={collapsed}

          />
        </ConfigProvider>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: 'black',
                itemSelectedColor: '#ed2a26',
                itemSelectedBg: '#FFECEC',
                // collapsedWidth: 50,
                // itemHeight:45,
                iconSize: 20,
                itemHoverBg: '#FFECEC',
                // activeBarHeight:5
              },
            },
          }}
        >
          <Menu
            mode="inline"
            theme="light"
            items={settings}
            className='menu-style'
            inlineCollapsed={collapsed}
          />
        </ConfigProvider>
        {/* </div> */}

      </Sider>
    </Affix>

  )
}

export default SideBar