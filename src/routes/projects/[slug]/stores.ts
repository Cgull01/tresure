import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ICard } from '$lib/types';

export const SELECTED_COLUMN: Writable<IColumn | null> = writable(null);

export const PROJECT_ID: Writable<Number | null> = writable(null);
export interface AccountState {
	user: User | null;
}

export interface User {
	username: string;
	email: string;
	token: string;
}

export async function signInUser(User: User) {}

export interface DialogStates {
	task_dialog: boolean;
	project_dialog: boolean;
	column_dialog: boolean;
	new_project_dialog: boolean;
	member_dialog: boolean;
}

export const DIALOG_MANAGER: Writable<DialogStates> = writable({
	task_dialog: false,
	project_dialog: false,
	column_dialog: false,
	new_project_dialog: false,
	member_dialog: true
});

export const SELECTED_PROJECT: Writable<any | null> = writable(null);

export const SELECTED_TASK: Writable<ICard | null> = writable(null);
