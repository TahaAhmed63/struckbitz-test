import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";

export default function MealBox({ img, title, desc, cusine, ratting }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#004370" }} />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#004370" }} />}
        {Array(emptyStars).fill().map((_, i) => (
          <FontAwesomeIcon key={i} icon={faEmptyStar} style={{ color: "#ccc" }} />
        ))}
      </>
    );
  };

  return (
    <div className="bx-wrap">
      <img src={img} alt={title} />
      <div className="row">
        <div className="col-12">
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
        <div className="col-6 last-items">
          <span>Cuisine:</span> {cusine}
        </div>
        <div className="col-6 last-items">
          <span >Rating:</span> <span className="stars">{renderStars(ratting)}</span>
        </div>
      </div>
    </div>
  );
}
