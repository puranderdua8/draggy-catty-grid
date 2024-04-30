import { FC } from 'react';
import {Image} from '../Image';
import './Card.css';

interface ICard {
    title: string;
    image: string;
    onImageClick?: () => void;
}

export const Card: FC<ICard> = ({
    title, 
    image, 
    onImageClick
}) => (
    <div className="card-wrapper">
        <h4 className="cat-title">{title}</h4>
        <Image url={image} alt={title} width={400} height={400} onClick={onImageClick} />
    </div>
);