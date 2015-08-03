# React + Webpack Boilerplate

## What is this?

A boilerplate for building new apps using [React][react]

#### What's included

**Client Side:**

* [React][react]
* [Webpack][webpack]
* [Babel][babel]
* [Stylus][stylus]

**Server Side:**

* [Babel][babel] (via [Babel require hook](https://babeljs.io/docs/usage/require/))
* [Express][express]
* [Waterline][waterline]

#### Front-end use

This is meant to be a base level boilerplate for front-end development. It does not include any libraries for routing or state management. It's meant to make it very quick to start a React project with any React-oriented technology. For example, adding [React Router][rr] and [Flux][flux] to this project would be as simple as `npm install --save react-router flux`.

#### Back-end use

This repo also comes with a fully-functional back-end implemented in Node with Express and Waterline. You're welcome to not use the server side at all as it may well be more than you need for a project, but it's there if you want it. To see how it's implemented have a look at [api.js][api] where you'll find a fully functional REST API for `Thing` models.

[api]: https://github.com/iansinnott/react-boilerplate/blob/master/server/api.js

## Usage

```bash
$ git cloneo --depth 1 https://github.com/iansinnott/react-boilerplate <new-project>
$ cd <new-project>
$ rm -rf .git
$ npm install
$ gulp
```

Be sure to replace `<new-project>` with the name of the project you want to create.

That's it. Now you're ready to start building.

## MongoDB

The default method of persistence is MongoDB. By default app data will be stored locally in `./db`. By default running `gulp` will also run a `mongod` process in the background for your app to communicate with. If you would like to run your own `mongod` process, perhaps to configure it according to your needs then you can do so. Simply run your `mongod` process and call `gulp nodemon webpack` to bypass the Gulp-ified `mongod` process.

## Postgres

**Update:** Postgres is not yet implemented. It is a work in progress pending migrating away from Mongoose and to Waterline as the ORM.

To get postgres up and running on a mac make sure you can run the following command:

```
postgres -D /usr/local/var/postgres
```

## Reasons to use React + Webpack

#### Rapid Development

React is declarative, which makes it a pleasure to use for anyone who is used to the manual way of triggering DOM updates. Using React with Webpack allows you to take rapid development to the next step by supporting live code injection for _all_ filetypes, not just CSS.

For example, as you change your JSX you can see it live-update in the browser the second  you save it. There will be no page reload, the HTML will simply update.

This of course goes for CSS or any of it's preprocessors. You can even apply this to files like markdown and see your site update as you edit the text. For example, every time I save this file I see the live preview in the browser update automatically without reloading the page. Magic!

## Yet to come

- [x] ~~Production tooling~~
- [ ] Available as a module
- [ ] Testing boilerplate
- [ ] Git hooks
- [ ] Multiple database support
- [ ] General deployment improvements

## TODO: Create NPM Module

Although I created this project long before seeing a [similar project by Henrik Joreteg][hjs], I really like a lot of what he's doing over there. One of the main features that I'd like to incorporate is the use of a boilerplate as an installable Node module.

Clone a git repo and completely removing the repo part once it's downloaded is simple but it's also not using git the way it was meant to be used. Furthermore it removes the possibility of updating the underlying project base in a way. Therefore I intend to borrow from [hjs-webpack][hjs] and implement this project as module. Those changes are coming.

[hjs]: https://github.com/henrikjoreteg/hjs-webpack

## TODO: Deployment Improvements

This is fairly vague because there is not currently one surefire way to deploy every type of application you might want. Maybe you want to run on AWS. Maybe it's a static site and you're happy hosting on Surge.sh. The problem is there isn't just one way, so it's hard to define a `deploy` command that's both effective and flexible.

The solution I propose is to create a Dockerfile that can be used to build an app that can run anywhere Docker is running.

[react]: http://facebook.github.io/react/

## Troubleshooting

#### Live reload (aka Hot Module Replacement) doesn't work.

One of the gotchas of the hot react loader seems to be that it will not hot work with files in the root of the client directory. If you edit `client/index.js` or `client/Router.js` it will not do a live reload, you will have to to it manually.



[react]: http://facebook.github.io/react/
[webpack]: http://webpack.github.io/
[babel]: https://babeljs.io/
[stylus]: https://learnboost.github.io/stylus/
[express]: http://expressjs.com/
[waterline]: https://github.com/balderdashy/waterline
[flux]: https://facebook.github.io/flux/docs/overview.html
[rr]: https://github.com/rackt/react-router

