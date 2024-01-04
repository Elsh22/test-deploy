import styles from '../styles/index';

const StartSteps = ({ number, text }) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div className={`${styles.flexCenter}`}  style={{ width: '70px', height: '70px', borderRadius: '24px', backgroundColor: 'black', marginRight:20 }}>
      <p className="font-bold text-[20px] text-white">
        {number}
      </p>
    </div>
    <p className={`${styles.flexStart} flex-1 ml-[40px] font-normal text-[18px] text-black leading-[32.4px]`}>
      {text}
    </p>
  </div>
);

export default StartSteps;

 