import { useState } from 'react';
import Loader from '../Loader/Loader';
import './Image.css';

export const Image = ({url, alt, width, height, onClick}: {url: string;alt: string;width: number; height: number, onClick?: () => void}) => {
    
    const [loading, setLoading] = useState<boolean>(true);

    const hideLoader = () => setLoading(false);

    return <div style={{width, height}} onClick={onClick}>
        {loading && <Loader />}
        {<img src={url} onLoad={hideLoader} alt={alt} onError={hideLoader} draggable={false} />}
    </div>
};