import { Card, Container } from 'react-bootstrap';

function About(){
    return (
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                    My name is Marc Nicolas Oliva, CPA student. This is the about
                    page for my WEB422 project.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default About;