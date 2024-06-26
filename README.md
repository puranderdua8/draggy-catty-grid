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

## Progress

I have completed the front-end part of the task, i.e. showing a grid of cats, previewing the selected one, re-arranging them and showing a loader while they are not yet fully loaded.

I have completed step 2 of the task. I managed to set up a mock service worker with a `/api/cats` endpoint that gives us the data we need.
As the app mounts, I store the mock data in the cache before the app mounts and fetch data from the cache in the mock service.
I wanted to test whether things are working fine or not and I called the API as a part of step 2 itself.

I managed to implement the auto save functionality and show the time since last save on the page.

I completed the docker setup as expected. 
We have a Dockerfile for the frontend application and a docker-compose file defining the frontend app as one of the services.
We can add and configure other services that need to run along with the frontend application in the docker-compose yaml.

## How to run

Clone the repository using git clone or ssh
Go to the root folder
run `docker-compose up --build`
Open the app in the browser at [localhost:3000](http://localhost:3000)

P.S. I am applying for the role of Senior Frontend Engineer.