import { typeOptionCreator } from '@/utils/tool';
import { PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Image, Input, Select, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

function BookForm({ type, bookInfo, setBookInfo, submitHandle }) {
  const { typeList } = useSelector((state) => state.type);
  const formRef = useRef();
  const editorRef = useRef();

  const [firstIn, setFirstIn] = useState(true);

  function addHandle() {
    const content = editorRef.current.getInstance().getHTML();
    const newBookInfo = { ...bookInfo, bookIntro: content };
    submitHandle(newBookInfo);
  }
  function updateInfo(value, key) {
    const newBookInfo = { ...bookInfo };
    newBookInfo[key] = value;
    setBookInfo(newBookInfo);
  }

  useEffect(() => {
    if (formRef.current && firstIn && bookInfo) {
      formRef.current.setFieldsValue(bookInfo);
      editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
      setFirstIn(false);
    }
    if (formRef.current) {
      formRef.current.setFieldsValue(bookInfo);
    }
  }, [bookInfo]);

  function handlePointChange(value) {
    updateInfo(value, 'requirePoints');
  }

  function handleTypeChange(value) {
    updateInfo(value, 'typeId');
  }

  let bookPicPreview = null;
  if (type === 'edit') {
    bookPicPreview = (
      <Form.Item
        label="当前封面"
        name="bookPicPreview"
      >
        <Image
          width={100}
          src={bookInfo?.bookPic}
        />
      </Form.Item>
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, [typeList]);
  return (
    <Form
      name="basic"
      initialValues={bookInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={addHandle}
    >
      <Form.Item
        label="书籍标题"
        name="bookTitle"
        rules={[{ required: true, message: '请输入书名' }]}
      >
        <Input
          value={bookInfo?.bookTitle}
          onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
        />
      </Form.Item>

      <Form.Item
        label="书籍介绍"
        name="bookIntro"
        rules={[{ required: true, message: '请输入书本相关的介绍' }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      <Form.Item
        label="下载链接"
        name="downloadLink"
        rules={[{ required: true, message: '请输入书籍链接' }]}
      >
        <Input
          value={bookInfo?.downloadLink}
          onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
        />
      </Form.Item>

      <Form.Item
        label="所需积分"
        name="requirePoints"
        rules={[{ required: true, message: '请选择下载所需积分' }]}
      >
        <Select
          style={{ width: 200 }}
          onChange={handlePointChange}
        >
          <Select.Option
            value={20}
            key={20}
          >
            20
          </Select.Option>
          <Select.Option
            value={30}
            key={30}
          >
            30
          </Select.Option>
          <Select.Option
            value={40}
            key={40}
          >
            40
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="书籍分类"
        name="typeId"
        rules={[{ required: true, message: '请选择书籍分类' }]}
      >
        <Select
          style={{ width: 200 }}
          onChange={handleTypeChange}
        >
          {typeOptionCreator(Select, typeList)}
        </Select>
      </Form.Item>

      {bookPicPreview}

      <Form.Item
        label="书籍封面"
        valuePropName="fileList"
      >
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              const url = e.file.response.data;
              updateInfo(url, 'bookPic');
            }
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button
          type="link"
          htmlType="submit"
          className="resetBtn"
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BookForm;
