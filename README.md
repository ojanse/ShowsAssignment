# ShowsAssignment

This project is the result of an assignment given by ABN AMRO to create an interface for tv shows, provided by the 
tvmaze API. The estimated time to use for this assignment was up to 6 hours.

## Assignment approach

These are the main development pieces I expect to tackle.

### API layer

The biggest challenge to tackle seems to be the lack of an endpoint that allows for filtering genre and sort by 
rating. I simply need all data in order to know if I have all genres, and to show the actual highest rated show up 
front. This means  I will need to create a local cache of the data through the show index endpoint. Seeing as this 
will take some time, a loading view is probably needed.

### Layout

The description of the app in the provided requirements bring to mind popular streaming service interfaces. These
usually have a left aligned UI that stretch the full width of the viewport. The search feature should always be 
accessible, so I will include it in a header. 

### Dashboard view

The dashboard is required to show tv shows grouped by genre in horizontal lists grouped by rating. I imagine using 
cards with thumbnails for the shows, scrollable through dragging and arrows on either side. I think developing this 
from scratch would not fit the time requirement, so I will use a library I have experience with: swiper.js.

### Detail view

The detail view isn't specified in the requirements. I imagine showing a bigger thumbnail here, the show summary, 
and some other details I will pick from the API.

### Search view

The search view will be accessible through a search bar in the header. I think it wouldn't make sense to use the 
same type of horizontal scrollable card container here as on the dashboard, as it would make the page quite empty. 
Instead, I will show the cards as a grid.

### Possible extra feature ideas

- Similar shows on the detail view, that includes shows that have the same set of genres
- A gradient background that changes color when on the detail view based on the average color of the image
- An option on the dashboard for the user to choose their sorting method
- An "all shows" button for each genre that goes to a page with an infinite/virtual scroll grid of cards.
- Show the networks that the tv show can be watched on, and maybe allow filtering per network app-wide.

## Stack choice

These are the tools I chose to use for this assignment:

* **VueJS**: Since I have experience with it and ABN AMRO uses it as well
* **Typescript**: For code that is more robust.
* **Plain css**: While SASS or PostCSS would give some benefits, I don't see big styling challenges that would 
  require the extra package.
* **Swiper.js**: For horizontal scrollable cards on the dashboard

## Time log

* **0:00:** Set up the project and write the assignment approach in this document.
* **0:40:** Create a local cache of all shows using IndexedDB, that only attempts to retrieve new pages on 
  concurrent visits.
* **1:40:** Found out the IndexedDB solution was too slow on Chrome. Converted the storage method to using the 
  FileSystemAPI through a webworker.
* **3:20:** Add the basic layout, css variables.
* **3:40:** Add genre filters in the shows store, implement swiper.js, show the shows sorted on the dashboard.
* **4:40:** Create detail page with some basic information. Get the data from the API, as our cache only contains a 
  simplified version to reduce storage.
* **5:20:** Create search page, add simple search bar to the header.
* **6:00:** Create tests, polish up some code here and there.
* **7:00:** Finish


## Reflection

This has been an enjoyable assignment, with an unexpected challenge in tackling the limited API capabilities. I kept 
the UI pretty straightforward, and I sadly didn't have time to go into my extra feature ideas. Below are a few of 
the considerations I made and things I didn't get to.

#### API

While I realized using local storage wouldn't be able to hold the 70000+ objects, even when simplified, I didn't 
expect IndexedDB to run into performance issues so quickly. I have to honestly say that I hadn't used the 
FileSystemAPI much before today, so it took a bit longer to figure out than I wanted. I also have only tested it on 
Firefox and Chrome. Safari gave an error that I'd need more time for to look into, and testing on mobile isn't as 
straightforward, as the FileSystemAPI requires a secure environment, so probably generating some local ssl key.

My approach would have been very different given an API that allows proper querying. I wouldn't have stored the data 
in a Pinia store, and have elected for Tanstack Query instead, as it makes dealing with caching multiple queries 
very easy. I'd have put my time into including things like pagination for the swipers and extra sorting functions.

#### UI

I understand that I opted for using swiper.js even though the assignment asked for limited use of plugins. I believe 
that even if I were to have saved some time with the API solution, I wouldn't have been able to include proper 
navigation within the time limit.

#### Testing

Normally I'd spend about as much time writing tests as developing, but seeing as I already was overtime by the time 
I got to the testing, I only got to a few unit tests before I felt I should stop.


#### Polish points

* The way I set the view height isn't ideal, creates scrollbars on mobile devices.
* The navigation arrows on the swiper lists aren't aligned properly across all the breakpoints
* Breakpoints could be defined with variables, and be used more consistently.
* Typography would work better as a sass/postcss mixin.
* The card containers really need some loading skeletons
* The pinia store tests are reliant on the load function. Would be better to allow testing them individually, which 
  would also improve the code of the store itself.
* Didn't set up my single/double quotes eslint rule properly, so they probably both exists.

#### Other thoughts

* Calling things 'show' might not have been the smartest decision. tvShow or similar would have spared some confusion.
* I opted for this folder structure as it helped me organize work in the past. Looking at it now, it is kind of 
  overkill for a project this size,