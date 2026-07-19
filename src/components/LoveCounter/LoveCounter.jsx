import './LoveCounter.css';

const START_DATE = new Date('2022-09-22');

function getDaysTogether() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function LoveCounter() {
  const days = getDaysTogether();

  return (
    <div className="love-counter">
      <span className="love-counter-icon">💑</span>
      <span className="love-counter-text">
        Together for <strong>{days.toLocaleString()} days</strong> ❤️
      </span>
    </div>
  );
}
