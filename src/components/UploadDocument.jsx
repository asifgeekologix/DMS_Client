import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../_context/authContext';
import { getResponseData } from '../_helper/getResponse';
import { Spinner } from 'react-bootstrap';
import Link from 'next/link';

const UploadDocument = () => {
  const { isLoggedIn, isContextLoaded } = useAuthContext();
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toastConfig = {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleChange = (file) => {
    setFile(file);
    const fileName = file.name.split('.');
    fileName.splice(fileName.length - 1);
    let name = '';
    fileName.forEach((item) => (name += item));
    setKeywords(name);
  };

  async function handleUploadFile() {
    if (file && keywords.trim()) {
      const trimedKeyword = keywords.replace(/  +/g, ' ');
      const params = {
        file: file,
        file_attribute: trimedKeyword.trim(),
        unique_id: '',
      };

      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

        try {
          setIsLoading(true);
          const response = await Axios.post(`${process.env.BASE_URL}Storage/FileUpload`, params, headers);
          const res = getResponseData(response['data']);
          setIsLoading(false);
          if (res.status) {
            toast.success('File uploaded successfully', toastConfig);
            setFile(null);
            setKeywords('');
          } else {
            toast.error(res.message, toastConfig)
          }
        } catch (err) {
          console.log(err);
        }
    } else {
      toast.error('File and keywords both are required', toastConfig);
    }
  }
  return (
    <div className="upload-section">
      <h1 className="mb-3 text-secondary fs-26 mb-lg-4">Upload Document</h1>
      <Row>
        <Col md="12" lg="12">
          <Card className="m-0 rounded-6">
            <CardBody className="p-4">
              {/* {isLoggedIn && isContextLoaded && ( */}
              <>
                <p>*Note: Files will be uploaded on the root directory of Google Drive</p>
                <div className="d-flex justify-content-start align-items-center py-3 flex-column">
                  <h3 className="text-secondary mb-4 me-auto">Choose a File to Upload</h3>
                  <FileUploader
                    multiple={false}
                    handleChange={handleChange}
                    label="Drag & Drop to Upload Document"
                    name="file"
                    classes="drag-area rounded-3 flex-column d-flex justify-content-center align-items-center me-auto"
                  >
                    <div className="icon">
                      <img src="/images/upload-icon.svg" alt="Upload" />
                    </div>
                    <p className="my-2">Drag & Drop to Upload Document</p>
                    <span className="or">OR</span>
                    <span className="px-4 py-2 rounded-3 text-nowrap browse-file mt-3">Browse Document</span>
                    {file && <p className="fs-16 mb-0 mt-3">{file.name || ''}</p>}
                  </FileUploader>
                  <div className="mw-300 py-2 my-3 me-auto">
                    <div className="outlined-input">
                      <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="w-100 profile-input"
                        placeholder=" "
                        onChange={(e) => setKeywords(e.target.value.trimStart().replace(/  +/g, ' '))}
                        value={keywords}
                      />
                      <label>Enter keywords</label>
                    </div>
                  </div>
                  <button
                    className="btn px-4 py-2 rounded-3 upload-btn me-auto d-flex align-items-center"
                    onClick={handleUploadFile}
                    disabled={isLoading}
                  >
                    <span className="me-3">Upload & Save</span>
                    {isLoading && <Spinner animation="border" size="sm" />}
                  </button>
                </div>
              </>
              {/* )} */}
              {!isLoggedIn && isContextLoaded && (
                <div className="text-center py-4">
                  <img src="/images/no-document.svg" className="img-fluid" />
                  <h4 className="mb-3 text-secondary mt-4">You are not connected with any storage!</h4>
                  <p className="mb-3 fs-16">Please connect to any cloud type to access files.</p>
                  <Link href="/configure">
                    <button className="btn px-4 py-2 rounded-3 upload-btn mt-3">Connect Now</button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UploadDocument;
