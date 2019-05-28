import React, { Component } from 'react';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from './styles';

import uberx from '../../assets/uberx.png';

export default class Details extends Component {
  render() {
    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Cheap travel for the day to day</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>UberX</TypeTitle>
        <TypeDescription>US$ 6,00</TypeDescription>

        <RequestButton onPress={() => {}}>
          <RequestButtonText>REQUEST UBERX</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}