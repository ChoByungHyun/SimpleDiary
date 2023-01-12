import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);

  }
  const onRemove = (targetID) => {
    console.log(`${targetID}가 삭제되었습니다!`);
    const newDiaryList = data.filter((it) => it.id !== targetID);
    setData(newDiaryList);
  };
  const onEdit = (targetID, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetID ? { ...it, content: newContent } : it
      )
    )
  }

  return (
    <div className="App">

      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
