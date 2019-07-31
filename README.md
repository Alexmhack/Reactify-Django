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

## Routing
The package that we are gonna be using for handling routes in react is [react-router-dom](https://github.com/ReactTraining/react-router#readme).

There are many other packages which can handle the same thing for us.

So using react-router-dom is very easy. We will be using it to handle post detail page, for 
example if user clicks on the link of the post from the posts list page we can simply route
the browser to the post detail page without reloading the page, all of this just using react
and not even touching django except of one place which is to define a url so that django can
render the template for that url on its server.

Add a regular expresssion url path **reactify/urls.py**,

```
...
from django.urls import path, include, re_path

urlpatterns = [
	...
    re_path(r'^posts/', TemplateView.as_view(template_name='react.html')),
]

```

`re_path` is a replacement for `url` in django which allows us to use regular expressions in
urls, the above url will use the template, *react.html* for every url that starts with **posts**
for example for our local server this url would look like, [http://127.0.0.1:8000/posts/](http://127.0.0.1:8000/posts/) and can also be literally anything after **posts** [http://127.0.0.1:8000/posts/asdfasdfadf](http://127.0.0.1:8000/posts/asdfasdfadf).

We are rendering the same template, **react.html** from **templates** folder and leaving rest
on the react to handle the posts and post detail page or basically view for us.

After adding this url in django **urls.py** file we will use React to handle the rest.

Install **react-router-dom** by running,

run this where your package.json file is located.
```
npm install --save react-router-dom
```

Now import the necessary modules in **reactify-ui/src/App.js** file,

```
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
```

And in the place where you use the `Posts` component tag, replace that line with `BrowserRouter`

```
...
	<BrowserRouter>
		<Switch>
			<Route exact path='/posts/' component={Posts} />
			<Route exact path='/posts/:slug/' component={PostDetail} />
			<Route component={Posts} />
		</Switch>
	</BrowserRouter>
...
```

Before running `npm run collect` you can remove the `PostDetail` and just use `Posts` there 
since we have not yet created that component, so change that to,

```
...
	<BrowserRouter>
		<Switch>
			<Route exact path='/posts/' component={Posts} />
			<Route exact path='/posts/:slug/' component={Posts} />
			<Route component={Posts} />
		</Switch>
	</BrowserRouter>
...
```

Now run `npm run collect` and go the root url of django and everything works perfectly fine, 
you get your posts list page.

Go to [127.0.0.1:8000/posts/](http://127.0.0.1:8000/posts/) and the same component `Posts` is
rendered since we define the **exact path for /posts/** with the component `Posts`.

You can also go to [127.0.0.1:8000/posts/asdfasfd](http://127.0.0.1:8000/posts/asdfasfd) and 
the same component will be rendered.

### PostDetail Component
Now comes the new component which will render out the detail page for post.

Create a new file named **PostDetail.js** in the **posts** folder and copy the code from this
repo and paste it in your file.
code in it.

So what are we doing? We are using the props to check if the match for the exact path
**posts/:slug/** exists and if it does we are getting that parameter slug from the url and
setting that slug in the state and at last rendering it in `<h1>` tag in the html page.

And for the **slug** part, we have defined a Route with the **path: '/posts/:slug/'**. Here
**:slug** is the url parameter that we use like this, `const {slug} = this.props.match.params`.

Now in the **src/App.js** file change the Route component to,

```
<Route exact path='/posts/:slug/' component={PostDetail} />
```

ofcourse don't forget to import the component,

```
import PostDetail from './posts/PostDetail'
```

Now link your post detail page to the posts list by using `Link` from **react-router-dom**.

```
import { Link } from 'react-router-dom'
...
...
		    <h1>
              <Link maintainScrollPosition={false} to={{
                pathname: `/posts/${post.slug}`,
                state: {fromDashboard: false}
              }}>
                {post.title}
              </Link>
            </h1>
              ...
```

Refer to [docs](https://reacttraining.com/react-router/) to know more about the Link.

Now run `npm run collect` and click on the post **h1** link and you will be shown the post
detail page with the slug without reloading the browser. Now that's cool!
