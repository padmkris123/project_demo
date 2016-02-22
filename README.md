Steps to execute the project - local

IMPORTANT:
All the commands are to be executed in command prompt.

Pre-requisites:
1. Nodejs (https://nodejs.org/en/download/)
2. Npm - Comes along with Nodejs package
3. Git (http://git-scm.com/)
4. Bower - run command 'npm install --global bower'
5. Grunt - run command 'npm install --global grunt-cli'
6. (For MAC users only) Run command 'xcode-select --install'
7. Run command 'gem update --system'. (For MAC users only: you will have to use sudo rights)
8. Run command 'gem install compass'. (For MAC users only: you will have to use sudo rights)

How to run the project?
1. Copy the project folder to your workspace.
2. Go to the project directory.
3. Run command 'npm install'. Installs all the modules under package,json to node_module folder
4. Run command 'bower install'. Installs all the libraries under bower.json to bower_components
5. Run 'grunt serverLive'.
8. Go to browser and use http://localhost:8000 to access the project.


Pending items:
1. Fix filter functionality in grid
2. add search field. (cnum = c12345.)
3. add static form.
4. polish the navbar (add logged in user's name)
5. add login screen / manage accounts.
6. Add validation on tree.
7. click on table row should open pdf doc in new tab.
8. take the 'Go results' button to the bottom of the page.
9. rename grid columns/ tree structure.
