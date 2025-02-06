import { StatusTask } from "./statusTasks";

export interface Task {
	id: string;
	description: string;
	dueDate: string;
	status: StatusTask;
}
