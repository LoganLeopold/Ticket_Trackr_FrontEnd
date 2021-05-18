# Ticket Trackr

This application was inspired by my love for cost-effective travel, including a business I love by the name of [Scott's Cheap Flights] that has helped me travel the world. The idea is to provide users a very simple interface for finding live pricing data and eventually for tracking live pricing on multiple itineraries. 

For this project my two goals were to really 1) have something functional on a tight deadline and 2) challenge myself with a framework that was fresh in my skill set. Additionally, I wanted to push focus that challenge on work with APIs. 

## Technologies Used

Current Build Front End:
React + Reactstrap + Axios + Surge

Current Build Back End:
Python/Django + Postgres(via Heroku) + Heroku 

## Current Iteration

Older versions of this project used the now deprecated Rapid API access for Skyscanner's live prices API. That was a very fun API to use and employ successfully. After it was deprecated, I put the Python work on hold to use this as a vector for more front-end-focused learning on concepts I did not get to work on in my day job: hooks, async/await, etc. An actual stretch goal I left notated below for posterity's sake was an autocomplete for some fields, which I did end up recently implementing through a third-party API portal I already had wired up.

## Further Development

-The user layer is the next goal, which I intend to pick back up soon. Whether that's with the original Python back end or I double-down with the Node work I've been doing remains to be seen! Either way, I will save queries so the user can recall old searches so they could hypothetically see how the prices have changed/monitor prices over time and pounce at the right moment. Now that live pricing is deprecated, this will be all of the same historical data until a replacement emerges. The proof of concept will work, but likely won't be as dynamic or thorough a data set. 

-I'd love to dive deeper into suggestive search. I'd employ a from-scratch solution to populate airport names in the flight search form (drawing from a database generated and cached from another API somewhere).

## Installation

It should be straightforward - I used NPM to handle my package management so a simple NPM install ought to do the trick! 

[Scott's Cheap Flights]: https://scottscheapflights.com/
