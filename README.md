# Reactify-Django
Integrating React library for the frontend with the Django backend (by following tutorial)

This repository is a customized version of [Reactify-Django](https://github.com/codingforentrepreneurs/Reactify-Django), you can follow the tutorial [here](https://www.youtube.com/watch?v=AHhQRHE8IR8).

## Installation
Since we are integrating Django and React, we need these both installed in our local machine, for django

```
pip install django
```

And you can install NodeJS from [here](https://nodejs.org/en/). NodeJS gives us the npm(Node Package 
Manager) and npx(npm execute). We use these for installing and creating node packages.

To check if these installations are working run `django-admin` and list of all commands will appear and also
run `npm` and then run `npx`, you should list of commands that you can run, this indicates that you have successfully installed both django and nodejs.

## Start Projects
To create django project run,

`django-admin startproject reactify .`

The trailing **.** at the end of the command tells django to create all the files and folders of the project 
inside the current directory.

To create react app run,

`npx create-react-app reactify-ui`

This will create a seperate folder named reactify-ui with all the react project.

## package.json & settings.py
For making things easier for us in the long run and for bigger projects we have to make some changes in our
**package.json** file which is located in the **reactify-ui** folder, open this file in your text editor and
scroll to `"scripts"`, you will find the `"build"` key there.

`npm run build` or simply `npm build` is the command for creating a production ready build folder for the 
react static files (CSS, JS, Media files).

If you run the above build command inside **reactify-ui** folder you will find a new folder **build** is 
created for you by react which contains another folder **static** containing **CSS, JS, Media** folders.

These files are same like django static files which we refer to in django templates with `static` template
tag like this,

```
{% load static %}
...
<link href="{% static 'css/app.css' %}">
...
```

These files are served from a folder in local django environment from the `STATICFILES_DIRS` setting defined 
in `settings.py` file.

So the real question is how do you tell django to serve the react build folder files in the templates.

This is where we define some custom react script commands like the ones in this repo in **reactify-ui/package.json** file.

The `npm run collect` command defined in the **package.json** file does four things for us in one command
saving a lot of time for using, those things are,

1. Run build command for react files => `npm run build`
2. Rename the build folder files => `npm run build-rename`
	What happens by renaming is that we can easily refer to that file only once rather than changing the file name again after running build command.
3. Copying the build folder files into django's `STATICFILES_DIRS` folder.
	`npm run copy-buildfiles` copies the files into respective folders inside `staticfiles` folder (we use staticfiles folder)
4. Runs collecstatic command of django which collects these files in `STATIC_ROOT` folder for production 	
	serving.

Organize the files and folders in your machine by referring to this repo and run `collect` command,

`npm run collect`

If you get errors that is probably because you don't have two node packages missing namely, `renamer` and 
`copyfiles`, if you figured that out and have installed them, that's cool otherwise install them using
`npm install --save renamer copyfiles`

## Run server
Done running `collect` command, now run the django server, create a home view with root url if not created
yet and head over to the server url and you will find the react default project starter page.
