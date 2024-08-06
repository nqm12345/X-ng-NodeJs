import React, { useState } from "react";
import {
  AreaChartOutlined,
  DingdingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import "../../styles/WarningModal.scss";
const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useAuth();
  console.log(user);
  if (!user || user.role !== "admin") {
    return <h1 className="warning">Bạn không có quyền vào trang này!</h1>;
  }

  return (
    <Layout>
      <Toaster />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AreaChartOutlined />,
              label: <NavLink to="/admin">Dashboard</NavLink>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <NavLink to="/admin/users">User</NavLink>,
            },
            {
              key: "3",
              icon: <ProductOutlined />,
              label: <NavLink to="/admin/products">Products</NavLink>,
            },
            {
              key: "4",
              icon: <DingdingOutlined />,
              label: <NavLink to="/admin/categories">Categories</NavLink>,
            },
            {
              key: "5",
              icon: <UserOutlined />,
              label: <NavLink to="/admin/brands">Brands</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <main>
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
