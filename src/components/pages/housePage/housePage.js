import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class HousePage extends Component {

  gotService = new GotService();

  state = {
    selectedHouse: 50,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id
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
        getData={this.gotService.getAllHouses}
        renderItem={({ name }) => name}
      />
    )

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="ancestralWeapons" label="Ancestral Weapon" />
        <Field field='seats' label='Seats'/>
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={houseDetails} />
    )
  }
}
