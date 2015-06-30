# React + Webpack Boilerplate

## What is this?

A boilerplate for building new apps using [React][react]

#### What's included

* React
* Webpack
* Stylus
* Markdown
* Babel
* Hot reloads on JS / Stylus changes

This is meant to be a base level boilerplate. It does not include any libraries for persistence, routing, state management, etc. It's meant to make it very quick to start a project with any given technology. For example, adding react router to this project base would be very quick.

## Usage

```bash
$ git clone -o upstream https://github.com/iansinnott/react-boilerplate.git new-project-name
$ cd new-project-name
$ npm install
$ gulp
```

That's it. Now you're ready to start building.

## Reasons to use React + Webpack

#### Rapid Development

React is declarative, which makes it a pleasure to use for anyone who is used to the manual way of triggering DOM updates. Using React with Webpack allows you to take rapid development to the next step by supporting live code injection for _all_ filetypes, not just CSS.

For example, as you change your JSX you can see it live-update in the browser the second  you save it. There will be no page reload, the HTML will simply update.

This of course goes for CSS or any of it's preprocessors. You can even apply this to files like markdown and see your site update as you edit the text. For example, every time I save this file I see the live preview in the browser update automatically without reloading the page. Magic!

## Yet to come

* Git hooks to enforce ESlint before commit
* Production tooling
* Testing boilerplate

[react]: http://facebook.github.io/react/

## Troubleshooting

#### Live reload (aka Hot Module Replacement) doesn't work.

One of the gotchas of the hot react loader seems to be that it will not hot work with files in the root of the client directory. If you edit `client/index.js` or `client/Router.js` it will not do a live reload, you will have to to it manually.
