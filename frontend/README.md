# DevTinder

-Total npm's:

1.] npm create vite@latest          ---(normalReact.jsAppSetUp)
2.] cd project-name
3.] npm install tailwindcss @tailwindcss/vite
4.] npm i -D daisyui@latest
5.] npm install react-router-dom
6.] npm i axios 
7.] npm i cors                       ---(InBackend)
8.] npm install @reduxjs/toolkit react-redux



-V: 15
-Create a Vite + React application
-Remove unecessary code and create a Hello World app
-Install Tailwind CSS-(How to done it written in the index.css)
-Install Daisy UI-(How to done it written in the index.css)
-Add NavBar component to App.jsx
-Create a NavBar.jsx separate Component file
-Install react router dom: 1.] npm install react-router-dom 2.]npm list react-router-dom-(for checking installed)
-Create BrowserRouter > Routes > Route=/ Body > RouteChildren
-Create an Outlet in your Body Component: 1.] npm install react-router-dom in akshayTinder
-Create a footer
-Create a Login Page
-Install axios: 1.] npm i axios      //Go to dimag.md
-CORS - install cors in backend: 1.] npm i cors then=> add middleware to with configurations: orgin, credentials: true
        Whenever you're making API call so pass axios => { withCredentials: true }

-V:16
-install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start 
-configureStore => Provider => createSlice => add reducer to store
-Add redux devtools in chrome
-Login and see if your data is coming properly in the store
-NavBar should update as soon as user logs in
-Refactor our code to add constants file + create a components folder

-v:17
-You should not be access other routes without login
-If token is not present, redirect user to login page
-Logout Feature
-Get the feed and add the feed in th store
-build the user card on feed
-Edit Profile Feature
-Show Toast Message on save of profile

-v:18
-New Page - See all my connections
-New Page - See all my Conenction REquests
-Feature - Accept/Reject connection request

-v:19
-Send/Ignore the user card from the feed
-Signup New User
-E2E testing

## AWS
1.] signIn AWS
2.] signIn console as roootUser
3.] Add Payment mode [We have already performed and we have to done this only one first time]
4.] Go to Ec2
5.] Launch instance [1)Web serverName, 2)select machine(ubuntu), 3)create keyPair 4)click launch]
6.] on Launch instance dashBoard click on-(instance_id) then on connect
7.] Open Powershell, cd to Downloads-( cd $env:USERPROFILE\Downloads), inside Downloads -(chmod 400 "NavneetTinder-secret.pem")  then-(ssh -i "NavneetTinder-secret.pem" ubuntu@ec2-3-239-216-186.compute-1.amazonaws.com) then type-(yes), now i will get the UbuntuMachine on powerShell, now powerShell is not refering to mine PC it is pointing to machine that is created by AWS web through Ubuntu you will see like this-(ubuntu@ip-172-31-3-81:), for shutDown type-(exit), for reStart type aboved one same as-(ssh -i "NavneetTinder-secret.pem" ubuntu@ec2-3-239-216-186.compute-1.amazonaws.com).
8.] install node.js on poweShell infront of-(ubuntu@ip-172-31-3-81:) by coping command from node.js web site: for this you will get some issues so ask to chat gpt for install node with this Prompt:
   what happening here, we created a machine ubuntu on powershell which we get from aws website,  and my tutor gone to node.js wweb and copy comnd from there and paste in bash(as he have mac) but i have windows so powershell, but my tutor was saying use version that you have installed earlier like current is v24 but i have installed node v:22 so i done that cmd but i didnt installed node like this way i just go below and clicked a button window installer, i think that docker come now earlier was  not there
