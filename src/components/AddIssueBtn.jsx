import { message } from "antd";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function AddIssueBtn() {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function clickHandler() {
    if (!isLogin) {
      message.warning("请先登录");
    } else {
      navigate("/addIssue");
    }
  }
  return (
    <Button
      type="primary"
      size="large"
      style={{ width: "100%", marginBottom: "30px" }}
      onClick={clickHandler}
    >
      我要发问
    </Button>
  );
}
