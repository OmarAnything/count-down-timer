import { ChangeEventHandler, useCallback, useState } from "react"
import "./timer.css"

interface TimerProps
{
  id: number;
  closeTimer(x: number): void;
  countUp: boolean
}

export const Timer: React.FC<TimerProps> = (props) =>
{
  const { closeTimer, id, countUp } = props;

  const [time, setTime] = useState<number>()
  const [timerDuration, setTimerDuration] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>()
  const [currentSeconds, setCurrentSeconds] = useState<number>()

  const timerActive = !!intervalId

  const onButtonClick = useCallback(() =>
  {
    if (intervalId)
    {
      setCurrentSeconds(0)
      clearInterval(intervalId);
      setIntervalId(undefined);
      setTime(undefined)
    }
    else
    {
      const timerDate = Date.now()
      setTime(timerDate)
      startIntervalWithTime(timerDate, setCurrentSeconds, timerDuration, setIntervalId, countUp);
    }
  }, [time, intervalId, setIntervalId, timerDuration, currentSeconds, setCurrentSeconds])

  const onChangeHandler: ChangeEventHandler = (event) =>
  {
    const value = (event.target as any).value;
    setTimerDuration(Number(value))
  }

  const onCloseTimer = () =>
  {
    closeTimer(id)
  }

  const adjustTimer = (increase: boolean) =>
  {
    if (!time) return;
    const newTime = modifyTime(increase, time);
    setTime(newTime);
    clearInterval(intervalId)
    startIntervalWithTime(time, setCurrentSeconds, timerDuration, setIntervalId, countUp)
  }

  return (
    <div className="timer-container">
      <div className="timer-display">
        {timerActive ?
          <>{currentSeconds}</>
          :
          "X"
        }
      </div>
      <input
        className="timer-input"
        type="number"
        width={100}
        height={100}
        onChange={onChangeHandler}
      />
      <button
        className="timer-start-end-button standard-button"
        onClick={onButtonClick}
      >
        {timerActive ? "E" : "S"}
      </button>
      <button
        className="timer-close-button standard-button"
        onClick={onCloseTimer}>
        X
      </button>
      <div>
        <button
          className="timer-close-button mini-button"
          onClick={() => adjustTimer(true)}>
          +
        </button>
        <button
          className="timer-close-button mini-button"
          onClick={() => adjustTimer(false)}>
          -
        </button>
      </div>
    </div>
  )
}
function startIntervalWithTime(
  time: number,
  setCurrentSeconds: React.Dispatch<React.SetStateAction<number | undefined>>,
  timerDuration: number,
  setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>,
  countUp: boolean)
{
  const id = setInterval(() =>
  {
    const curr = Date.now();
    if (countUp)
    {
      setCurrentSeconds(Math.floor((curr - time) / 1000) % timerDuration)
    }
    else
    {
      setCurrentSeconds(timerDuration - (Math.floor((curr - time) / 1000) % timerDuration))
    }
  }, 100);
  setIntervalId(id);
}

function modifyTime(increase: boolean, time: number)
{
  if (increase)
  {
    return time + 1000

  }
  return time - 1000
}
