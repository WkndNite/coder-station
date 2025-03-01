import React from 'react';
import IssueItem from '../components/IssueItem';

export default function SearchResultItem(props) {
  return (
    <div>
      {props.info.issueTitle ? <IssueItem issueInfo={props.info} /> : null}
    </div>
  );
}
