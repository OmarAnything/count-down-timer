import { useCallback, useState } from 'react';
import './App.css'
import { Timer } from './components/timer'

function App()
{
  const [currNum, setCurrNum] = useState<number>(0)
  const [timerArr, setTimerArr] = useState<number[]>([])
  const [countUp, setCountUp] = useState<boolean>(false)
  const [miniButtons, setButtonSize] = useState<boolean>(false)

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

  const buttonClassName = !miniButtons ? 'standard-button' : 'mini-button'

  const adjustButtons = () =>
  {
    setButtonSize(!miniButtons)
  }

  return (
    <div className='main'>
      <div className='main-buttons'>
        <div className='main-buttons-left'>
          <button className={buttonClassName} onClick={() => setCountUp(!countUp)}>
            C
          </button>
        </div>
        <div className='main-buttons-right'>
          <button className={buttonClassName} onClick={onAddHandler}>
            +
          </button>
          <button className={buttonClassName} onClick={onCloseHandler}>
            x
          </button>
          <button className={buttonClassName} onClick={adjustButtons}>
            =
          </button>
        </div>
      </div>
      <div className='main-content'>
        {timerArr.map(x => <Timer key={x} id={x} closeTimer={onCloseTimer} countUp={countUp} />)}
      </div>
    </div>
  )
}

export default App
