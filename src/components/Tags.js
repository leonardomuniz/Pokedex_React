import React from 'react';
import { Badge } from "@chakra-ui/react";

// import { Container } from './styles';

export default function Tags(props) {
  return (
    <span key={props.chave}>
        <Badge colorScheme="telegram"  >{props.nome}</Badge>&nbsp;
    </span>

  );
}