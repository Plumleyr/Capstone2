import "../styles/TrackerInfo.css";
import { useTrackerInfo } from "../hooks";

const TrackerInfo = ({ selectedDate }) => {
  const { trackerInfo, goodIngredients, badModerateIngredients, loading } =
    useTrackerInfo(selectedDate);

  return (
    <div className="TI-main">
      {loading ? (
        <div className="TI-Loading">Loading...</div>
      ) : (
        <>
          <p className="TI-date">{selectedDate}</p>
          <h3 className="TI-heading">Things we ate</h3>
          <div className="TI-ingAte">
            {trackerInfo?.current_ingredients.length ? (
              <p className="TI-p">
                {trackerInfo.current_ingredients.join(", ")}
              </p>
            ) : (
              <p className="TI-p">No tracker info for today!</p>
            )}
          </div>
          <h3 className="TI-heading">Good food items.</h3>
          <div className="TI-goodIng">
            {goodIngredients.length ? (
              <ul className="TI-ul">
                {goodIngredients.map((ing) => (
                  <li className="TI-li" key={ing.ingredients.ingredient_name}>
                    {ing.ingredients.ingredient_name} - {ing.explanation}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="TI-p">No good ingredients today!</p>
            )}
          </div>
          <h3 className="TI-heading">Sensitive food items?</h3>
          <div className="TI-badIng">
            {badModerateIngredients.length ? (
              <ul className="TI-ul">
                {badModerateIngredients.map((ing) => (
                  <li className="TI-li" key={ing.ingredients.ingredient_name}>
                    {ing.ingredients.ingredient_name} - {ing.explanation}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="TI-p">No sensitive ingredients today!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackerInfo;
