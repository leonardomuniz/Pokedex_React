import React from 'react';
import { Progress } from "@chakra-ui/react";

// import { Container } from './styles';

export default function StatusBase(props) {
  return (
    <div key={props.chave}>
      <h1><strong>{props.estado} | {props.nome}</strong></h1>
      <Progress colorScheme="pink" size="sm" value={props.estado} />
    </div>
  );
}

