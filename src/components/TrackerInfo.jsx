import "../styles/TrackerInfo.css";
import { useTrackerInfo } from "../hooks";

const TrackerInfo = ({ selectedDate }) => {
  const { trackerInfo, goodIngredients, badModerateIngredients } =
    useTrackerInfo(selectedDate);

  return (
    <div className="TI-main">
      <p className="TI-date">{selectedDate}</p>
      <h3 className="TI-heading">Things we ate</h3>
      <div className="TI-ingAte">
        <p className="TI-p">{trackerInfo?.current_ingredients.join(", ")}</p>
      </div>
      <h3 className="TI-heading">Good food items.</h3>
      <div className="TI-goodIng">
        <ul className="TI-ul">
          {goodIngredients.map((ing) => (
            <li className="TI-li" key={ing.ingredients.ingredient_name}>
              {ing.ingredients.ingredient_name} - {ing.explanation}
            </li>
          ))}
        </ul>
      </div>
      <h3 className="TI-heading">Sensitive food items?</h3>
      <div className="TI-badIng">
        <ul className="TI-ul">
          {badModerateIngredients.map((ing) => (
            <li className="TI-li" key={ing.ingredients.ingredient_name}>
              {ing.ingredients.ingredient_name} - {ing.explanation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackerInfo;
