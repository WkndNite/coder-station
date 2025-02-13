import { message } from "antd";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function clickHandler() {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isLogin) {
    message.warning("请先登录");
  } else {
  }
}

export default function AddIssueBtn() {
  return (
    <Button
      type="primary"
      size="large"
      style={{ width: "100%", marginBottom: "30px" }}
      onClick={() => {
        clickHandler;
      }}
    >
      我要发问
    </Button>
  );
}
