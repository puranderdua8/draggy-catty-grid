import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import { ImageModal } from './components/ImageModal';
import { getCats } from './services/cats';
import { Card } from './components/Card';
import { Cat } from './models/cats';
import { storeCatsInCache } from './utils/cache';
import { Loader } from './components/Loader';
import { useInterval } from './hooks/useInterval';
import { Timer } from './components/Timer';
import { reArrangeGrid } from './utils/grid';

export const App: FC = () => {

	type ModalHandle = React.ElementRef<typeof ImageModal>;
	const modalRef = useRef<ModalHandle>(null);
	const hasChanged = useRef(false);

	const [loading, setLoading] = useState<boolean>(false);
	const [cats, setCats] = useState<Cat[]>([]);
	const [timeSinceLastSaved, setTimeSinceLastSaved] = useState<number>(0);

	const openModal = (cat: Cat): void => {
		modalRef?.current?.open?.(cat);
	};

	const handleDragStart = (e: React.DragEvent<HTMLElement>, cat: Cat) => {
		e.dataTransfer?.setData('cat', JSON.stringify(cat));
	};

	const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, catDroppedOn: Cat) => {
		const draggedCat = JSON.parse(e.dataTransfer?.getData('cat') ?? '') as Cat;
		if (draggedCat.position === catDroppedOn.position) {
			return;
		}
		setCats((oldCats) => reArrangeGrid(oldCats, draggedCat, catDroppedOn).sort((a, b) => a.position - b.position));
		if (!hasChanged.current) {
			hasChanged.current = true;
		}
	};

	const saveGrid = async () => {
		if (hasChanged.current) {
			await storeCatsInCache({ cats: [...cats] });
			await fetchCats();
			setTimeSinceLastSaved(+new Date() - 1000);
		}
	};

	const fetchCats = async () => {
		try {
			setLoading(true);
			const catList = await getCats();
			setCats(catList.cats);
			hasChanged.current = false;
		} finally {
			setLoading(false);
		}
	};

	useInterval(saveGrid, 5000);

	useEffect(() => {
		fetchCats();
	}, []);

	return (
		<div className="app-container">
			<div className="title-container">
			<h2 className="app-title">A Draggy Catty Grid</h2>
			<Timer fromSeconds={timeSinceLastSaved} />
			</div>
			{loading ? <Loader /> : <div className="grid-container">
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
			</div>}
			<ImageModal ref={modalRef} onClose={(): void => {}} />
		</div>
	)
};