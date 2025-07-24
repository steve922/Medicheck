import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './App.css';
import PreMarket from './pages/PreMarket';
import PostMarket from './pages/PostMarket';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']}>
            <Menu.Item key="/">
              <Link to="/">Pre-Market</Link>
            </Menu.Item>
            <Menu.Item key="/post-market">
              <Link to="/post-market">Post-Market</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<PreMarket />} />
              <Route path="/post-market" element={<PostMarket />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>MediCheck ©2024</Footer>
      </Layout>
    </Router>
  );
}

export default App;
