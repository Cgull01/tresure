export interface IProject {
	id: string;
	title: string;
	columns: IColumn[];
}

export interface ITag {
	tag: string;
	color: string;
}

export interface IColumn {
	id: string;
	title: string;
	cards?: ICard[];
	project_id: string;
	position: number;
}

export interface ICard {
	id: string;
	title: string;
	details: string;
	tags?: {
		color: string;
		tag: string;
	}[];
	creationDate?: Date | null;
	dueDate?: Date | null;
	position: number;
}
