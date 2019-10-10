import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';
import api from '../../../services/api';
import { Container } from './styles';

export default function BannerInput({ imageUrl, imageId }) {
  const { defaultValue, registerField } = useField('banner_id');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageId) {
      setFile(imageId);
    }
  }, [imageId]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <div>
        <label htmlFor="banner_id">
          {preview ? (
            <img src={preview} alt="Banner" />
          ) : (
            <div>
              <MdPhotoCamera size={60} color="rgba(255, 255, 255, 0.3)" />
              <strong>Selecionar Imagem</strong>
            </div>
          )}
          <input
            type="file"
            id="banner_id"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref}
          />
        </label>
      </div>
    </Container>
  );
}
