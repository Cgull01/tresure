import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ICard } from '$lib/types';

export const SELECTED_COLUMN: Writable<IColumn | null> = writable(null);

export const PROJECT_ID: Writable<Number | null> = writable(null);
export const THEME_TOGGLE: Writable<Boolean> = writable(false);

export interface DialogStates {
	editTask_dialog: boolean;
	createTask_dialog: boolean;
	project_dialog: boolean;
	column_dialog: boolean;
	new_project_dialog: boolean;
	member_dialog: boolean;
}

export const DIALOG_MANAGER: Writable<DialogStates> = writable({
	editTask_dialog: false,
	createTask_dialog: false,
	project_dialog: false,
	column_dialog: false,
	new_project_dialog: false,
	member_dialog: false
});

// export const SELECTED_PROJECT: Writable<any | null> = writable(null);

export const SELECTED_TASK: Writable<ICard | null> = writable(null);
