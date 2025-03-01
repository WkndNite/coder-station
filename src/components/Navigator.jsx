import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Select, Space } from 'antd';
import LoginAvatar from './LoginAvatar';
import { useNavigate } from 'react-router-dom';

function Navigator(props) {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState('issue');

  function onSearch(value) {
    if (value) {
      navigate('/searchPage', {
        state: {
          value,
          searchOption,
        },
      });
    } else {
      navigate('/');
    }
  }

  function onChange(value) {
    setSearchOption(value);
  }

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      <nav className="navContainer">
        <NavLink
          to="/"
          className="navigation"
        >
          问答
        </NavLink>
        <NavLink
          to="/books"
          className="navigation"
        >
          书籍
        </NavLink>
        <NavLink
          to="/interviews"
          className="navigation"
        >
          面试题
        </NavLink>
        <a
          href="https://duyi.ke.qq.com/"
          className="navgation"
          target="_blank"
          rel="noreferrer"
        >
          视频教程
        </a>
      </nav>
      <div className="searchContainer">
        <Space.Compact>
          <Select
            defaultValue="issue"
            size="large"
            style={{ width: '30%' }}
            onChange={onChange}
          >
            <Select.Option value="issue">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: '80%',
            }}
            onSearch={onSearch}
          />
        </Space.Compact>
      </div>
      <div className="loginBtnContainer">
        <LoginAvatar loginHandler={props.loginHandler} />
      </div>
    </div>
  );
}

export default Navigator;
