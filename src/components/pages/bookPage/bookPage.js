import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class BookPage extends Component {

  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }


  render() {

    if (this.state.error) {
      return <ErrorMessage />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, publisher }) => `${name} (${publisher})`}
      />
    )

    const bookDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={bookDetails} />
    )
  }
}
