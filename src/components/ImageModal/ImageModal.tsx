import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Image from '../Image/Image';
import './Modal.css';

interface IModalProps {
    onClose?: () => void;
}

interface IModalHandle {
    open: (cat: Cat) => void;
}

const ImageModal = forwardRef((props: IModalProps, ref: React.Ref<IModalHandle>) => {
    
    const {onClose} = props;
    const [image, setImage] = useState<string>('');
    const [open , setOpen] = useState<boolean>(false);
    
    const handleClose = (): void => {
        setOpen(false);
        setImage('');
        onClose?.();
    }

    const handleCloseOnEscape = (event: KeyboardEvent): void => {
        
        if(event.key === 'Escape') {
            handleClose();
        }
    };
    
    useEffect(() => {
        
        window.addEventListener('keydown', handleCloseOnEscape, false);

        () => {
            window.removeEventListener('keydown', handleCloseOnEscape, false);
        }
    }, [handleCloseOnEscape]);

    useImperativeHandle(ref, () => ({
        open: (cat: Cat) => {
            setImage(cat.image);
            setOpen(true);
        },
      }));

    return (
        <div className={`modal-container ${open ? 'opened' : ''}`}>
            <div className="image-container">
                <Image url={image} alt="Preview image" width={400} height={400}/>
            </div>
        </div>
    )
});

export default ImageModal;