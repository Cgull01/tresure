export interface IProject {
    title: string,
    columns: IColumn[],
}

export interface ITag {
    tag: string;
    color: string;
}

export interface IColumn {
    id: number;
    title: string;
    tasks?: ITask[];
}

export interface ITask {
    id?: number;
    tags?: ITag[];
    title?: string;
    details?: string;
    dueDate?: Date;
    members?: { member: string, avatar: string }[];
}
