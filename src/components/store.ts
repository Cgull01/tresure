import { writable, type Writable } from 'svelte/store';
import type { IColumn, IProject, ITask } from '../types';

export const DIALOG_TASK: Writable<ITask> = writable(<ITask>{});

export const DIALOG_IS_OPEN: Writable<boolean> = writable(false);

export const CURRENT_PROJECT: Writable<IProject> = writable(<IProject>{});

export const CURRENT_COLUMN: Writable<IColumn> = writable(<IColumn>{});