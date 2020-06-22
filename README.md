# Ticket Trackr

This application was inspired by my love for cost-effective travel, including a business I love by the name of [Scott's Cheap Flights] that has helped me travel the world. The idea is to provide users a very simple interface for finding live pricing data and eventually for tracking live pricing on multiple itineraries. 

For this project my two goals were to really 1) have something functional on a tight deadline and 2) challenge myself with a framework that was fresh in my skill set. Additionally, I wanted to push focus that challenge on work with APIs. 

## Technologies Used

Current Build Front End:
React + Reactstrap + Axios + Surge

Current Build Back End:
Python/Django + Postgres(via Heroku) + Heroku 

## Current Iteration

Older versions of this project used the now deprecated Rapid API access for Skyscanner's live prices API. That was a very fun API to use and employ successfully. Now the project uses their cached quotes API to pull from their cache of pricing data.  

## Further Development

-The user layer is the next goal. With the live pricing API, I was going to save search parameters for a search so the user could pull back up old searches and see how the prices have changed/monitor prices over time and pounce at the right moment (hypothetically - this was and remains an experimental project). That can still work with the cached quotes API I'm using now, but likely won't be as dynamic or thorough a data set. 

-I'd love to dive deeper into suggestive search. I'd employ a from-scratch solution to populate airport names in the flight search form (drawing from a database generated and cached from another API somewhere).

## Installation

It should be straightforward - I used NPM to handle my package management so a simple NPM install ought to do the trick! 

[Scott's Cheap Flights]: https://scottscheapflights.com/
