# Draggy Catty Grid
This is an application to showcase a grid of cats that can be re-arranged via a drag-and-drop interaction.

## The Approach

Before diving into the code, I have assessed the task at a high level.
I have chosen Vite + React + Typescript to build out the front-end layer of the application.
I didn’t want to use Next.js since it is a full-fleged framework and it might be an overkill for this case.

I installed the required template and I willl build the application on top of it.
To start with, I am goint to create a git repository with the initial code of the remplate and build on top of it.

At a high level, we are displaying a list of re-arrangable cards in a grid using some data from a local JSON file/API
I have broken down the UI into:

### Container
A container for the list of cat images. 
Layout to be achieved using CSS grid.
Type from JSON data to be used as key for the `Card`s while looping over data and rendering them.

### Card
A common `Card` component with the below props:
`title`: title of the cat's image
`image`: image URL
The card component will simply render the title and the image

### ImageModal
A common `ImageModal` component that will show selected image with below props:
`onClose` - a callback to be triggered in the parent when the user closes the modal.
I think there might be more props involved, but this seems like the bare minimum to start with.

#### Note
I am going to create the modal as an uncontrolled component i.e. it’s state is being managed from within the component and not in the parent.
I want to follow this approach because the parent will have a grid of cards that we might not want to re-render every time the modal opens.
I would use react's `useImperativeHandle` along with `forwardRef` to create a component that exposes the method to trigger opening of the modal.
I would trigger this method on click of a card in the parent and the modal should work as expected.

I have completed the basic functionality of the application, i.e. showing a grid of cats and previewing the selected one.

#### Next steps:

Implement lazy loading for images - show a loader by default, and use the image onLoad prop to handle hiding of the loader.(will create an image component that takes care of individual loading states and accepts image URL as a prop).
Implement drag-and-drop for image cards - mark individual cards as draggable and onDrop of a card, identify the card which is being dropped on and swap the positions of the two cards.

With this, I will be done with the front-end part of the application.
I will then start working on the creation of a local service that mocks a server nad persisting data in the browser via `localStorage/sessionStorage`.
`localStorage` will remember the data even on close of the tab, but `sessionStorage` might be better if we want fresh data every time user opens the URL.

## How to run

Clone the repository using either git clone or ssh

Go to the root folder

run `npm install`

run `npm run dev`


P.S. I am applying for the role of Senior Frontend Engineer.