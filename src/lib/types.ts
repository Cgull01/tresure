
export interface IProject {
    id: string,
    title: string,
    columns: IColumn[],
}

export interface ITag {
    tag: string;
    color: string;
}

export interface IColumn {
    id: string;
    title: string;
    tasks?: ITask[];
    project_id: string;
    position: number;
}


export interface ITask {
    id: string;
    title: string;
    details: string;
    tags?: {
        color: string;
        tag: string;
    }[];
    dueDate?: Date | null;
    position: number;
}
