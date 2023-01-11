import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//const dummyList = [
// {
//   id: 1,
//   author: "조병현",
//   content: "hi 1",
//   emotion: 1,
//   created_date: new Date().getTime(),
// },
// {
//   id: 2,
//   author: "홍길동",
//   content: "hi 2",
//   emotion: 2,
//   created_date: new Date().getTime(),
// },
// {
//   id: 3,
//   author: "정민성",
//   content: "hi 3",
//   emotion: 4,
//   created_date: new Date().getTime(),
// },

//]

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
  const onDelete = (targetID) => {
    console.log(`${targetID}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetID);
    setData(newDiaryList);
  }

  return (
    <div className="App">

      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <DiaryList onDelete={onDelete} diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
