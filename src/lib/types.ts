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

export interface IUser {
	email: string;
	id: string;
	username: string;
}

export enum Roles {
	Admin = 0,
	Member,
	TaskMaster,
	Owner
}

export interface UserRoles {
	admin: boolean;
	member: boolean;
	taskMaster: boolean;
	owner: boolean;
}
export interface IRole {
	role: {
		name: Roles;
	};
}
export interface IMember {
	id: number;
	userid: string;
	roles: UserRoles;
	user: IUser;
}

export interface ICard {
	id?: number;
	title?: string;
	details?: string;
	tags?: {
		color?: string;
		tag?: string;
	}[];
	dueDate?: Date | null;
	creationDate?: Date;
	completionDate?: Date;
	approvalDate?: Date;
	assignedMembers?: IMember[];
}
