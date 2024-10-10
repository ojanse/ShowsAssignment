# ShowsAssignment

*By Olivier Janssen - For ABN AMRO Team Warp*

This project is the result of an assignment given by ABN AMRO to create an interface for tv shows, provided by the 
TVmaze API. The estimated time to use for this assignment was up to 6 hours.

## How to run

I used yarn 4 as my package manager, so to install packages, corepack needs to be enabled. If you do not want
to enable corepack, I've also included a very basic Docker config, so that you can fire up a container.

#### Locally:

I'm running node v20.11.1 locally. To enable corepack:

```corepack enable```

Then install the packages:

```yarn```

And run:

`yarn dev`

or

`yarn build` followed by `yarn preview`

#### Docker:

Simply run:

```docker compose up```

#### In case you want to flush the shows cache

Seeing as the app will use the shows cache after the first startup, I've added a quick way to clear that cache in case 
you ever want to load them up from the start again. Fill in your port and navigate to:

`http://localhost:<port>/?clear-cache`

## Requirements

Based on the assignment description, these are the requirements:

* Limit of 6 hours
* Use the TVmaze API
* A dashboard with shows grouped by genre, listed horizontally, sorted by rating
* A detail view per show
* A search function
* Write clean code, that is reusable and follows best practices
* Responsive and mobile friendly
* Limit the use of scaffolding, boilerplate, plugins.
* Create a readme (this file!)
* Include Unit tests
* Runnable and errorless
* Simple good-looking UI

## Assignment approach

These are the main development pieces I expect to tackle.

#### API layer

The biggest challenge to tackle seems to be the lack of an endpoint that allows for filtering genre and sorting by 
rating. I simply need all data to know if I have all genres, and to show the actual highest-rated show up front. This 
means  I will need to create a local cache of the data through the show index endpoint. Seeing as this will take some
time, a loading view is probably needed.

#### Layout

The description of the app in the provided requirements brings to mind popular streaming service interfaces. These
usually have a left-aligned UI that stretches the full width of the viewport. The search feature should always be 
accessible, so I will include it in a header. 

#### Dashboard view

The dashboard is required to show TV shows grouped by genre in horizontal lists grouped by rating. I imagine using 
cards with thumbnails for the shows, scrollable through dragging and arrows on either side. I think developing this 
from scratch would not fit the time requirement, so I will use a library I have experience with: swiper.js.

#### Detail view

The detail view isn't specified in the requirements. I imagine showing a bigger thumbnail here, the show summary, 
and some other details I will pick from the API.

#### Search view

The search view will be accessible through a search bar in the header. I think it wouldn't make sense to use the 
same type of horizontal scrollable card container here as on the dashboard, as it would make the page quite empty. 
Instead, I will show the cards as a grid.

#### Possible extra feature ideas

* List similar shows on the detail view, which includes shows that have the same set of genres
* A gradient background that changes color when on the detail view based on the average color of the image
* An option on the dashboard for the user to choose their sorting method
* An "all shows" button for each genre that goes to a page with an infinite/virtual scroll grid of cards.
* Show the networks that the TV show can be watched on, and maybe allow filtering per network app-wide.

## Libraries choice

These are the tools I chose to use for this assignment:

* **VueJS:** Since I have experience with it and ABN AMRO uses it as well.
* **Typescript:** For more robust code.
* **Plain CSS:** While SASS or PostCSS would give some benefits, I don't see big styling challenges that would 
  require the extra package.
* **Swiper.js:** For horizontal scrollable cards on the dashboard.
* **VueUse:** For some basic helper composables.

## Time log

* **0:00:** Set up the project and write the assignment approach in this document.
* **0:40:** Create a local cache of all shows using IndexedDB, that only attempts to retrieve new pages on 
  concurrent visits.
* **1:40:** Found out the IndexedDB solution was too slow on Chrome. Converted the storage method to using the 
  FileSystemAPI through a webworker.
* **3:20:** Add the basic layout, CSS variables.
* **3:40:** Add genre filters in the shows store, implement swiper.js, show the shows sorted on the dashboard.
* **4:40:** Create detail page with some basic information. Get the data from the API, as our cache only contains a 
  simplified version to reduce storage.
* **5:20:** Create search page, add simple search bar to the header.
* **6:00:** Create tests, polish up some code here and there.
* **7:00:** Finish

## Reflection

This has been an enjoyable assignment, with an unexpected challenge in tackling the limited API capabilities. Sadly 
I had to go into overtime to create a few tests and polish things up a bit. This also means I didn't have time to go 
into my extra feature ideas. Below are a few of the considerations I made and things I didn't get to.

#### API

While I realized using local storage wouldn't be able to hold the 70000+ objects, even when simplified, I didn't 
expect IndexedDB to run into performance issues so quickly. I have to honestly say that I hadn't used the 
FileSystemAPI much before today, so it took a bit longer to figure out than I wanted.

Sadly, I wasn't able to get the cache reliably working using the wider supported `FileSystemSyncAccessHandle` and 
instead had to opt for the `FileSystemWritableFileStream`. As such, caching will only work on Chromium-based 
browsers and Firefox. To make it work on Safari and IOS, i'd have to look further into why 
`FileSystemSyncAccessHandle` was giving me issues.

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

#### Architecture

I started up the project using create-vue, which produced a package with some quite outdated packages. I didn't touch 
those as I didn't want to deal with any possible version conflicts. The one point where this might have been limiting
is in using the FileSystemAPI, as the `FileSystemFileHandle` didn't have an up-to-date type and I had to overwrite it.

#### Improvement points

* More error handling is needed, especially for loading from the API.
* I chose not to do any i18n, but this should be set up properly to not have string literals in the code.
* The way I set the view height isn't ideal, creates scrollbars on mobile devices.
* The navigation arrows on the swiper lists aren't aligned properly across all the breakpoints
* Breakpoints could be defined with variables, and be used more consistently.
* Typography would work better as a sass/postcss mixin.
* The card containers really need some loading skeletons
* The pinia store tests are reliant on the load function. Would be better to allow testing them individually, which 
  would also improve the code of the store itself.
* Didn't set up my single/double quotes eslint rule properly, so they probably both exist.

#### Other thoughts

* Calling things 'show' might not have been the smartest decision. tvShow or similar would have spared some confusion.
* I opted for this folder structure as it helped me organize work in the past. Looking at it now, it is kind of 
  overkill for a project this size.