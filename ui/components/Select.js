import React from 'react';
import styled from '@emotion/styled';

const Select = styled.select`
  background: none;
  border: none;
  min-width: 200px;
  height: 30px;
  padding: 5px;
  color: ${props => props.theme.containerFont};
`;

export default Select;