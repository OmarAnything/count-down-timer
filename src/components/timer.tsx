import { ChangeEventHandler, useCallback, useState } from "react"
import "./timer.css"

interface TimerProps {
  id: number;
  closeTimer(x: number): void;
}

export const Timer: React.FC<TimerProps> = (props) =>
{
  const [time, setTime] = useState<number>()
  const [timerDuration, setTimerDuration] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [currentSeconds, setCurrentSeconds] = useState<number>();

  const timerActive = !!intervalId

  const onButtonClick = useCallback(() =>
  {
    if (intervalId)
    {
      setCurrentSeconds(0)
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
    else
    {
      const timerDate = Date.now()
      setTime(timerDate)
      const id = setInterval(() =>
      {
        const curr = Date.now()
        const origDate = time || timerDate
        setCurrentSeconds(Math.floor((curr - origDate) / 1000) % timerDuration)
      }, 100);
      setIntervalId(id);
    }
  }, [intervalId, setIntervalId, timerDuration, currentSeconds, setCurrentSeconds])

  const onChangeHandler: ChangeEventHandler = (event) =>
  {
    const value = (event.target as any).value;
    setTimerDuration(Number(value))

  }

  const onCloseTimer = () => {
    props.closeTimer(props.id)
  }

  return (
    <div className="timer-container">
      <div>
        {timerActive ?
          <>{currentSeconds}</>
          :
          <span>Timer is Currently not active</span>
        }
      </div>
      <input
        type="number"
        width={200}
        onChange={onChangeHandler}
      />
      <button onClick={onButtonClick}>
        {timerActive ? "end" : "start"}
      </button>
      <button onClick={onCloseTimer}>
        X
      </button>
    </div>
  )
}
