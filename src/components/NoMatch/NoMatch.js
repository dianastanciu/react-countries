import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NoMatch() {
    return (
        <Container>
            <strong>404 NOT FOUND</strong>
            <br/>
            <br/>

            <Link to={'/'}>
                <span className="country-border-state-label back-button">
                    <FontAwesomeIcon icon={faArrowLeft}/> Back
                </span>
            </Link>
        </Container>
    )
}
