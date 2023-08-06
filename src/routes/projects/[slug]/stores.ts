import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ITask } from '$lib/types';

export const SELECTED_COLUMN: Writable<IColumn | null> = writable(null);

export interface DialogStates {
    taskDialog: boolean,
    projectDialog: boolean,
    columnDialog: boolean,
    newProjectDialog: boolean,
}


export const DIALOG_MANAGER: Writable<DialogStates> = writable({
    taskDialog: false,
    projectDialog: false,
    columnDialog: false,
    newProjectDialog: false,
});

export const SELECTED_PROJECT: Writable<IProject | null> = writable(null);

export const SELECTED_TASK: Writable<ITask | null> = writable(null);