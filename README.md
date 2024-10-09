# ShowsAssignment

This project is the result of an assignment given by ABN AMRO
to create an interface for tv shows, provided by the tvmaze API.
The estimated time to use for this assignment was up to 6 hours.

## Assignment approach

These are the main development pieces I expect to tackle.

### API layer

The biggest challenge to tackle seems to be the lack of an
endpoint that allows for filtering genre and sort by rating. I
simply need all data in order to know if I have all genres, 
and to show the actual highest rated show up front. This means
I will need to create a local cache of the data through the show
index endpoint.

### Layout

The description of the app in the provided requirements bring
to mind popular streaming service interfaces. These usually have
a left aligned UI that stretch the full width of the viewport.
The search feature should always be accessible, so I will include
it in a header.

### Dashboard view

The dashboard is required to show tv shows grouped by genre in
horizontal lists grouped by rating. I imagine using cards with 
thumbnails for the shows, scrollable through dragging and arrows
on either side. I think developing this from scratch would not 
fit the time requirement, so I will use a library I have 
experience with: swiper.js.

### Detail view

The detail view isn't specified in the requirements. I imagine
showing a bigger thumbnail here, the show summary, and some other
details I will pick from the API.

### Search view

The search view will be accessible through a search bar in the 
header. I think it wouldn't make sense to use the same type of
horizontal scrollable card container here as on the dashboard,
as it would make the page quite empty. Instead, I will show
the cards as a grid.

### Possible extra feature ideas

- Similar shows on the detail view, that includes shows that have the same set of genres
- A gradient background that changes color when on the detail view based on the average color of the thumbnail
- An option on the dashboard for the user to choose their sorting method
- An "all shows" button for each genre that goes to a page with an infinite/virtual scroll show grid.

## Stack choice

These are the tools I chose to use for this assignment:

* **VueJS**: Since I have experience with it and ABN AMRO uses it as well
* **Typescript**: For code that is more robust.
* **Plain css**: While SASS or PostCSS would give some benefits, I don't see big styling challenges that would require the extra package.
* **Swiper.js**: For horizontal scrollable cards on the dashboard

## Time spent

* **30 min:** Setup the project and write the approach in this document.