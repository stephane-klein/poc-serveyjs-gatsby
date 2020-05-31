# POC SurveyJS + Gatsby + Postgraphile

Based on:

- [SurveyJS](https://github.com/surveyjs/survey-library)
- [Gatsby](https://github.com/gatsbyjs/gatsby)
- [Postgraphile](https://www.graphile.org/postgraphile/)

Demo video: https://youtu.be/yMdjBaz2Wa4

## Why this project?

I would like to create conditional form surveys.

This is journey:

- attempt 1: with [Google Forms](https://en.wikipedia.org/wiki/Google_Forms) ⇢ it failed, Google Forms is too limited about conditional feature
- attempt 2: with free [TypeForm](https://en.wikipedia.org/wiki/Typeform_(service)) plan ⇢ it failed, too limited about conditionnal (« Logic jumps »)
- attempt 3: with professional [TypeForm](https://en.wikipedia.org/wiki/Typeform_(service)) plan ⇢ it failed, really tough and tedious to configure and some limitations
- attempt 4: with OpenSource [LimeSurvey](https://en.wikipedia.org/wiki/LimeSurvey) ⇢ less limitation that Google Forms and TypeForm but really tough and tedious to configure

Finally, after some search on GitHub, I found [SurveyJS Library](https://github.com/surveyjs/survey-library) and I wrote this POC to test it.

It is a success, now I can write and configure my survey with code: [`src/datas/surveys.json`](src/datas/surveys.json).

SurveyJS have many buildin [Question Types](https://surveyjs.io/Examples/Library?id=questiontype-text&platform=jQuery&theme=modern) and I can customize or create new Question Types.

Yes, I know, this solution isn't accessible to non-programmers people, but I'm programmer, and with this stack, I have no limitation and I can write survey quickly, without painfull UI.

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/) (version `18.06.1-ce`)
- [Docker Compose](https://docs.docker.com/compose/) (version `1.22.0`)
- [nodejs](https://nodejs.org/en/) (version `v12.10.0`)

### On OSX: install with Brew

Brew is a popular package manager on *macOS*.
However it does not come pre-installed: follow the instructions from the Brew [Website](https://brew.sh/index_fr):

```sh
$ brew cask install docker
$ brew install git node yarn
```

## Getting started

```
$ docker-compose up -d postgres
$ ./scripts/load-seed.sh
$ docker-compose up -d
```

Run frontend:

```
$ yarn install
$ yarn develop
```

Go to http://127.0.0.1:8000/survey/fullstack/ and fill the survey.

See results:

```
$ ./scripts/enter-in-pg.sh
```