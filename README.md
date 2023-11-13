
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
- ~~move columns~~ if i want to move a column i need to change swap positions of 2 columns and that sucks, OR i could create a new api route to swap columns but this sounds bad
- fix edit columns menu
- show logged in user name
- dates on tasks < here
- loading animation after login/register other stuff
- member search and addition
- expired cookies mess things up, unauthorized gives 500
- add members, assign roles to them
- moving tasks up and down
- marking tasks for review/done
- assigning members to tasks

- project repoort: tasks finished within some period, assigned, busy members, timeline

v.2:
- add cards in any place you want (spawn divs in between to register location)
- suggested tags, show a dropdown for existing tags, tag autocomplete
- keyboard shortcuts
- markdown/json export
- desktop app using tauri
