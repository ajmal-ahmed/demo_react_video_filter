import React, {useRef, useState, useEffect} from 'react';
import Button from "react-bootstrap/Button";
import {Alert, Card, Col, Container, Form, ProgressBar, Row} from "react-bootstrap";
import {toast} from "react-toastify";



const VideoRecorder = () => {
    const videoRef = useRef(null);
    const [grayScale, setGrayScale] = useState(false);
    const [blurr, setBlurr] = useState(false);


    useEffect(() => {
        startCamera();
    }, []);





    /**
     * Method to start the camera and set the stream to the video element
     */
    const startCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error occurred while accessing the camera, Please allow the camera access and refresh the page.", {toastId: "cameraError"});
                });
        }
    }

    /**
     * Method to stop the camera and clear the stream
     * @param videoRef
     */
    const stopCamera = (videoRef) => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const changeGrayScale = (e) => {
        const status = e.target.checked;
        setGrayScale(status);
    }
    const changeBlurr = (e) => {
        const status = e.target.checked;
        setBlurr(status);
    }


    return (
        <Card className="mb-4 box-shadow">
            <Card.Header>
                Video Filter
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row className="justify-content-md-center" >
                        <Col md="auto">
                            <div className="d-flex justify-content-center">
                                <video ref={videoRef} autoPlay muted style={{ filter: `${grayScale?"grayscale(100%)":""} ${blurr?"blur(5px)":""}` }} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-between" >
                        <Col xs="auto">
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Gray Scale"
                                onClick={changeGrayScale}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Blur"
                                onClick={changeBlurr}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>

    );
};

export default VideoRecorder;