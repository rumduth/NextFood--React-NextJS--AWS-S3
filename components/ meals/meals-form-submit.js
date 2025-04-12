import { useFormStatus } from "react-dom";
import classes from "./meals-form-submit.module.css";
export default function MealsFormSubmit() {
  const state = useFormStatus();
  return (
    <p className={classes.actions}>
      <button type="submit" disabled={state.pending}>
        {state.pending ? "Submitting..." : "Share Meal"}
      </button>
    </p>
  );
}
