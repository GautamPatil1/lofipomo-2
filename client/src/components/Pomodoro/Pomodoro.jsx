import React, { useState, useEffect } from "react";
import styles from "./Pomodoro.module.css";
import { useAuth0 } from "@auth0/auth0-react";


const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isSession, setIsSession] = useState(true);
  const [playIsClicked, setPlayIsClicked] = useState(false);
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [notes, setNotes] = useState(localStorage.getItem('notes')|| '');
  const { isAuthenticated, user } = useAuth0();
  const server = 'https://server.gautampatil.tech'


  useEffect( () => {
    localStorage.setItem('notes', notes);
  }, [notes]);

  useEffect(() => {
    // Fetch notes from the server when the component mounts
    if (isAuthenticated) {
      fetch(`${server}/api/notes/${user.sub}`)
        .then(response => response.json())
        .then(data => setNotes(data.notes));
    }
  }, [isAuthenticated, user]);
  
  useEffect(() => {
    // Update notes on the server whenever they change
    if (isAuthenticated) {
      fetch(`${server}/api/notes/${user.sub}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });
    }
  }, [notes, isAuthenticated, user]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  useEffect(() => {
    let interval;

    const handleTime = () => {
      if (timeLeft <= 0) {
        if (isSession) {
          setIsSession(false);
          setTimeLeft(breakLength);
        } else {
          setIsSession(true);
          setTimeLeft(sessionLength);
          document.getElementById("beep").currentTime = 0;
          document.getElementById("beep").play();
        }
      } else if (playIsClicked) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    };

    if (playIsClicked) {
      interval = setInterval(handleTime, 1000);
    }

    return () => clearInterval(interval);
  }, [playIsClicked, timeLeft, isSession, breakLength, sessionLength]);

  const convertSeconds = (seconds) => {
    return {
      minutes: Math.floor(seconds / 60),
      seconds: seconds % 60,
    };
  };

  const handleLengthButton = (
    lengthValue,
    setLength,
    isAddition,
    isBreakLength
  ) => {
    let result = isAddition ? lengthValue + 1 : lengthValue - 1;
    result = Math.max(1, result);

    setLength(result * 60);

    // if (!playIsClicked) {
    //   setPlayIsClicked(true);
    // }

    if ((isBreakLength && isSession) || (!isBreakLength && !isSession)) {
      setTimeLeft(result * 60);
    }
  };

  const handlePlayPause = () => {
    setPlayIsClicked((prev) => !prev);
  };

  const handleReset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(25 * 60);
    setPlayIsClicked(true);
  };

  return (
    <div className={styles.rightContainer}>
      <div className="pomodorotimer">
        <div className={styles.pomodoroContainer}>
          <div className={styles.pomodoroItem}>
            <h2>POMODORO TIMER</h2>
            <div id="labelSessionBreak" className={styles.label}>
              {isSession ? "Session" : "Break"}
            </div>
            <div className={styles.rowPomodoro}>
              <div id="timeLeft" className={styles.timeLeft}>
                {`${("0" + convertSeconds(timeLeft).minutes).slice(-2)}:${(
                  "0" + convertSeconds(timeLeft).seconds
                ).slice(-2)}`}
              </div>
            </div>
          </div>

          <div className={styles.pomodoroItem}>
            <div className={styles.label}>Session Length</div>
            <center>
              <div className={styles.rowPomodoro}>
                <button
                  id="sessionDecrement"
                  className={styles.btnUpdown}
                  onClick={() =>
                    handleLengthButton(
                      sessionLength / 60,
                      setSessionLength,
                      false,
                      true
                    )
                  }
                >
                  <i className="fa-solid fa-minus "></i>
                </button>
                <div
                  id="sessionLength"
                  className={`${styles.rowPomodoro} ${styles.lengthTime}`}
                  style={{ fontSize: "4rem" }}
                >
                  {sessionLength / 60}
                </div>
                <button
                  id="sessionIncrement"
                  className={styles.btnUpdown}
                  onClick={() =>
                    handleLengthButton(
                      sessionLength / 60,
                      setSessionLength,
                      true,
                      true
                    )
                  }
                >
                  <i className="fa-solid fa-plus "></i>
                </button>
              </div>
            </center>
          </div>

          <div className={styles.pomodoroItem}>
            <div className={styles.label}>Break Length</div>
            <center>
              <div className={styles.rowPomodoro}>
                <button
                  id="breakDecrement"
                  className={styles.btnUpdown}
                  onClick={() =>
                    handleLengthButton(
                      breakLength / 60,
                      setBreakLength,
                      false,
                      true
                    )
                  }
                >
                  <i className="fa-solid fa-minus "></i>
                </button>
                <div
                  id="breakLength"
                  className={`${styles.rowPomodoro} ${styles.lengthTime}`}
                  style={{ fontSize: "4rem" }}
                >
                  {breakLength / 60}
                </div>
                <button
                  id="breakIncrement"
                  className={styles.btnUpdown}
                  onClick={() =>
                    handleLengthButton(
                      breakLength / 60,
                      setBreakLength,
                      true,
                      true
                    )
                  }
                >
                  <i className="fa-solid fa-plus "></i>
                </button>
              </div>
            </center>
          </div>

          <div className={`${styles.pomodoroItem} ${styles.playerButton}`}>
            <div className={`${styles.rowPomodoro} ${styles.buttonRow}`}>
              <button
                id="buttonPlay"
                className={styles.btnController}
                onClick={handlePlayPause}
              >
                <i
                  className={`fa-solid${playIsClicked ? " fa-pause" : " fa-play"} `}
                  aria-hidden="true"
                ></i>
              </button>
              <div className="emptyspace"> </div>
              <button
                id="buttonReset"
                className={styles.btnController}
                onClick={handleReset}
              >
                <i className="fas fa-sync " aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <textarea
          className="notes"
          name=""
          id="notes"
          placeholder={isAuthenticated ? user.name + "'s Notes Here." : "Write Notes Here..."}
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Pomodoro;
