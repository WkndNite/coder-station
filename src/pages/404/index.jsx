// NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={textStyle}>您访问的页面已消失</p>
      <Link
        to="/"
        style={linkStyle}
      >
        🚀 返回首页
      </Link>
    </div>
  );
}

// 基础样式
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '600px',
  color: '#333',
};

const titleStyle = {
  fontSize: '8rem',
  margin: 0,
  textShadow: '0 0 20px rgba(255,255,255,0.3)',
};

const textStyle = {
  fontSize: '1.5rem',
  margin: '20px 0',
};

const linkStyle = {
  padding: '12px 24px',
  backgroundColor: '#2196F3',
  color: 'white',
  borderRadius: '25px',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
};
