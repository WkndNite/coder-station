import React, { useState } from "react";
import styles from "../css/ScoreItem.module.css";
import { Avatar } from "antd";
import classNames from "classnames";

export default function ScoreItem({ rankInfo, rank }) {
	const [classNameCollection] = useState({
		iconfont: true,
		"icon-jiangbei": true,
	});

	switch (rank) {
		case 1:
			rank = (
				<div
					style={{
						color: "#ffda23",
						fontSize: "22px",
					}}
					className={classNames(classNameCollection)}
				></div>
			);
			break;
		case 2:
			rank = (
				<div
					style={{
						color: "#c5c5c5",
						fontSize: "22px",
					}}
					className={classNames(classNameCollection)}
				></div>
			);
			break;
		case 3:
			rank = (
				<div
					style={{
						color: "#cd9a62",
						fontSize: "22px",
					}}
					className={classNames(classNameCollection)}
				></div>
			);
			break;
		default:
			rank = <div className={styles.rank}>{rank}</div>;
			break;
	}

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				{rank}
				<div className={styles.avatar}>
					<Avatar
						size="small"
						src={rankInfo.avatar}
					/>
				</div>
				<div className={styles.nickname}>{rankInfo.nickname}</div>
			</div>
			<div className={styles.right}>{rankInfo.points}</div>
		</div>
	);
}
