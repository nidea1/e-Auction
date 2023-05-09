import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <>
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                    Copyright &copy; NiDea1 | Doruk Çoralı
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
  )
}

export default Footer
