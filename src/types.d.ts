export interface Task {
  title: string;
  status: boolean;
}

export interface TaskMutation extends Task {
  id: string;
}

export interface ApiTaskList {
  [id: string]: TaskMutation;
}