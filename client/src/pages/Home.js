//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

/*
    JSX ==> attribute class diganti classname
*/

function Home() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>EXPRESS.JS + VUE.JS</h1>
                        <p class="lead">Tutorial FullStack <strong>Express.js</strong> dan <strong>React.js</strong></p>
                        <Button href="http://santrikoding.com" target="_blank" variant="primary" size="lg">SELENGKAPNYA</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;

