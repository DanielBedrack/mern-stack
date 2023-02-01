import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext()

  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}

    const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        setEmptyFields([])
        console.log('New Workout Added', json)
        dispatch({type: 'CREATE_WORKOUTS', payload: json})
    }
  }

  return (
    <form className="create" on onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <lable>Exercise Title:</lable>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className = {emptyFields.includes('title') ? 'error' : ''}
      />

      <lable>Load (in Kg):</lable>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className = {emptyFields.includes('load') ? 'error' : ''}
      />

      <lable>Reps:</lable>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className = {emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
