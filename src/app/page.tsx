import CountdownTimer from "@/components/CountdownTimer";
import styles from "./page.module.css";

const countdownDate = new Date("2024-11-11T23:18:07");

const Home = () => {
  return (
    <div className={styles.main}>
      <CountdownTimer deadline={countdownDate} title="Discount ends in" />
    </div>
  );
};

export default Home;
