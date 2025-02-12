import MealBox from "./MealBox";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AllOtherWeeks({ week, meals, onDeleteMeal }) {
  return (
    <div className="row">
      <h3>{week}</h3>
      {meals.length === 0 ? <p>No meals added for this week.</p> : null}
      {meals.map((meal, index) => (
        <div className="col-12 col-lg-4 col-md-6 my-2 meal-box" key={index}>
          <MealBox
            img={meal?.image}
            title={meal?.name}
            desc="Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot."
            ratting={meal?.rating}
            cusine={meal?.cuisine}
          />
          <FaRegTrashAlt   className="text-danger trash-icon" onClick={() => onDeleteMeal(week, meal.id)}/>
       
        </div>
      ))}
    </div>
  );
}
