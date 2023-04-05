//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import material-react-table
import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

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

    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'ID_KLASIFIKASI_SURAT', 
                header: 'ID',
            },
            {
                accessorKey: 'KODE', 
                header: 'KODE',
            },
            {
                accessorKey: 'NOMOR_KLASIFIKASI',
                header: 'NOMOR',
            },
            {
                accessorKey: 'KETERANGAN',
                header: 'KETERANGAN',
            },
        ],
        [],
    );

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/klasifikasi-surat/create" variant="success" className="mb-3">TAMBAH</Button>
                                <MaterialReactTable 
                                    columns={columns} 
                                    data={klasurats ?? []}
                                    initialState={{ density: 'compact' }}
                                />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default KlaSuratIndex;