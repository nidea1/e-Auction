import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <>
        <footer>
            <Container>
                <Row className='justify-content-center'>
                    <Col sm={3} className='text-center py-3'>
                      <Col className='border-bottom pb-2'>
                        Development Still Ongoing
                      </Col>
                      <Col className='mt-1'>
                        Copyright &copy; NiDea1 | Doruk Çoralı
                      </Col>
                    </Col>
                </Row>
            </Container>
        </footer>
    </>
  )
}

export default Footer
