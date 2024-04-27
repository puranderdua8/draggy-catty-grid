import { useEffect, useRef, useState } from 'react';
import './App.css';
import ImageModal from './components/Modal';
import { getCats } from './services/cats';
import Card from './components/Card';

function App() {
	type ModalHandle = React.ElementRef<typeof ImageModal>;
	const modalRef = useRef<ModalHandle>(null);

	const [cats, setCats] = useState<Cat[]>([]);

	const openModal = (cat: Cat): void => { 
		modalRef?.current?.open?.(cat);
	};

	useEffect(() => {
		(async function() {
			const catList = await getCats();
			setCats(catList);
			if(!localStorage.getItem('cachedCats')) {
				localStorage.setItem('cachedCats', JSON.stringify(catList));
			}
		}());
	}, []);
  
  return (
    <div className="grid-container">
		<h2>A Draggy Catty Grid</h2>
      	{ cats.map((cat: Cat) => <div onClick={() => openModal(cat)}><Card title={cat.title} image={cat.image} key={cat.type} /></div>) }
      	<ImageModal ref={modalRef} onClose={function (): void {
			throw new Error('Function not implemented.');
		} } />
    </div>
  )
}

export default App;