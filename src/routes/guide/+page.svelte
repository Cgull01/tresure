<script>
	import IconTresure from '../../Icons/Icon_Tresure.svelte';
	import IconAdd from '../../Icons/Icon_add.svelte';
	import IconDirectionLeft from '../../Icons/Icon_direction_left.svelte';
	import IconPlus from '../../Icons/Icon_plus.svelte';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import ThemeButton from '../../components/ThemeButton.svelte';
</script>

<svelte:head>
	<title>TRESURE - guide</title>
</svelte:head>

<div class="w-full h-screen overflow-y-hidden">
	<nav
		class="relative px-6 text-text_primary dark:text-text_primary_dark flex flex-row py-3 items-center justify-between w-full bg-background dark:bg-background_dark border-b border-primary dark:border-primary_dark">
		<div class="flex gap-2 items-center">
			<a href="/" class="hover:scale-105">
				<IconDirectionLeft styles="w-12 h-12" />
			</a>
			<a href="/" class="cursor-pointer sm:block hidden">
				<IconTresure styles="fill-text_primary dark:fill-text_primary_dark" />
			</a>
		</div>
		<div class="flex gap-8">
			<ThemeButton />
		</div>
	</nav>
	<div class="w-full h-full flex">
		<nav
			class="flex overflow-x-hidden flex-col h-full px-12 gap-3 pt-6 text-text_primary dark:text-text_primary_dark whitespace-nowrap border-r border-text_secondary dark:border-primary w-max bg-background dark:bg-background_dark overflow-y-auto scrollbar">
			<ul class="contents">
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Register</span>
					<ul>
						<li>
							<a href="#creating-account">Creating a new account</a>
						</li>
					</ul>
				</li>
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Login</span>
					<ul>
						<li>
							<a href="#signing-in">Signing in</a>
						</li>
					</ul>
				</li>
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Projects</span>
					<ul>
						<li>
							<a href="#creating-project">Creating projects</a>
						</li>
						<li>
							<a href="#deleting-project">Deleting / Leaving projects</a>
						</li>
						<li>
							<a href="#renaming-project">Renaming projects</a>
						</li>
					</ul>
				</li>
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Tasks</span>
					<ul>
						<li>
							<a href="#creating-task">Creating tasks</a>
						</li>
						<li>
							<a href="#editing-task">Editing tasks</a>
						</li>
						<li>
							<a href="#completing-task">Completing tasks</a>
						</li>
						<li>
							<a href="#moving-task">Moving tasks</a>
						</li>
						<li>
							<a href="#deleting-task">Deleting tasks</a>
						</li>
					</ul>
				</li>
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Columns</span>
					<ul>
						<li>
							<a href="#creating-columns">Creating columns</a>
						</li>
						<li>
							<a href="#renaming-columns">Renaming columns</a>
						</li>
						<li>
							<a href="#deleting-columns">Deleting columns</a>
						</li>
					</ul>
				</li>
				<li>
					<span class="uppercase tracking-wide text-accent font-semibold">Members</span>
					<ul>
						<li>
							<a href="#inviting-members">Inviting members</a>
						</li>
						<li>
							<a href="#assigning-roles">Assigning roles</a>
						</li>
						<li>
							<a href="#kicking-members">Kicking members</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div
			class="flex flex-col h-full w-full bg-background dark:bg-dark overflow-auto px-6 py-16 text-text_primary dark:text-text_primary_dark">
			<div class="pb-4">
				<h1
					class="font-semibold text-2xl pb-1 uppercase tracking-wide text-accent dark:text-accent_dark">
					LOGIN
				</h1>
				<hr class="w-2/3 border-t-1 border-primary dark:border-primary_dark" />
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="creating-account">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Creating a New Account
				</h2>
				<div class="px-3">
					<p>To create a new account, follow these steps:</p>
					<ol class="px-12">
						<li>Go to the <a href="/register" class="underline">registration page</a>.</li>
						<li>There, you will need to provide the following information:</li>
						<ul class="list-disc px-12">
							<li>Username: Enter a unique username that you want to use for your account.</li>
							<li>
								Email: Enter your email address. This will be used for account recovery and
								notifications.
							</li>
							<li>Password: Enter a strong password. This will be used to secure your account.</li>
							<li>Repeat Password: Re-enter your password to confirm it.</li>
						</ul>
						<li>
							Once you've entered all the required information, click on the "Continue" button to
							create your account.
						</li>
					</ol>
				</div>
			</div>

			<div class="flex flex-col h-max w-full pb-12" id="signing-in">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Signing In
				</h2>
				<div class="px-3">
					<p>To sign in to your account, follow these steps:</p>
					<ol class="px-12">
						<li>Go to the <a href="/login" class="underline">login page</a>.</li>
						<li>There, you will need to provide the following information:</li>
						<ul class="list-disc px-12">
							<li>Email: Enter the email address associated with your account.</li>
							<li>Password: Enter the password for your account.</li>
						</ul>
						<li>
							Once you've entered your email and password, click on the "Continue" button to sign in
							to your account.
						</li>
					</ol>
				</div>
			</div>
			<div class="pb-4">
				<h1
					class="font-semibold text-2xl pb-1 uppercase tracking-wide text-accent dark:text-accent_dark">
					PROJECTS
				</h1>
				<hr class="w-2/3 border-t-1 border-primary dark:border-primary_dark" />
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="creating-project">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Creating a Project
				</h2>
				<div class="px-3">
					<p>
						Once you've logged in, go to the <a href="/projects" class="underline">your projects</a>
						page.
					</p>
					<p>
						In the projects page, you will be presented with an empty box, which will soon contain
						your first project.
					</p>
					<img
						src="/images/docs/projects_empty.png"
						alt="Empty projects container"
						class="py-4 w-1/3 h-auto" />
					<p>
						Pressing on the plus '+' (<IconPlus styles="inline" />) icon will open a dialog,
						prompting you to enter your new project's name.
					</p>
					<img
						src="/images/docs/projects_dialog.png"
						alt="New project dialog"
						class="py-4 w-1/3 h-auto" />
					<p>
						After you have entered a project title, press the 'Create New Project' button to create
						a new project.
					</p>
					<p>
						After pressing the button, the dialog will disappear and the empty box will now have
						your new project.
					</p>
					<img
						src="/images/docs/projects_withProject.png"
						alt="Your Projects box containing one project"
						class="py-4 w-1/3 h-auto" />
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="deleting-project">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Deleting a Project
				</h2>
				<div class="px-3">
					<p>
						Deleting (or leaving) a project is straightforward: just press the trash bin (<IconTrash
							styles="inline" />) icon next to the project to delete it.
					</p>
					<p>
						If you are not the owner of a project, the trash bin icon will be replaced with 'x' (<IconPlus
							styles="inline rotate-45" />) icon, pressing it will make you leave the project.
					</p>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="renaming-project">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Renaming a Project
				</h2>
				<div class="px-3">
					<p>
						To rename a project, first enter the project by clicking its title, then double click
						the project title at the top left corner of the window.
					</p>
					<img
						src="/images/docs/project_renameBefore.png"
						alt="Project title"
						class="py-4 w-1/3 h-auto" />
					<p>
						After double clicking the title, an input box will appear, prompting you to modify your
						current project title. To make the box disappear, click the check button to confirm
						changes or 'x' button to cancel renaming.
					</p>
					<img
						src="/images/docs/project_renameAfter.png"
						alt="Project renaming"
						class="py-4 w-1/3 h-auto" />
				</div>
			</div>
			<div class="pb-4">
				<h1
					class="font-semibold text-2xl pb-1 uppercase tracking-wide text-accent dark:text-accent_dark">
					TASKS
				</h1>
				<hr class="w-2/3 border-t-1 border-primary dark:border-primary_dark" />
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="creating-task">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Creating a task
				</h2>
				<div class="px-3">
					<p>To create a new task, follow these steps:</p>
					<p>
						Click on the bottom-left plus icon within the desired column. A dialog will appear,
						allowing you to enter information about the task, including title, description, due
						date, tags, and assigned members.
					</p>
					<p>Once entered, click the "Add New Task" button to create the task.</p>
					<img
						src="/images/docs/task_add.png"
						alt="A task creation dialog"
						class="py-4 w-1/3 h-auto" />
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="editing-task">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Editing tasks
				</h2>
				<div class="px-3">
					<p>
						To edit a task, hover over a selected task, and an edit icon will appear. Click on it to
						open a dialog similar to the one for creating tasks.
					</p>
					<p>Modify the necessary information and click "Save Changes" to update the task.</p>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="completing-task">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Completing tasks
				</h2>
				<div class="px-3">
					<p>
						To mark a task for review, right-click on the task and press the "Mark for Review"
						button. This action assigns a date of completion to the task.
					</p>
					<p>
						If you have taskmaster or admin privileges, the "Mark for Review" button will be
						replaced with a "Complete" button. Clicking it will update the completion date to the
						approval date.
					</p>
					<img src="/images/docs/task_complete.png" alt="Completing a task" class="py-4" />
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="moving-task">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Moving tasks
				</h2>
				<div class="px-3">
					To move a task, simply drag and drop a task with your mouse cursor from one column to
					another.
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="deleting-task">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Deleting Tasks
				</h2>
				<div class="px-3">
					To delete a task right-click on a selected task and press the "Delete" button, or open the
					task for editing and click the delete icon at the top.
				</div>
			</div>
			<div class="pb-4">
				<h1
					class="font-semibold text-2xl pb-1 uppercase tracking-wide text-accent dark:text-accent_dark">
					COLUMNS
				</h1>
				<hr class="w-2/3 border-t-1 border-primary dark:border-primary_dark" />
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="creating-columns">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Creating Columns
				</h2>
				<div class="px-3">
					<p>To create a new column in your board, follow these steps:</p>
					<ol class="px-12">
						<li>
							Right-click on an empty space anywhere in the board. A context menu will appear.
						</li>
						<li>
							Select the option to add a column. This action will add a new column to the end of the
							board.
						</li>
					</ol>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="renaming-columns">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Renaming Columns
				</h2>
				<div class="px-3">
					<p>To rename a column, follow these steps:</p>
					<ol class="px-12">
						<li>
							Double-click on the column title that you want to rename. An input box will appear.
						</li>
						<li>Enter the new name for the column in the input box.</li>
						<li>
							Click the check button to confirm the changes, or click the 'x' button to cancel the
							renaming process.
						</li>
					</ol>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="deleting-columns">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Deleting Columns
				</h2>
				<div class="px-3">
					<p>To delete a column from your board, follow these steps:</p>
					<ol class="px-12">
						<li>Double-click on the column title that you want to delete.</li>
						<li>
							Click on the delete button, which is indicated by a trash bin <IconTrash
								styles="inline" /> icon. This will remove the column from your board.
						</li>
					</ol>
				</div>
			</div>
			<div class="pb-4">
				<h1
					class="font-semibold text-2xl pb-1 uppercase tracking-wide text-accent dark:text-accent_dark">
					MEMBERS
				</h1>
				<hr class="w-2/3 border-t-1 border-primary dark:border-primary_dark" />
			</div>
			<div class="px-3">
				<p>
					To view and manage members, go to the 'Members' tab located at the middle top of the page.
				</p>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="inviting-members">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Inviting Members
				</h2>
				<div class="px-3">
					<p>To invite new members to your project, follow these steps:</p>
					<ol class="px-12">
						<li>Enter the email of the member you want to invite in the search box.</li>
						<li>
							Click the search button. If the user exists, the results will show an option to add
							the user to your board.
						</li>
					</ol>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="assigning-roles">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Assigning Roles to Members
				</h2>
				<div class="px-3">
					<p>To assign roles to members in your project, follow these steps:</p>
					<ol class="px-12">
						<li>
							In the list of members, locate the two buttons for roles:
							<div
								title="task editing privileges"
								class="inline w-max px-2 border border-primary dark:border-primary_dark text-text_primary bg-accent dark:bg-accent_dark dark:text-text_secondary_dark">
                            Admin
                            </div>
                            and
							<div
								title="task editing privileges"
								class="inline w-max px-2 border border-primary dark:border-primary_dark text-text_primary bg-background dark:bg-background_dark dark:text-text_primary_dark">
                            TaskMaster
                            </div>
						</li>
						<li>Click on the corresponding button to assign or remove the role from a member.</li>
					</ol>
				</div>
			</div>
			<div class="flex flex-col h-max w-full pb-12" id="kicking-members">
				<h2 class="font-semibold text-2xl pb-4 tracking-wide text-primary dark:text-primary_dark">
					Kicking Members
				</h2>
				<div class="px-3">
					<p>To remove a member from your project, follow these steps:</p>
					<ol class="px-12">
						<li>
							Locate the trash bin <IconTrash styles="inline" /> icon next to the member's name in the
							list.
						</li>
						<li>Click on the trash bin icon to remove the member from your board.</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>
