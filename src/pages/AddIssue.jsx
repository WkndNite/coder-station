import { Form, Input, Select, Button, message } from "antd";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import styles from "../css/AddIssue.module.css";
import { useDispatch, useSelector } from "react-redux";
import { typeOptionCreator } from "../utils/tools";
import { addIssue } from "../api/issue";
import { useNavigate } from "react-router";
import { getTypeList } from "../redux/typeSlice";

export default function AddIssue() {
  const formRef = useRef();
  const editorRef = useRef();
  const [issueInfo, setIssueInfo] = useState({
    issueTitle: "",
    issueContent: "",
    typeId: "",
    userId: useSelector((state) => state.user.userInfo._id),
  });
  const { typeList } = useSelector((state) => state.type);
  const dispatcher = useDispatch();
  useEffect(() => {
    if (!typeList.length) {
      dispatcher(getTypeList());
    }
  }, []);

  const navigator = useNavigate();

  function addHandler() {
    const editorContent = editorRef.current.getInstance().getHTML();
    addIssue({ ...issueInfo, issueContent: editorContent });
    navigator("/");
    message.success("问题已提交，审核通过后展示！");
  }
  function updateInfo(newContent, key) {
    setIssueInfo({ ...issueInfo, [key]: newContent });
  }
  function changeHandler(value) {
    setIssueInfo({ ...issueInfo, typeId: value });
  }
  function resetHandler() {
    setIssueInfo({
      issueTitle: "",
      issueContent: "",
      typeId: "",
      userId: "",
    });
  }

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        ref={formRef}
        onFinish={addHandler}
      >
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input
            placeholder="请输入标题"
            size="large"
            value={issueInfo.issueTitle}
            onChange={(e) => updateInfo(e.target.value, "issueTitle")}
          />
        </Form.Item>
        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[{ required: true, message: "请选择问题所属分类" }]}
        >
          <Select style={{ width: "200px" }} onChange={changeHandler}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <Editor initialValue="" ref={editorRef}></Editor>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
            提交
          </Button>
          <Button
            type="primary"
            htmlType="reset"
            onClick={() => resetHandler()}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
