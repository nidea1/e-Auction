import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function HelpContact() {

    const skillIcon = "text-bg-dark bg-gradient rounded-3 shadow py-1"
    return (
        <>
            <Container className="px-4 py-5">
                <h1 className="display-5 fw-bold text-center">ABOUT ME</h1>
                <span className="d-flex flex-wrap justify-content-center mb-1"><hr style={{width: "50%"}} /></span>
                <h5 className="text-center">Here you will find more information about me, what I do, and my current skills.</h5>
                <span className="d-flex flex-wrap justify-content-center mb-1"><hr style={{width: "75%"}} /></span>
            
                <Row className="flex-column flex-lg-row py-5 justify-content-center gap-5">
                    <Col className="col-md-12 col-lg-4 text-center gap-2">
                        <h3 className="fw-bold text-center">Who am I?</h3>
                        <Col className="text-muted my-4">I am a <strong>Backend Web Developer</strong> building Backend of Websites and Web Applications. I want to be <br /> Full Stack developer and always eager to adapt and take on new challenges! <br /> <br /> You can check out some of my work in my <a href='https://github.com/nidea1' className='link-dark text-decoration-none'><strong>GitHub.</strong></a></Col>
                        <Col className="text-muted">I am open to <strong>job</strong> opportunities where I can contribute, learn and improve myself. If there is a job that you think is suitable for me, do not hesitate to <strong>contact me.</strong></Col>
                        <a href="https://www.linkedin.com/in/dorukcrli/" className="btn btn-lg text-bg-dark bg-gradient fw-semibold shadow rounded-3 mt-4 mb-5">CONTACT!</a>
                    </Col>
                    
                    <Col className="col-md-12 col-lg-4 d-flex flex-column justify-content-center text-center gap-2 mt-3 mt-lg-0 align-self-lg-start">
                        <Row>
                            <h3 className="fw-bold text-center">My Skills</h3>
                        </Row>
                        <Row className="mt-3 gap-3">
                            <Col className={skillIcon}>
                                <i className="fab fa-html5"></i>
                                <h6 className="fw-semibold mb-0">HTML</h6>
                            </Col>
                            <Col className={skillIcon}>
                                <i className="fab fa-css3-alt"></i>
                                <h6 className="fw-semibold mb-0">CSS</h6>
                            </Col>
                            <Col className={skillIcon}>
                                <i className="fa-brands fa-react"></i>
                                <h6 className="fw-semibold mb-0">React</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fab fa-python"></i>
                                <h6 className="fw-semibold mb-0">Python</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fas fa-laptop-code"></i>
                                <h6 className="fw-semibold mb-0">Django</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fab fa-js-square"></i>
                                <h6 className="fw-semibold mb-0">JavaScript</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fab fa-bootstrap"></i>
                                <h6 className="fw-semibold mb-0">Bootstrap</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fas fa-database"></i>
                                <h6 className="fw-semibold mb-0">MongoDB</h6>
                            </Col>
                            <Col className={skillIcon} >
                                <i className="fas fa-table"></i>
                                <h6 className="fw-semibold mb-0">PostgreSQL</h6>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HelpContact
