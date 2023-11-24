EXTRAS:
attachments
members?

dotnet commands:

dotnet ef migrations add YourMigrationName
dotnet ef database update
dotnet watch --no-hot-reload

TODO:
protected column api route, add collumn action, put column action, remove column action

- create types from api objects
- add columns
- rename columns
- remove columns
- fix edit columns menu
- show logged in user name
- dates on tasks
- display date in input when editing, maybe just spawn a div with ability to click to delete
- member search and addition
- member role assigning
- prevent owner from removing admin role from themselves
- hide other role actions from other roles (edit project, delete task, invite members)
- remove identity role from backend?
- fix card completed style (green checkmark at top right?)

- marking tasks for review/done < here

- assigning members to tasks
- fix status codes in backend
- moving tasks up and down (optional)
- leave project (optional)
- fetch request feedback
- fix dates beind datetime.min in backend, dont fix them in frontend
- accept project invitation? (optional)
- expired cookies mess things up, unauthorized gives 500 (optional [fatal])
- loading animation after login/register other stuff (optional)
- ~~move columns~~ if i want to move a column i need to change swap positions of 2 columns and that sucks, OR i could create a new api route to swap columns but this sounds bad (optional)

- project repoort: tasks finished within some period, assigned, busy members, timeline (optional)

v.2:

- add cards in any place you want (spawn divs in between to register location)
- suggested tags, show a dropdown for existing tags, tag autocomplete
- keyboard shortcuts
- markdown/json export
- desktop app using tauri

marking tasks for review:
if regular member:
if(task.completiondate)
mark/unmark task for review

if taskmaster/admin:
complete/incomplete task
