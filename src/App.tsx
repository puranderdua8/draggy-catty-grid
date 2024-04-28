import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ImageModal } from './components/ImageModal';
import { getCats } from './services/cats';
import { Card } from './components/Card';

function App() {

	// Typing for modal's exposed value
	type ModalHandle = React.ElementRef<typeof ImageModal>;

	// Ref to store modal's exposed value
	const modalRef = useRef<ModalHandle>(null);

	// State to store information about a list of cats
	const [cats, setCats] = useState<Cat[]>([]);

	// Helper to trigger the open mtehod exposed from the modal
	// Sending the cat information across to set image state in child component and show the modal
	const openModal = (cat: Cat): void => { 
		modalRef?.current?.open?.(cat);
	};

	// Helper to set the dragged cat's information in the dataTransfer object
	const handleDragStart = (e: React.DragEvent<HTMLElement>, cat: Cat) => {
		e.dataTransfer?.setData('cat', JSON.stringify(cat));
	};

	// Preventing default onDragOver behaviour to make the element droppable
	const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
	};

	// Handler for the drop event on a card
	// Accepts event and the cat object on which the dragged cat is being dropped on
	const handleDrop = (e: React.DragEvent, catDroppedOn: Cat) => {
		// Extract the dragged cat's information
		const draggedCat = JSON.parse(e.dataTransfer?.getData('cat') ?? '') as Cat;
		// Create the new augmented list of cats
		const newCatsList = cats.map((c) => {
			// Let the new position be the existing position by default
			let newPosition = c.position;
			// If item being looped over is the draggedCat, change position to new cat's position
			if(draggedCat.title === c.title) {
				newPosition = catDroppedOn.position;
			}
			// If item being looped over is the new cat, change position to dragged cat's position
			if(catDroppedOn.title === c.title) {
				newPosition = draggedCat.position;
			}
			return {
				...c,
				position: newPosition
			}
		// Finally, sort according to position
		}).sort((a, b) => a.position - b.position);
		setCats(newCatsList);
	};

	// Fetch the list of cats on mount
	useEffect(() => {
		(async function() {
				const catList = await getCats();
				console.log(catList);
				setCats(catList.cats);
		}());
	}, []);
  
  return (
	<div className="app-container">
		<h2 className="app-title">A Draggy Catty Grid</h2>
		<div className="grid-container">
      		{cats?.map(
				(cat: Cat) => 
					<div 
						className="draggable-card-wrapper"
						draggable
						onDragOver={handleDragOver}
						onDrop={(e: React.DragEvent<HTMLElement>) => handleDrop(e, cat)}
						onDragStart={(e) => handleDragStart(e, cat)}
						key={cat.type}
					>
						<Card 
							title={cat.title}
							image={cat.image}
							onImageClick={() => openModal(cat)}
						/>
					</div>
				)
			}
    	</div>
		<ImageModal ref={modalRef} onClose={function (): void {
			throw new Error('Function not implemented.');
		} } />
	</div>
  )
}

export default App;