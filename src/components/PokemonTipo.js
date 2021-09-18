import React from 'react';
import {  Button } from "@chakra-ui/react";
// import { Container } from './styles';

export default function PokemonTipo(props) {
    return (
        <span key={props.chave}>
            <Button variant={props.classe}>
                {props.nome}
            </Button> &nbsp;
        </span>
    );
};
