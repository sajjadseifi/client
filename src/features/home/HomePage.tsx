import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

const HomePage=()=>{
    return(
    <Container style={{marginTop:"7em"}}>
        <h1>HomePage</h1>
        <div>Go To <Link to="/activities">Activities</Link></div>
    </Container>  
    );
};

export default HomePage;