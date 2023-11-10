export interface IProject {
	id: number;
	title: string;
	columns: IColumn[];
	members: IMember[];
}

export interface ITag {
	tag: string;
	color: string;
}

export interface IColumn {
	id: number;
	title: string;
	cards?: ICard[];
	position: number;
}

enum Roles {
	Admin,
	Member,
	TaskMaster
}
export interface IRole
{
	name: Roles;
}

export interface IMember{
	id: number;
	userid: string;
	roles: IRole[];
}

export interface ICard {
	id: number;
	title: string;
	details: string;
	tags?: {
		color: string;
		tag: string;
	}[];
	duedate?: Date | null;
	creationdate: Date;
	approvaldate: Date;
	assignedmembers: IMember[];
}
