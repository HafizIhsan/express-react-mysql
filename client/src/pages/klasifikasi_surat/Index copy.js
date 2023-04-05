//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import * as React from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled, {
    tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function KlaSuratIndex() {

    //define state
    const [klasurats, setKlasurat] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get('http://localhost:9000/api/klasifikasi-surat');
        //get response data
        const data = await response.data.data;

        //assign response data to state "klasifikasi-surat"
        setKlasurat(data);
    }

    //function "deletePost"
    const deleteKlasurat = async (ID_KLASIFIKASI_SURAT) => {

        //sending
        await axios.delete(`http://localhost:9000/api/klasifikasi-surat/delete/${ID_KLASIFIKASI_SURAT}`);

        //panggil function "fetchData"
        fectData();
    }

    const blue = {
        200: '#A5D8FF',
        400: '#3399FF',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E7EBF0',
        200: '#E0E3E7',
        300: '#CDD2D7',
        400: '#B2BAC2',
        500: '#A0AAB4',
        600: '#6F7E8C',
        700: '#3E5060',
        800: '#2D3843',
        900: '#1A2027',
    };

    const Root = styled('div')(
        ({ theme }) => `
        table {
            font-family: IBM Plex Sans, sans-serif;
            font-size: 0.875rem;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
            text-align: left;
            padding: 6px;
        }

        th {
            background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
        }
        `,
    );

    const CustomTablePagination = styled(TablePaginationUnstyled)(
        ({ theme }) => `
        & .${classes.spacer} {
            display: none;
        }

        & .${classes.toolbar}  {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
            }
        }

        & .${classes.selectLabel} {
            margin: 0;
        }

        & .${classes.select}{
            padding: 2px;
            border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
            border-radius: 50px;
            background-color: transparent;

            &:hover {
            background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
            }

            &:focus {
            outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
            }
        }

        & .${classes.displayedRows} {
            margin: 0;

            @media (min-width: 768px) {
            margin-left: auto;
            }
        }

        & .${classes.actions} {
            padding: 2px;
            border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
            border-radius: 50px;
            text-align: center;
        }

        & .${classes.actions} > button {
            margin: 0 8px;
            border: transparent;
            border-radius: 2px;
            background-color: transparent;

            &:hover {
            background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
            }

            &:focus {
            outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
            }
        }
        `,
    );


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - klasurats.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Root>
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/klasifikasi-surat/create" variant="success" className="mb-3">TAMBAH</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                    <tr>
                                        <th style={{ width: 30 }}></th>
                                        <th style={{ textAlign: "center", width: 100 }}>KODE</th>
                                        <th style={{ textAlign: "center", width: 100 }}>NOMOR</th>
                                        <th>KETERANGAN</th>
                                        <th style={{ textAlign: "center", width: 50}}>AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { (rowsPerPage > 0 ? klasurats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : klasurats).map((klasurat, index) => (
                                        <tr key={ klasurat.ID_KLASIFIKASI_SURAT }>
                                            <td style={{ textAlign: "right"}}>{ klasurat.ID_KLASIFIKASI_SURAT }</td>
                                            <td style={{ textAlign: "center"}}>{ klasurat.KODE }</td>
                                            <td style={{ textAlign: "center"}}>{ klasurat.NOMOR_KLASIFIKASI }</td>
                                            <td>{ klasurat.KETERANGAN }</td>
                                            <td className="text-center" style={{ textAlign: "center"}}>
                                                <Stack direction="row" spacing={1} style={{ textAlign: "center" }}>
                                                    <IconButton aria-label="edit" color="primary" size="small" as={Link} to={`/klasifikasi-surat/edit/${klasurat.ID_KLASIFIKASI_SURAT}`}>
                                                        <EditIcon fontSize="small"/>
                                                    </IconButton>
                                                    <IconButton aria-label="delete" color="error" size="small" onClick={() => deleteKlasurat(klasurat.ID_KLASIFIKASI_SURAT)}>
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </Stack>
                                            </td>
                                        </tr>
                                    )) }
                                    {emptyRows > 0 && (
                                        <tr style={{ height: 41 * emptyRows }}>
                                        <td colSpan={5} />
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <CustomTablePagination
                                            rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                            colSpan={5}
                                            count={klasurats.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                'aria-label': 'rows per page',
                                                },
                                                actions: {
                                                showFirstButton: true,
                                                showLastButton: true,
                                                },
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Root>
    );
}

export default KlaSuratIndex;