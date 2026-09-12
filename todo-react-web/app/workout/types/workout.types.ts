export interface WorkoutExercise {
  id: string;
  name: string;
  order: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  emoji: string;
  exercises: WorkoutExercise[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSet {
  setNumber: number;
  weight: number;
  reps: number;
}

export interface WorkoutLogExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  maxWeight: number;
  totalVolume: number;
}

export interface WorkoutLog {
  id: string;
  workoutPlanId: string;
  workoutPlanName: string;
  date: string;
  exercises: WorkoutLogExercise[];
  notes: string;
  createdAt: string;
}

export interface ProgressPoint {
  date: string;
  maxWeight: number;
  totalVolume: number;
  totalReps: number;
  totalSets: number;
}

export interface ExerciseProgress {
  exerciseName: string;
  points: ProgressPoint[];
}