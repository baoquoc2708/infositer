## InfositeR Deployment

**TEMP NOTE: This repo is missing a dependency file (pending). In order to make this project work, you need to include these two folders: 'ext-libraries' and 'amp-premier'**

After each pull request is approved and merged, the merging party must deploy to both prod-dev and prod-staging by completing the following tasks.

* Pull the merged changes: ` git pull origin master `

* Run the build task. This packages changes and places them into the proper locations of the master folder:  `gulp infosite-build`

* Open FileZilla, connect to the server and drag "dynamic" from the master folder into the root folder of the server (only prod-dev and staging. NEVER the live server)


## Core Player

Here's a quick rundown of the development workflow as it relates to git. First, grab the repository:

```
git clone ssh://git@stash.portal.webmd.com:7999/profpromodev/infositer.git
```

This will create a directory named `infositer` and the project contents will be inside. `cd` into the directory and install any `npm` packages.

```
cd infositer
npm install
```


To start work on a new feature:

```
git checkout -b feature/my-new-feature
```

This will create a new branch named `feature/my-new-feature`. The process from here is pretty much the same as it ever was. Develop a bit, commit your changes, develop some more. The key thing to remember is that periodically you'll want to execute this command:

```
git pull origin master
```

This will grab all of the changes on master and merge them into your local branch. It's a good idea to do that frequently so that you don't end up with conflicts (or when you do, they're relatively minor).

When you're ready to publish your new feature do the following:

```
git push origin feature/my-new-feature
```

Then

* navigate to [the Stash pull request page](https://stash.portal.webmd.com/projects/PROFDEVPOC/repos/csd-core-library/pull-requests?state=open) and hit the 'Create Pull Request' button.
* Select your branch from the top dropdown menu
* Hit continue
* Describe your pull request in the text box
* Click the save button to create the pull request

Grab a buddy to review your changes and merge them into master. That's it. :)


## Development Server

To start the dev server, first install the node libraries. You'll want
to do this any time the package.json file is updated.

```
npm install
```

To run webpack dev server:

```
npm run dev
```

If `webpack-dev-server` not found, edit your `.bash_profile` or your PATH variable on Window:

```
PATH=$PATH:node_modules/.bin
```



If you run into "Module not found":

```
npm install --save-dev <module-name>
```