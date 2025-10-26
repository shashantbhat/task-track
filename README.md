# task-track

Access the app by navigating to the my-react-router-app directory using:
  cd my-react-router-app
Start the app using:
  npm run dev
  
This app works as follows:
	1.	Uses local storage to save all users, projects, and tasks under each project.
	2.	Implements role-based management:
  	•	Developers can add, update, and delete tasks, but cannot change the status to Done or Cancelled directly.
  	•	Managers can add, update, and delete tasks, and also approve status changes requested by developers to Done or Cancelled.
	3.	Each task has a timer that stops when the task status changes to Done or Cancelled.
	4.	Tasks are color-coded by priority, allowing users to quickly gauge urgency at a glance.
