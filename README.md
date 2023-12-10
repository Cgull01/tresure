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
- marking tasks for review/done
- prevent members from moving cards
- assigning members to tasks
- fix status codes in backend
- fetch request feedback
- project deletion, exiting project
- prevent from inviting same user. (prevented in front-end)
- websockets
- guide page
- fill with data < here
- expired cookies mess things up, unauthorized gives 500 (optional [fatal])
- leave project (optional)
- merge back editcarddialog with addcarddialog because too much repetition
- loading animation after login/register other stuff (optional)
- moving tasks up and down (optional)
- fix dates being datetime.min in backend instead of fixing them in frontend
- accept project invitation? (optional)
- ~~move columns~~ if i want to move a column i need to change swap positions of 2 columns and that sucks, OR i could create a new api route to swap columns but this sounds bad (optional)

- project report: tasks finished within some period, assigned, busy members, timeline (optional)

v.2:

- add cards in any place you want (spawn divs in between to register location)
- suggested tags, show a dropdown for existing tags, tag autocomplete
- keyboard shortcuts
- markdown/json export
- desktop app using tauri
