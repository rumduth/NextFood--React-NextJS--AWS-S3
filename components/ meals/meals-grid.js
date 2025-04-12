import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        const objMeal = meal.toObject();
        return (
          <li key={meal._id.toString()}>
            <MealItem {...objMeal} />
          </li>
        );
      })}
    </ul>
  );
}
