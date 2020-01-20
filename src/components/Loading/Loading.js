import React from 'react';
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
    return(
        <Container>
            <Spinner animation="grow" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            Loading...
        </Container>
    );
};