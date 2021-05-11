import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage/errorMessage';


export default class App extends Component {
  state = {
    showRandomChar: true,
    error: false
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar
      }
    })
  }

  render() {
    const {showRandomChar, error} = this.state;

    if (error) {
      return <ErrorMessage/>
    }
    const char = showRandomChar ? <RandomChar /> : null;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              <Button color="primary" className="mb-2" onClick={this.toggleRandomChar}>Toggle Random character</Button>
              {char}
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList />
            </Col>
            <Col md='6'>
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};
