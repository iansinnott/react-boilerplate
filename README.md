# React + Webpack Boilerplate

A boilerplate for building web applications with Node.js

## The Stack

**Client Side:**

* [React][]
* [Webpack][]
* [Babel][]
* [Stylus][]

**Server Side:**

* [Babel][] (via [Babel require hook](https://babeljs.io/docs/usage/require/))
* [Express][]
* [Waterline][]

## Rationale and Philosophy

This project is a dynamic view of my thoughts on developing applications for the web, developer experience (DX), tooling and deployment strategies.

The two driving philosophies I try to embrace in this project are:

* Don't do anything the computer can do for you
* DX is positively correlated with UX, maintainability and stability
* Speed is a catalyst of creation

Creating a new application can be broken down broadly into three steps: setup, development and deployment. Setup only needs to happen once during the life-span of a project, but it can take a long time. Again, we want to optimize for developer experience and speed so a long setup time is a dealbreaker. Luckily setting up a project is something a computer can do so we are going to let it do that for us.

The stack used here when scaffolding out a new project is opinionated and constantly evolving, so it may not be right for you. But at the very least it will provide you with one possible option for creating advanced web applications efficiently and with minimal overhead.

### A note on speed

What I mean by speed is being able to set up fast and iterate fast. Speed is not only key because it let's us build more with less time. It's also key because it decreases the _perceived_ cost of creation. If setting up a new project takes hours, we are much less likely to even start that new project. This in my mind is a failing of modern tooling. Setting up a new project should take minutes if not seconds. Once the perceived cost of starting a new project is measured in seconds then any idea no matter how trivial warrants an exploratory build.

Speed of iteration is key because project needs change and the project itself needs to be able to change along with those needs. This means that refactoring should be easy and feedback immediate. As with setting up a project, there's a perceived cost associated with making changes to a project. If that perceived cost is too high, changes won't get made and the project will stagnate or accumulate technical debt. This leads to product failure, instability and a codebase that's no longer fun to work with. **Development should be fun, if it's not then you're doing it wrong.**

## What's included

### Front-end

This is meant to be a base level boilerplate for front-end development. It does not include any libraries for routing or state management. It's meant to make it very quick to start a React project with any React-oriented technology. For example, adding [React Router][] and [Flux][] to this project would be as simple as `npm install --save react-router flux`.

### Back-end use

This repo also comes with a fully-functional back-end implemented in Node with Express and Waterline. You're welcome to not use the server side at all as it may well be more than you need for a project, but it's there if you want it. To see how it's implemented have a look at [api.js][api] where you'll find a fully functional REST API for `Thing` models.

[api]: https://github.com/iansinnott/react-boilerplate/blob/master/server/api.js

## Usage

**Warning:** This section is actively changing and will look very different once this repository has been converted into an NPM module.

```bash
$ git cloneo --depth 1 https://github.com/iansinnott/react-boilerplate <new-project>
$ cd <new-project>
$ rm -rf .git
$ npm install
$ gulp
```

Be sure to replace `<new-project>` with the name of the project you want to create.

That's it. Now you're ready to start building.

## Waterline Mini-docs

To quickly and easily get up and running with Waterline here is some useful info:

* Types
  * `string`
  * `text`
  * `integer`
  * `float`
  * `date`
  * `time`
  * `datetime`
  * `boolean`
  * `binary`
  * `array`
  * `json`
* [Validations][]
* For quick docs see [readme][]

[Validations]: https://github.com/balderdashy/anchor/blob/master/lib/match/rules.js
[readme]: https://github.com/balderdashy/waterline

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
- [x] Multiple database support
- [ ] Available as a module
- [ ] Run production DB in dev
- [ ] Testing boilerplate
- [ ] Type Safety
- [ ] Git hooks for eslint + type safety
- [ ] General deployment improvements
- [ ] Use chunk hashes in filenames and add long-term caching headers

## TODO

### Type Safety

> Don't let a human do anything a computer can do for you.

Strong typing is great, but mandatory type annotations are not. If the computer can analyze your code and warn you of type digressions at build time then why not use such a feature? Even better, warn me at _save_ time. Type safety through type _inference_ is a top priority of this project. 

The goals I believe any JS type system should aspire to are as follows:

* **Inferred.** If I can infer the type signature of a function just by reading its source then the computer should be able to do the same and warn my of type digressions without me explicitly annotating code.
* **Fully optional.** JS is decidedly _not_ strongly typed and there may well be cases where the use of typing is undesirable or incompatible with some existing JS code. Even the inference feature should be optional. Moreover, we should be able to quickly add type annotations after the fact so that we don't worry about types during rapid prototyping but can quickly add them when we're ready to ship production code.

The author of Clojure's [core.typed][] optional typing library provides an [excellent and concise overview of the rational behind optional typing][rational].

[rational]: https://github.com/clojure/core.typed/wiki

There are currently a several contenders for making this a reality:

**[Flow][]**

Flow is great for type-safety in JavaScript and writing self-documenting code. It integrates tightly with React and respects `propTypes`. The main downside of using it now is that `let` and `const` are not supported. That's a dealbreaker, but apparently [they are working on it](https://github.com/facebook/flow/issues/560). Keep an eye on that issue to see when full support drops.

**[TypeScript][]**

It seems TS already support ES6 and typing is fully optional. I'm not yet sure of the advantages / disadvantages of TS vs Flow. Need to do more research. At first glance flow wins largely because it was such nice interplay with React and was built by the same people. Also TS is a Microsoft thing, which is an immediate turn off. But let's not let that bias us too much.

**[Closure Compiler][]**

Aside from industrial strength optimization and minification the Google Closure Compiler also does type checking and warns about common JS pitfalls. This would likely be a build-time, production-level optimization and would not exclude the use of Flow or TS.

[Closure Compiler]: https://developers.google.com/closure/compiler/

**[ClojureScript][]**

Writing apps in ClojureScript is the ultimate goal as it currently presents the strongest front for writing stable, maintainable and readable code while not sacrificing DX. Many of the great ideas that have come into the JS ecosystem recently are all very standard and known in the Clojure world. CS can hit many compile targets including mobile. Clojure and CS treat immutability as Node.js treats asynchronisity: It's the desirable default. The CS community embraces immediacy and feedback with hot-loading and being able to immediately evaluate code.

Clojure itself is dynamically typed but it provides the optional [core.typed][] library for bringing the strengths of static typing to Clojure and thereby CS as well.

### Create NPM Module

Although I created this project long before seeing a [similar project by Henrik Joreteg][hjs], I really like a lot of what he's doing over there. One of the main features that I'd like to incorporate is the use of a boilerplate as an installable Node module.

Clone a git repo and completely removing the repo part once it's downloaded is simple but it's also not using git the way it was meant to be used. Furthermore it removes the possibility of updating the underlying project base in a way. Therefore I intend to borrow from [hjs-webpack][hjs] and implement this project as module. Those changes are coming.

### Deployment Improvements

This is fairly vague because there is not currently one surefire way to deploy every type of application you might want. Maybe you want to run on AWS. Maybe it's a static site and you're happy hosting on Surge.sh. The problem is there isn't just one way, so it's hard to define a `deploy` command that's both effective and flexible.

The solution I propose is to create a Dockerfile that can be used to build an app that can run anywhere Docker is running.

### Running a production database in dev

It is currently possible to easily run Mongo in the background during development using `gulp mongod`. I'd like to add similar support for Postgres and make it easy to switch between the two.

## Troubleshooting

#### Live reload (aka Hot Module Replacement) doesn't work.

One of the gotchas of the hot react loader seems to be that it will not hot work with files in the root of the client directory. If you edit `client/index.js` or `client/Router.js` it will not do a live reload, you will have to to it manually.

[React]: http://facebook.github.io/react/
[Webpack]: http://webpack.github.io/
[Babel]: https://babeljs.io/
[Stylus]: https://learnboost.github.io/stylus/
[Express]: http://expressjs.com/
[Waterline]: https://github.com/balderdashy/waterline
[Flux]: https://facebook.github.io/flux/docs/overview.html
[React Router]: https://github.com/rackt/react-router
[hjs]: https://github.com/henrikjoreteg/hjs-webpack
[ClojureScript]: https://github.com/clojure/clojurescript
[core.typed]: https://github.com/clojure/core.typed
[TypeScript]: https://github.com/Microsoft/TypeScript 
[Flow]: http://flowtype.org/

