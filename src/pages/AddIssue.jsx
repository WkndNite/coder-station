import { Form, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import styles from "../css/AddIssue.module.css";
import { useSelector } from "react-redux";

export default function AddIssue() {
	const formRef = useRef();
	const [issueInfo, setIssueInfo] = useState({
		issueTitle: "",
		issueContent: "",
		typeIf: "",
		userId: "",
	});
	function addHandler() {}
	function updateInfo(newContent, key) {
		setIssueInfo({ ...issueInfo, [key]: newContent });
	}
	function changeHandler() {}

	return (
		<div className={StyleSheet.container}>
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
					rules={{ required: true, message: "请输入标题" }}
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
					rules={{ required: true, message: "请选择问题所属分类" }}
				>
					<Select
						style={{ width: "200px" }}
						onChange={changeHandler}
					>
						{typeOptionCreator(Select, typeList)}
					</Select>
				</Form.Item>
			</Form>
		</div>
	);
}
