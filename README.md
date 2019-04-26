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

## Build Storyline

At the outset of the application build I wanted the data to go from the API --> my Python/Django backend --> my React app. I was learning how to make third-party API calls with Python/Django to begin with, but Skyscanner's functions with a twist:

-First a call is made that establishes a session ID - this session is using the search paramters to send live-pricing searches out to all of SkyScanner's sources.
-A second call using the session ID is made to get the results from your session. 

I knew that would be a unique challenge for me at the time. I decided to get the app functional using a simpler call, so I used a SkyScanner airports API call to get a list of airports that would populate a suggestive search when users were choosing their origin and destination. After going through Django REST documentation and realizing I did not need most of what was there, I had success and could send data to my React app from the airports API through my backend. 

Eventually, I ended up pausing backend development to fit my timeline. The main reason was that I did not find a satisfying way to handle asynchronous API calls (getting the session ID then polling the session) in Python/Django in the timeframe I had. I knew Axios, and so I excluded the backend I built and placed all of my third-party API calls directly in my React app with Axios. 

I did accomplish the goals I had at the outset, just not the way that I envisioned. I did challenge myself with a fresh framework and I learned a lot, but that language and framework combo did not make it into the first live version of the app. I also did have something functional - although a bit crude - within the desired timeline. 

## Further Development

There is a great deal of further development to be done here. One of the reasons I wanted to increase my Python/Django experience is that authentication is a breeze with that framework. Users are definitely coming to this project - I want to be able to use this app to track live prices for my itinerary! 

There's a copule sore spots that I ran into during development that I want to tackle even before that though:

-Firstly, I want to accomplish efficient suggestive search. This will likely come from wiring up a database. The good news is that I already have lots of Django documentation under my belt and a backend architecture already well-founded. I think this will be huge for when users are choosing their airports, and I want to dig deeper into handling large data sets (there are roughly 16,000 airports in the SkyScanner database).

-Secondly, a more simple issue is making sure the user has a good indication that the API is still polling. Right now there is a crude solution, but I know there's a simple fix out there for communicating continuation of search efforts to the user. 

-Finally, I am nowhere near satisfied with the design of the site. I will be continuously working on the visual quality of all the site's design.

## Installation

It should be straightforward - I used NPM to handle my package management so a simple NPM install ought to do the trick! 

[Scott's Cheap Flights]: https://scottscheapflights.com/
[found here]: https://rapidapi.com/skyscanner/api/skyscanner-flight-search