import { useState, useEffect } from 'react';
import { Layout, Menu, Button, type MenuProps, Divider } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import ProfileImage from './components/ProfileImage/ProfileImage';

// icons
import { GithubFilled, LinkedinFilled, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AiFillHome } from "react-icons/ai";
import { SiMyanimelist } from "react-icons/si";
import { IoMdCode } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaCoffee } from "react-icons/fa";

const { Sider, Content, Header } = Layout;

function App() {
    const [dimensions, setDimensions] = useState<{
        height: number, width: number
    }>({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const [collapsed, setCollapsed] = useState<boolean>(false);

    const location = useLocation();
    const getPageTitle = () => {
        switch(location.pathname) {
            case '/': return 'Home';
            case '/anime': return 'Anime Collection';
            case '/projects': return 'My Projects';
            case '/contact': return 'My Contact';
            case '/donate': return 'Fund My Dream'
            default: return 'Welcome';
        }
    };

    const getPageExtension = () => {
        switch(location.pathname) {
            case '/': return 'home';
            case '/anime': return 'anime';
            case '/projects': return 'projects';
            case '/contact': return 'contact';
            case '/donate': return 'donate'
            default: return 'home';
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // useEffect(() => {
    //     async function testLambda() {
    //         const response = await fetch('https://6apgwr9ym7.execute-api.us-east-2.amazonaws.com/default/create-stripe-checkout-session', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    
    //             body: JSON.stringify({ productId: 'coffee donation', quantity: 1 })
    //         });

    //         console.log(response.json())
    //     }
    //     testLambda();
    // }, [])

    const items: MenuProps['items'] = [
        { key: 'home', icon: <AiFillHome size={18} />, label: <Link to="/">Home</Link> },
        { key: 'anime', icon: <SiMyanimelist size={18} />, label: <Link to="/anime">Anime</Link> },
        { key: 'projects', icon: <IoMdCode size={18} />, label: <Link to="/projects">Projects</Link> },
        { key: 'contact', icon: <MdPersonAddAlt1 size={18} />, label: <Link to="/contact">Contact</Link> },
        { key: 'donate', icon: <FaCoffee size={18} />, label: <Link to="/donate">Support me!</Link> },
    ];

    const socialIcons = [
        { icon: <GithubFilled />, color: '#24292e', url: 'https://github.com/awu0626' },
        { icon: <LinkedinFilled />, color: '#0077b5', url: 'https://www.linkedin.com/in/awu0626' },
        { icon: 
            <div style={{
                backgroundColor: '#2e51a2', 
                width: 21, 
                height: 20, 
                alignItems: 'right', 
                display: 'inline-flex', 
                paddingInline: 1,
                borderRadius: 1
            }}> 
                <SiMyanimelist /> 
            </div>, color: 'white', url: 'https://myanimelist.net/profile/awu0626' },
    ];

    return (
            <Layout style={{ 
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
            }}>
                <Sider 
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    collapsedWidth="0"
                    width={Math.max(200, dimensions.width * 0.15)}
                    trigger={null}
                >
                    <ProfileImage width={Math.max(200, dimensions.width * 0.15)} />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={[getPageExtension()]}
                        mode="inline"
                        items={items}
                        onClick={() => {
                            if (dimensions.width < 500) setCollapsed(!collapsed)
                        }}
                    />
                </Sider>
                <Layout>
                    <Header style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        background: '#001529',
                        color: 'white',
                        padding: '0 24px',
                    }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : 
                                <MenuFoldOutlined />
                        }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                width: 32,
                                height: 64,
                                color: 'white',
                            }}
                        />
                        <Divider type='vertical' style={{ borderColor: 'white'}}/>
                        <span style={{fontSize: '1rem'}}>
                            {(dimensions.width > 400 || collapsed) ? getPageTitle() : ''}
                        </span>
                    </Header>
                    <Content style={{ 
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto',
                    }}>
                        <Outlet />
                    </Content>
                    <Layout.Footer style={{ 
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        whiteSpace: 'nowrap',
                        height: 50,
                        display: 'center',
                        justifyContent: 'flex-end',
                        paddingTop: 20,
                        paddingBottom: 40,
                        borderTop: '1px solid #aaaaaa',
                    }}>
                        <div style={{ 
                            minWidth: 'fit-content',
                            display: 'flex',
                            gap: 22,
                            justifyContent: 'flex-end'
                        }}>
                            {socialIcons.map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        color: item.color,
                                        fontSize: 22,
                                        display: 'flex',
                                        alignSelf: 'center'
                                    }}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </Layout.Footer>
                </Layout>
            </Layout>
    );
}

export default App;