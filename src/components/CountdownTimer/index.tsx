"use client";

import { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.scss";

interface CountdownTimerProps {
  deadline: Date;
  title: string;
}

interface CountdownTimeLeft {
  days?: number;
  hrs?: number;
  mins?: number;
  secs?: number;
}

const INITIAL_TIME_LEFT = { days: 25, hr: 18, mins: 58, secs: 59 };

function CountdownTimer({ deadline, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] =
    useState<CountdownTimeLeft>(INITIAL_TIME_LEFT);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(): CountdownTimeLeft {
    let timeLeft: CountdownTimeLeft = {};
    const currentDate = new Date();
    const difference = deadline.getTime() - currentDate.getTime();

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.timeWrapper}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className={styles.timeContainer}>
            <div className={styles.valueContainer}>
              <p className={styles.value}>{Math.floor(value / 10)}</p>
              <p className={styles.value}>{value % 10}</p>
            </div>
            <p className={styles.unit}>{unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownTimer;
