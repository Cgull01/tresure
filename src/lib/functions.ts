import { Roles, type IProject, type UserRoles, type IRole } from './types';

export default function logout() {
	document.cookie = 'jwt' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	// goto('/')
	window.location.href = '/';
}

export function pad(n: number) {
	return n < 10 ? '0' + n : n;
}

export function formatData(data: IProject) {
	function fixInvalidDate(date: Date | undefined): Date | undefined {
		let modifiedDate;

		modifiedDate = date ? new Date(date) : undefined;

		return modifiedDate;
	}

	for (let col of data.columns) {
		for (let card of col.cards || []) {
			try {
				if (typeof card.tags === 'string') card.tags = JSON.parse(card.tags);
				else card.tags = [];
			} catch {
				card.tags = [];
			}

			if (card.assignedMembers) {
				card.assignedMembers = card.assignedMembers.map((m: any) => ({
					id: m.id,
					username: data.members.find((pm: any) => pm.id === m.id)?.user.username
				}));
			}

			card.dueDate = fixInvalidDate(card.dueDate);
			card.completionDate = fixInvalidDate(card.completionDate);
			card.approvalDate = fixInvalidDate(card.approvalDate);
		}
	}

	for (let member of data.members) {
		let memberRoles: UserRoles = {
			admin: false,
			member: false,
			taskMaster: false,
			owner: false
		};

		for (let r of member.roles) {
			switch (r.role.name) {
				case Roles.Admin:
					memberRoles.admin = true;
					break;
				case Roles.Member:
					memberRoles.member = true;
					break;
				case Roles.TaskMaster:
					memberRoles.taskMaster = true;
					break;
				case Roles.Owner:
					memberRoles.owner = true;
					break;
				default:
					break;
			}
		}

		member.roles = memberRoles;
	}

	for (let i = 0; i < data.columns.length; i++) {
		data.columns[i].cards = data.columns[i].cards?.sort((cardA: any, cardB: any) => {
			const dateA = new Date(cardA.creationDate).getTime();
			const dateB = new Date(cardB.creationDate).getTime();
			return dateA - dateB;
		});
	}

	return data;
}
