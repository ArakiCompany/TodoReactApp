import { gql } from '@apollo/client';

export const GET_WORKOUT_PLANS = gql`
  query GetWorkoutPlans {
    workoutPlans {
      id name emoji updatedAt
      exercises { id name order }
    }
  }
`;

export const SAVE_WORKOUT_PLAN = gql`
  mutation SaveWorkoutPlan($input: SaveWorkoutPlanInput!) {
    saveWorkoutPlan(input: $input) {
      id name emoji
      exercises { id name order }
    }
  }
`;

export const DELETE_WORKOUT_PLAN = gql`
  mutation DeleteWorkoutPlan($id: String!) {
    deleteWorkoutPlan(id: $id)
  }
`;

export const GET_WORKOUT_LOGS = gql`
  query GetWorkoutLogs($from: DateTime) {
    workoutLogs(from: $from) {
      id workoutPlanName date notes createdAt
      exercises {
        exerciseName
        sets { setNumber weight reps }
        maxWeight totalVolume
      }
    }
  }
`;

export const SAVE_WORKOUT_LOG = gql`
  mutation SaveWorkoutLog($input: SaveWorkoutLogInput!) {
    saveWorkoutLog(input: $input) { id }
  }
`;

export const DELETE_WORKOUT_LOG = gql`
  mutation DeleteWorkoutLog($id: String!) {
    deleteWorkoutLog(id: $id)
  }
`;

export const GET_EXERCISE_PROGRESS = gql`
  query GetExerciseProgress($planId: String!) {
    exerciseProgress(planId: $planId) {
      exerciseName
      points { date maxWeight totalVolume totalReps totalSets }
    }
  }
`;