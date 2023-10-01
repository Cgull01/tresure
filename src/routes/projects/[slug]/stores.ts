import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ICard } from '$lib/types';

export const SELECTED_COLUMN: Writable<IColumn | null> = writable(null);

export interface DialogStates {
	task_dialog: boolean;
	project_dialog: boolean;
	column_dialog: boolean;
	new_project_dialog: boolean;
}

export const DIALOG_MANAGER: Writable<DialogStates> = writable({
	task_dialog: false,
	project_dialog: false,
	column_dialog: false,
	new_project_dialog: false
});

export const SELECTED_PROJECT: Writable<IProject | null> = writable(null);

export const SELECTED_TASK: Writable<ICard | null> = writable(null);
