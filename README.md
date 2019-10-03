# Ticket Trackr

This application was inspired by my love for cost-effective travel, including a business I love by the name of [Scott's Cheap Flights] that has helped me travel the world. The idea is to provide users a very simple interface for finding live pricing data and eventually for tracking live pricing on multiple itineraries. 

For this project my two goals were to really 1) have something functional on a tight deadline and 2) challenge myself with a framework that was fresh in my skill set. Additionally, I wanted to push focus that challenge on work with APIs. 

## Technologies Used

Current Build:
React + Axios + Reactstrap

Developing Build: 
React + Axios + Python/Django + Reactstrap

## Current Iteration

I found a live-pricing API by SkyScanner made available through RapidAPI ([found here]). 

The current live version of the application is a React app that makes a call to this API with axios and displays the live pricing data provided by SkyScanner. In addition, another SkyScanner API is used to populate a list of countries for a search parameter dropdown list. The price is displayed if one is found or the user is alerted if there is an error.  

## Further Development

There is a great deal of further development to be done here. First of all, the full-fledged version will have a backend in Python/Django so I can display the live-pricing on routes the user has saved and they can continuously track desired routes. I already have the backend retrieving from the API.

There's a copule sore spots that I ran into during development that I want to tackle even before that though:

-Firstly, I want to accomplish efficient suggestive search. This is the next step after I finish up database configuration. The good news is that I already have lots of Django documentation under my belt and a backend architecture already well-founded. I think this will be huge for when users are choosing their airports, and I want to dig deeper into handling large data sets (there are roughly 16,000 airports in the SkyScanner database).

-Secondly, a more simple issue is making sure the user has a good indication that the API is still polling. Right now there is a crude solution, but I know there's a simple fix out there for communicating continuation of search efforts to the user. 

-Finally, I am nowhere near satisfied with the design of the site. I will be continuously working on the visual quality of all the site's design.

## Installation

It should be straightforward - I used NPM to handle my package management so a simple NPM install ought to do the trick! 

[Scott's Cheap Flights]: https://scottscheapflights.com/
[found here]: https://rapidapi.com/skyscanner/api/skyscanner-flight-search
