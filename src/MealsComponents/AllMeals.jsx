import MealBox from "./MealBox";

export default function AllMeals({ mealsdata, selectedMeals, onSelectMeal }) {
  return (
    <div className="row">
      {mealsdata?.map((meal, index) => {
        const isSelected = selectedMeals.some((m) => m.id === meal.id);
        return (
          <div
            key={index}
            className={`col-12 col-lg-4 col-md-6 my-2 meal-box ${isSelected ? "selected" : ""}`}
            onClick={() => onSelectMeal(meal)}
           
          >
            <MealBox
              img={meal?.image}
              title={meal?.name}
              desc="Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot."
              ratting={meal?.rating}
              cusine={meal?.cuisine}
              
            />
          </div>
        );
      })}
    </div>
  );
}
