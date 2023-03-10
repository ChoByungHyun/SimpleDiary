import React, { useMemo, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//https://jsonplaceholder.typicode.com/comments


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      }
      return [newItem, ...state];
    }
    case 'REMOVE':
      return state.filter((it) => it.id !== action.targetID);
    case 'EDIT':
      return state.map((it) => it.id === action.targetID ? { ...it, content: action.newContent } : it)

    default:
      return state;
  }
}

export const DiaryStateContnext = React.createContext();

export const DiaryDispatchContext = React.createContext();


function App() {
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    });
    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  }
  useEffect(() => {
    getData();
  }, [])


  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE', data: {
        author,
        content,
        emotion,
        id: dataId.current,
      }
    })
    dataId.current += 1;
    // const created_date = new Date().getTime();

    // setData((data) => [newItem, ...data]);
  },
    []);

  const onRemove = useCallback((targetID) => {
    dispatch({ type: "REMOVE", targetID })
    // setData(data => data.filter((it) => it.id !== targetID));
  }, []);

  const onEdit = useCallback((targetID, newContent) => {
    dispatch({ type: "EDIT", targetID, newContent });
    // setData(
    //   (data) =>
    //     data.map((it) =>
    //       it.id === targetID ? { ...it, content: newContent } : it
    //     )
    // )
  }, [])

  const getDiaryAnalysis = useMemo(
    () => {

      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };

    }, [data.length]
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  })

  return (
    <DiaryStateContnext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor></DiaryEditor>
          <div>???????????? : {data.length}</div>
          <div>?????? ?????? ?????? ?????? : {goodCount}</div>
          <div>?????? ?????? ?????? ?????? : {badCount}</div>
          <div>?????? ?????? ?????? ?????? : {goodRatio}</div>
          <DiaryList></DiaryList>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContnext.Provider>
  );
}

export default App;
