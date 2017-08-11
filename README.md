
[![Build Status](https://travis-ci.org/FAC-11/thehoax.svg?branch=master)](https://travis-ci.org/FAC-11/thehoax)

# Tinfoil

## Why?
have you ever wondered if something is true but been too embarrassed to ask your friends?

Here's some of our concerns:
> Are all politicians really lizard people?

![](https://media.giphy.com/media/13VfwuMNgBcN8s/giphy.gif)

>
> The moon landing was __fake__!

![](https://media.giphy.com/media/AlabRxVQ6YBfa/giphy.gif)
>
> Giant cat aliens build the pyramids

![](https://media.giphy.com/media/QBtzAnMFO5i9O/giphy.gif)
>
> The earth is flat!

![](https://media.giphy.com/media/qGS2Wbjr0SJWg/giphy.gif)
>

> Is Abdullah a spy?

![](https://media.giphy.com/media/6SQMmvQWoh2Eg/giphy.gif)


## User Stories
As a user I want to:
- [x] Have a secure login so the government can't track my conspiracies
- [ ] Enter a theory I want information on
- [ ] Recieve information on my theory to read more into peoples' views  
- [x] View other users' theories who are using the site
- [ ] (stretch) Be able to comment on other people's theories
- [ ] (stretch) Fake social media sharing icon that send back warnings

## What

Our site allows authorised user to enter into _*Tinfoil'd*_ via a username, email and password and takes them to the conspiracy hub.
Here you can see conspiracies that people have searches for and enter your own theories.
In release 2.0 you will be able to search for conspiracies through the Hoaxy API to receive information on your theory.

## How?
1. Skeleton files and basic HTML outline
2. Build databases...

### Database Schema
#### users

| Column | Type | Modifiers |
| -------- | -------- | -------- |
| id    | Serial     | Primary Key    |
| username     | VARCHAR(100) | not null    |
| email     | VARCHAR(100)     | not null   |
| hash     | VARCHAR(100)     | not null    |

#### history

| Column | Type | Modifiers |
| -------- | -------- |-------- |
| id    | Serial     | Primary Key     |
| userid     | int4    | REFERENCES users(id)    |
| searchdate    | timestamp     | not null    |
| search    | VARCHAR(100)    | not null   |

3. create handlers, server, router
4. Make amazing waterfall function to validate login with hashy salts
5. Tests!
6. Front end validation
7. Render database on '/tinfoild'
8. Check if cookie exists and redirect (so no login required)
_* Coming soon *_
9. Be able to enter your own searches, render on page and store in database
10. Be able to search for articles related to your conspiracy theory

## Learnings
* Waterfall functions
* How to have multiple pages on a site
* Authentication
![](https://media.giphy.com/media/zLydqDQu8fDLW/giphy.gif)
