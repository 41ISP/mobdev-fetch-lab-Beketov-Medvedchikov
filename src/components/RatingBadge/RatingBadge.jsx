import './RatingBadge.css';

function RatingBadge({ source, value }) {
  return (
    <div className="rating-badge">
      <span className="rating-badge__value">{value}</span>
      <span className="rating-badge__source">{source}</span>
    </div>
  );
}

export default RatingBadge;