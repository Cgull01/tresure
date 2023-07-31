import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ITask } from '../types';

interface DialogStates {
    taskDialog: boolean,
    projectDialog: boolean,
}

export const DIALOG_TASK: Writable<ITask> = writable(<ITask>{});

export const DIALOG_MANAGER: Writable<DialogStates> = writable({
    taskDialog: false,
    projectDialog: false,
});

export const CURRENT_PROJECT: Writable<IProject> = writable(<IProject>{});

export const CURRENT_COLUMN: Writable<IColumn> = writable(<IColumn>{});

export const DESTINATION_COLUMN_INDEX: Writable<number | null> = writable(<number | null>null)