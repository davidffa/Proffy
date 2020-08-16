import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import camera from '../../assets/images/icons/camera.svg';

import './styles.css';

interface Props {
    onFileUpload: (file: File) => void;
    avatar: string | undefined | null;
}

const DropZone: React.FC<Props> = ({ onFileUpload, avatar }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUpload(file);
    }, [onFileUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div id="avatar-container" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            <img src={selectedFileUrl ? selectedFileUrl :`http://localhost:3333/uploads/${avatar ? avatar : 'default.png'}`} alt="Avatar" className="avatar" />

            <img src={camera} alt="Camera" className="camera" />
        </div>
    );
}

export default DropZone;