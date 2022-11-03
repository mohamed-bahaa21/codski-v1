import React, { useState } from 'react';
import { storage } from 'config/firebase.config';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';

import axios from 'axios';

import SERVER_URI from '.server.env';

const UploadImg = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState('false');
  const [uploadBtnStateDisable, setUploadBtnStateDisable] = useState(true);
  const [copied, setCopied] = useState('false');
  const [visible, setVisible] = useState(false);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setUploadBtnStateDisable(false);
    }
  };

  const handleUpload = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = new Date().getTime();

    let timeNow = `${date}${month}${year}T${time}`;

    setUploaded('false');

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },

      error => {
        console.log(error);
      },

      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            console.log('image: ', image);
            console.log('URL: ' + url);

            const img_url = {
              url: url,
            };

            axios.post(`${SERVER_URI}/api/postImgToGallery`, img_url).then(res => console.log(res));

            setUploaded('true');
            setUploadBtnStateDisable(true);

            // window.location = `${ADMIN_URI}/#/landing/progDesigns/`;
          });
      },
    );
  };

  const copyToCLip = () => {
    setCopied('false');
    navigator.clipboard.writeText(url);
    console.log(url);
    setCopied('true');
  };

  const toggleUpload = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button className="btn-primary" onClick={toggleUpload}>
        Upload Image
      </button>
      <br />
      <br />

      {visible && (
        <div>
          <div style={{ width: '50vw' }}>
            {uploaded === 'true' ? (
              <div>
                <strong>Uploaded</strong> Successfully...
              </div>
            ) : (
              <p></p>
            )}
            <h3>Upload Image</h3>

            <div>
              <div>{progress}</div>
              <progress value={progress} max="100" />
            </div>

            <div>
              <input type="file" onChange={handleChange} />
              <button color="secondary" onClick={handleUpload} disabled={uploadBtnStateDisable}>
                Upload
              </button>
              <p>
                <strong> Image URL: </strong>
                {url}
              </p>
            </div>

            <div>
              {copied === 'true' ? (
                <div>
                  <div>Copied To Clipboard...</div>
                </div>
              ) : (
                <p></p>
              )}
              <button color="secondary" onClick={copyToCLip}>
                Copy Image URL to Clipboard
              </button>
            </div>
          </div>

          <img
            className="uploadedImg"
            src={url || 'http://via.placeholder.com/300'}
            alt="firebase-image"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImg;
