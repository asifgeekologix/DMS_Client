import { Row, Col, Card, CardBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { getFilesData, searchFileData } from '../_services/config';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { useAuthContext } from '../_context/authContext';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TableLoader = dynamic(import('./Utils/TableLoader'));
const DataTable = dynamic(import('./DataTable'));

const MyDocuments = () => {
  const { isLoggedIn, isContextLoaded } = useAuthContext();
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (isLoggedIn && searchInput == '') {
      handleGetFileData();
    } else {
      setIsLoading(false);
    }

    if (searchInput.trim()) {
      const timer = setTimeout(() => {
        searchFiles();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, searchInput]);

  const toastConfig = {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  async function handleGetFileData() {
    // setIsLoading(true);
    const res = await getFilesData();
    setIsLoading(false);
    if (res.status) {
      const data = [...res.data].map((item, idx) => {
        return { ...item, sno: idx + 1 };
      });
      setTableData(data);
    } else {
      setTableData([]);
    }
  }

  async function searchFiles() {
    const params = { file_attribute: searchInput.trim() };

    const res = await searchFileData(params);
    if (res.status) {
      setTableData(res.data);
    } else {
      setTableData([]);
    }
  }

  function downloadFile(file) {
    toast.error("You don't have permission to download", toastConfig);
  }

  const sortItems = (prev, curr, columnId) => {
    if (prev.original[columnId].toLowerCase() > curr.original[columnId].toLowerCase()) {
      return 1;
    } else if (prev.original[columnId].toLowerCase() < curr.original[columnId].toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  };

  const tableColumns = [
    {
      Header: 'S. No',
      accessor: 'sno',
      Cell: (cell) => {
        return <span>{cell.row.index + 1}</span>;
      },
      disableSortBy: true,
    },
    {
      Header: 'File Name',
      accessor: 'file_name',
      sortType: (prev, curr, columnId) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ cell }) => {
        return (
          <>
            {(cell.row.original.capabilities_can_list_children && (
              <i className="bi bi-folder fs-5 text-warning"></i>
            )) || <i className="bi bi-file-earmark fs-5 text-primary"></i>}{' '}
            <span className="ms-2">{cell.row.original.file_name}</span>
          </>
        );
      },
    },
    {
      Header: 'Timestamp',
      accessor: 'file_time_stamp',
      Cell: ({cell}) => <span>{moment(cell.row.original.file_time_stamp).format('YYYY-MM-DD hh:mm a')}</span>
    },
    {
      Header: 'Action',
      accessor: 'action',
      disableSortBy: true,
      Cell: ({ cell }) => {
        return (
          <>
            {!cell.row.original.capabilities_can_list_children && (
              <>
                <Link
                  href={cell.row.original.webViewLink}
                >
                  <a target={'_blank'} className="text-secondary text-decoration-none cursor-pointer">
                    <i className="bi bi-eye fs-4" title="View"></i>
                  </a>
                </Link>
                {(cell.row.original.capabilities_can_download && (
                  <Link
                    href={(cell.row.original.capabilities_can_download && cell.row.original.file_download_link) || '#'}
                  >
                    <a className="text-secondary text-decoration-none cursor-pointer ms-3" target={'_blank'}>
                      <i
                        className={`bi bi-cloud-download fs-4 ms-3 text-success `}
                        title={
                          (cell.row.original.capabilities_can_download && 'Download') || 'Download permissions required'
                        }
                      ></i>
                    </a>
                  </Link>
                )) || (
                  <span
                    className="text-secondary text-decoration-none cursor-pointer ms-3"
                    onClick={() => downloadFile(cell.row.original)}
                  >
                    <i
                      className={`bi bi-cloud-download fs-4 ms-3 text-danger`}
                      title={
                        (cell.row.original.capabilities_can_download && 'Download') || 'Download permissions required'
                      }
                    ></i>
                  </span>
                )}
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-documents-section">
        <h1 className="mb-3 text-secondary fs-26 mb-lg-4">My Documents</h1>
        <Row>
          <Col md="12" lg="12">
            <Card className="m-0 rounded-6">
              <CardBody className="p-4">
                {isLoggedIn && (
                  <div className="mw-300 py-2 mb-3">
                    <div className="outlined-input">
                      <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        className="w-100 profile-input"
                        placeholder="Search by name or keywords"
                        value={searchInput}
                        onChange={(e) => setSearchInput((e.target.value).trimStart().replace(/  +/g, ' '))}
                      />
                      <label>Search</label>
                    </div>
                  </div>
                )}
                {isLoggedIn && !isLoading && (
                  <div className="table-responsive">
                    <DataTable columns={tableColumns} data={tableData} />
                  </div>
                )}
                {isLoading && <TableLoader />}
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
    </>
  );
};

export default MyDocuments;
