Initial thought-process for design of application 
Data structure:
* Lists
  * Attributes:
    * Position
    * Name
    * Cards
* Cards
  * Attributes:
    *name
    *listid
    *id
    *listName
    *labels (each) []
    *description
    *activity
    *comments: {date: Feb 25, body: comment}

    * Position
    * From list
    * Name
    * Comments
    * Activity
    * Labels
    * Description
    * Due date
    * Subscribed?
* MVC
  * Model: Cards
    * Should the list be considered a model on its own? The list model will contain specific collections of cards based on position/id?
  * Collection: List, List of lists(?)
  * View:
    * Create list first
    * Then the cards
    * Modals for individual cards - template

How to go about the collection/view:
* ONE collection of cards(?) regardless of which list it belongs to
  * sort and filter the collection based on list position
  1) Create a view for each list. 


Data flow:
* Clicking on a card should route you to the card's name

Events: 
* Board name, click: bring out a form to rename board

Overlay requirements:
  Div
  - Card Title
  - in list {{title}}
  Div - description (edit the description)
  * the actual description
  form - comments
  - icon, textarea
    div - comment icons
  div - sidebar
    - labels, due-dates
    -actions: move, copy, subscribe, archive(delete)

(end of blueprint)


Presentation discussion:

* In terms of modeling, I chose to go with using two models, one for lists and one for cards, and many more views. I determined what I wanted to make a view for or not based on whether the information is dynamic or not, hence not creating a Backbone view for the main header in the application, as that element does not change throughout use of the application.
  * As for the views, I have decided to make use of using .html() for my containers rather than .append() as we have done in previous projects. As this single page application needs to constantly update its view as actions are taken to specific cards and/or lists, even something as simple as updating the subscription status of a card, it seemed much more convenient to replace the html of its container with an updated view rather than try to target the card and append an updated card to its container, which will affect positioning of the cards without specific methods in place. However, the disadvantage of this is that especially for a much larger board, having to re-render entire views rather than a single view for a single model could make the application as a whole slower.
* One of the biggest technical challenges I faced was wrapping my mind around how I should deal with positioning of the cards as they are copied or moved around. So much so that I ended up focusing on every other aspect of the application, such as the styling and the other functionality of the application. In fact, I may have even spent too much time on it that towards the end of the 10-days, I felt rushed trying to implement this feature while trying to implement the few others and cleaning up some of the abandoned features. As a result, there may be some inconsistencies with how I implemented certain functionality, such as the 'move' functionality for example, but it accomplishes the task nonetheless. 
  * How I came to solve it was, as mentioned, towards the end of the 10-days where I picked an idea out of the many I had and started implementing it step by step. I decided that I should have the application assign positions when the application starts after sorting the cards based on listId, as well as re-assigning positions as cards are moved or added.
  * one user experience that I thought took up more time that it should've trying to make it so that if you clicked on the document, any open forms would close as well. However, this led to a problem where if you clicked on the form itself, it would also close itself.
* Bringing me to my next discussion, if I had more time (or not spent too much time thinking about the user exxperience), areas that can be improved are some of the styling and probably some cleaner code for final implementations of the project. See below for a rough chronology of how I built the project overall; there are instances where I went back and forth between certain points to implement a small functionality (such as going back to modify the card template/view to include certain icons).

Rough chronology:
1) Brainstorm ideas and overall design.
2) Create the base index html/jade (such as the header)
3) Styling the base index/html
4) Create the list model/collection/view with dummy data and styling the view.
5) Implement the functionality to add lists and write them onto a json data file.
6) Create the card model/collection/view with dummy data and styling the view.
7) Implement the functionality to add cards to the correct list and writing them to the JSON file.
8) Create the overlay and template/view for seeing card details.
9) Implement the functionality of the card details, except for the move/copy functionality (still in progress of thinking how to handle that). Each minor change must be written to the backend via ajax.
10) Create the quick-edit overlay and view.
11) Implement functionality for (10).
12) Implement the search function.
13) Implement the move/copy functionality.
14) Find library for drag-and-drop
15) Implement notifications
16) Final css cleanup and bug fixes.

Improvements:
* notifications do not persist throughout page refreshes.
* clicking on a notification should bring up the modal if the notification is about a card
* Some CSS clean up
* Some UI/UX improvements, such as having specific windows close when clicking outside of the outside.
* Perhaps a better separation of concerns.
* Perhaps some refactoring to DRY code.

Chosen Library: jQuery UI.
* My reasons for choosing this library is because this application was built mostly with jQuery, especially when interacting with the DOM, there is very little vanilla JavaScript used. jQuery is a very powerful library and I have used it very heavily that I am comfortable with its syntax, and jQuery UI uses a very similar syntax to what I am comfortable with. Not only that, jQuery UI's documentation is very detailed and their demo implementations are easy to follow. If I did not understand why something did not work or why something was working the way it was, there is much user help out there for people who have had similar issues.
* Other libraries I considered and why I chose not to use them:
  * Interact.js: the demo looked nice, but did not have precisely what I was looking for. A quick look at their documentation gave me the impression that while it supports drag and drop between containers, it did not have one for lists and sorting. A lot of their documentation seemed to be focused more towards resizing a container, and overlapping drops.
  * Dragula: Very nice demo, but confusing implementation and not very clear documentation. After playing around with it and following their documentation, I could not get it to work the way I wanted it to.