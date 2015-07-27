# React + Webpack Boilerplate

## What is this?

A boilerplate for building new apps using [React][react]

#### What's included

* React
* Webpack
* Babel
* Stylus

This is meant to be a base level boilerplate. It does not include any libraries for persistence, routing, state management, etc. It's meant to make it very quick to start a project with any given technology. For example, adding react router to this project base would be very quick.

## Usage

```bash
$ git clone -o project-base --depth 1 https://github.com/iansinnott/react-boilerplate <new-project>
$ cd <new-project>
$ npm install
$ gulp
```

Be sure to replace `<new-project>` with the name of the project you want to create.

That's it. Now you're ready to start building.

## Postgres

The default method of persistence is postgres. To get postgres up and running on a mac make sure you can run the following command:

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
- [ ] Testing boilerplate
- [ ] Git hooks

[react]: http://facebook.github.io/react/

## Troubleshooting

#### Live reload (aka Hot Module Replacement) doesn't work.

One of the gotchas of the hot react loader seems to be that it will not hot work with files in the root of the client directory. If you edit `client/index.js` or `client/Router.js` it will not do a live reload, you will have to to it manually.
