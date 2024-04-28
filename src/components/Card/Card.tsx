import Image from '../Image/Image';
import './Card.css';

interface ICard {
    title: string;
    image: string;
    onImageClick?: () => void;
}

const Card = ({title, image, onImageClick}: ICard) => {
    return (
        <div>
            <h4 className="cat-title">{title}</h4>
            <Image url={image} alt={title} width={400} height={400} onClick={onImageClick} />
        </div>
    )
};

export default Card;