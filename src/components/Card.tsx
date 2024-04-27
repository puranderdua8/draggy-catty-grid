import './Card.css';

interface ICard {
    title: string;
    image: string;
}

const Card = ({title, image}: ICard) => {
    return (
        <div>
            <h4 className="cat-title">{title}</h4>
            <img className="cat-image" src={image} alt={title} loading='lazy' />
        </div>
    )
};

export default Card;