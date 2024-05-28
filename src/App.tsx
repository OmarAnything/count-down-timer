import { useCallback, useState } from 'react';
import './App.css'
import { Timer } from './components/timer'

function App()
{
  const [currNum, setCurrNum] = useState<number>(0)
  const [timerArr, setTimerArr] = useState<number[]>([])

  const onAddHandler = useCallback(() =>
  {
    const copy = timerArr.slice()
    copy.push(currNum)
    setCurrNum(currNum + 1)
    setTimerArr(copy)
  }, [timerArr])

  const onCloseHandler = useCallback(() =>
  {
    window.ipcRenderer.send('close-app');
  }, []);

  const onCloseTimer = (id: number) =>
  {
    const idx = timerArr.findIndex(x => x === id);
    const copy = timerArr.slice()
    copy.splice(idx, 1)
    setTimerArr(copy)
  }

  return (
    <>
      <button onClick={onAddHandler}>
        +
      </button>
      <button onClick={onCloseHandler}>
        X
      </button>
      {timerArr.map(x => <Timer key={x} id={x} closeTimer={onCloseTimer} />)}
    </>
  )
}

export default App
