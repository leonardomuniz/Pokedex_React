import React, { useEffect, useState } from 'react';
import api from './services/api.js';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Input,
  Spacer,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';
import axios from 'axios';

import PokemonTipo from './components/PokemonTipo';
import StatusBase from './components/StatusBase';
import Tags from './components/Tags';

import './App.css'


document.title = "Pokedex"
function App() {
  const [pesquisa, setPesquisa] = useState('');
  const [pokemon, setPokemon] = useState({ nome: '', id: '', imagem: '', status: '', tipos: [], movimentos: '', habilidades: '' });
  const [primario, setPrimario] = useState({ forcas: '', fraquezas: '', poucoDano: '', resistencia: '' });
  const [secundario, setSecundario] = useState({ forcas: '', fraquezas: '', poucoDano: '', resistencia: '' });
  const [invalido, setInvalido] = useState('');
  const [isMobile] = useMediaQuery(["(max-width: 960px)"])


  async function getPokemon(pesquisa) {
    try {
      await api.get(`pokemon/${pesquisa}`).then(res => {
        setPokemon({
          nome: res.data.name,
          id: res.data.id,
          imagem: res.data.sprites.other['official-artwork']["front_default"],
          status: res.data.stats,
          tipos: res.data.types,
          movimentos: res.data.moves,
          habilidades: res.data.abilities
        });

        setInvalido('');
      });
    } catch (error) {
      setInvalido(<Alert status="warning" borderRadius="3xl"><AlertIcon />Por favor, informe um pokemon válido !!</Alert>);
    }
  };

  useEffect(() => {
    const listaTipos = pokemon.tipos.map(item => item.type.url);

    async function fichaTecnica() {
      await axios.get(`${listaTipos[0]}`).then(res => {
        const dobroDanoPara = res.data.damage_relations.double_damage_to.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
        const dobroDanoDe = res.data.damage_relations.double_damage_from.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
        const meioDanoPara = res.data.damage_relations.half_damage_to.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
        const meioDanoDe = res.data.damage_relations.half_damage_from.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);

        setPrimario({ forcas: dobroDanoPara, fraquezas: dobroDanoDe, poucoDano: meioDanoPara, resistencia: meioDanoDe });
      });

      if (listaTipos[1]) {
        await axios.get(`${listaTipos[1]}`).then(res => {
          const dobroDanoPara = res.data.damage_relations.double_damage_to.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
          const dobroDanoDe = res.data.damage_relations.double_damage_from.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
          const meioDanoPara = res.data.damage_relations.half_damage_to.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);
          const meioDanoDe = res.data.damage_relations.half_damage_from.map((tipo, index) => <PokemonTipo chave={index} classe={tipo.name} nome={tipo.name} />);

          setSecundario({ forcas: dobroDanoPara, fraquezas: dobroDanoDe, poucoDano: meioDanoPara, resistencia: meioDanoDe });
        });
      };
    };

    fichaTecnica();
  }, [pokemon.tipos]);

  useEffect(() => getPokemon(1), []);


  return (
    <div className="App">
      <Flex direction="column" bg="purple" >

        <Flex color="white" direction="row">
          <Box p="4" >
            <Heading >POKE<span className="amarelo">STATS</span></Heading>
          </Box>
          <Spacer />
          <Box p="4" >

            <Link href="https://github.com/leonardomuniz" isExternal fontSize="xl"> git/leonardomuniz</Link>
          </Box>
        </Flex>

        <Center h={300} color="white">
          <Container>
            <Heading align="center">MONTE TIMES DE POKEMONS <span className="amarelo">MELHORES!</span></Heading><br />
            <Text fontSize="xl" align="center">Aqui você consegue ver fácilmente as <strong>forças e fraquezas</strong> do seu pokemon ou do  adversário !</Text>
          </Container>
        </Center>
        <Box h={150} />

      </Flex>
      <div className="divisoria layer1"></div>

      <Container maxW="container.lg" className="teste" >
        <Container>
          <Flex direction="column" >
            {invalido}<br />
            <Input type="text" name="name" onChange={evento => setPesquisa(evento.target.value)} placeholder="Pesquisar pokemon" bg="white" />
            <Button onClick={() => getPokemon(pesquisa)} colorScheme="pink" leftIcon={<Search2Icon />} variant="solid" type="submit">Pesquisar</Button>
          </Flex>
        </Container>

        <br />

        {isMobile === true ? (
          <>
            <Grid templateColumns="repeat(1, 1fr)" gap={10} boxShadow="2xl" bg="white" borderRadius="3xl">
              <Box>
                <Image src={pokemon.imagem} />
              </Box>

              <Center>
                <Box w="90%">
                  <br /><br />
                  <Heading>{pokemon.id === '' ? '' : <> {pokemon.nome} N°{pokemon.id}</>}</Heading>
                  <br />
                  {pokemon.status === '' ? '' : pokemon.status.map((item, index) => <StatusBase chave={index} nome={item.stat.name} estado={item.base_stat} />)}
                  <br /><br />

                  <Heading>Tipo</Heading>
                  {pokemon.tipos === '' ? '' : pokemon.tipos.map((item, index) => <PokemonTipo chave={index} classe={item.type.name} nome={item.type.name} />)}
                  <br /><br />

                  <Heading>Habilidades</Heading>
                  {pokemon.habilidades === '' ? '' : pokemon.habilidades.map((item, index) => <Tags chave={index} nome={item.ability.name} />)}
                  <br /><br />
                </Box>
              </Center>
            </Grid>
          </>
        ) : (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} boxShadow="2xl" bg="white" borderRadius="3xl">
              <Box>
                <Image src={pokemon.imagem} />
              </Box>

              <Box w="95%">
                <br /><br />
                <Heading>{pokemon.id === '' ? '' : <> {pokemon.nome} N°{pokemon.id}</>}</Heading>
                <br />
                {pokemon.status === '' ? '' : pokemon.status.map((item, index) => <StatusBase chave={index} nome={item.stat.name} estado={item.base_stat} />)}
                <br /><br />

                <Heading>Tipo</Heading>
                {pokemon.tipos === '' ? '' : pokemon.tipos.map((item, index) => <PokemonTipo chave={index} classe={item.type.name} nome={item.type.name} />)}
                <br /><br />

                <Heading>Habilidades</Heading>
                {pokemon.habilidades === '' ? '' : pokemon.habilidades.map((item, index) => <Tags chave={index} nome={item.ability.name} />)}
                <br /><br />
              </Box>
            </Grid>
          </>
        )}

        <br /><br />

        {isMobile === true ? (
          <>
            <Grid templateColumns="repeat(1, 1fr)" gap={10}  >
              <Box boxShadow="2xl" bg="green.50" borderRadius="3xl">
                <br />
                <Heading align="center" color="green.700">Pontos Fortes</Heading>
                <br />
                <Text fontSize="3xl" align="center">Dano dobrado contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.forcas}
                    {secundario.forcas}
                  </Box>
                </Center>
                <br /><br />

                <Text fontSize="3xl" align="center">Resistente Contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.resistencia}
                    {secundario.resistencia}
                  </Box>
                </Center>
                <br />
              </Box>

              <Box boxShadow="2xl" bg="red.50" borderRadius="3xl">
                <br />
                <Heading align="center" color="red.700">Pontos Fracos</Heading>
                <br />
                <Text fontSize="3xl" align="center">Leva Dano Dobrado De:</Text>
                <Center>
                  <Box w="90%">
                    {primario.fraquezas}
                    {secundario.fraquezas}
                  </Box>
                </Center>
                <br /><br />

                <Text fontSize="3xl" align="center">Da Pouco Dano Contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.poucoDano}
                    {secundario.poucoDano}
                  </Box>
                </Center>
                <br />
              </Box>

            </Grid>
            <br /><br />
          </>
        ) : (
          <>
            <Grid templateColumns="repeat(2, 1fr)" gap={10}  >
              <Box boxShadow="2xl" bg="green.50" borderRadius="3xl">
                <br />
                <Heading align="center" color="green.700">Pontos Fortes</Heading>
                <br />
                <Text fontSize="3xl" align="center">Dano dobrado contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.forcas}
                    {secundario.forcas}
                  </Box>
                </Center>
                <br /><br />

                <Text fontSize="3xl" align="center">Resistente Contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.resistencia}
                    {secundario.resistencia}
                  </Box>
                </Center>
                <br />
              </Box>

              <Box boxShadow="2xl" bg="red.50" borderRadius="3xl">
                <br />
                <Heading align="center" color="red.700">Pontos Fracos</Heading>
                <br />
                <Text fontSize="3xl" align="center">Leva Dano Dobrado De:</Text>
                <Center>
                  <Box w="90%">
                    {primario.fraquezas}
                    {secundario.fraquezas}
                  </Box>
                </Center>
                <br /><br />

                <Text fontSize="3xl" align="center">Da Pouco Dano Contra:</Text>
                <Center>
                  <Box w="90%">
                    {primario.poucoDano}
                    {secundario.poucoDano}
                  </Box>
                </Center>
                <br />
              </Box>

            </Grid>
            <br /><br />
          </>
        )}


        <Heading align="center">Movimentos</Heading>
        <br />
        {pokemon.movimentos === '' ? '' : pokemon.movimentos.map((item, index) => <Tags chave={index} nome={item.move.name} />)}

      </Container>

      <div className="divisoria layer2"></div>
      <Center bg="purple" height={50} />
    </div>

  );
}

export default App;
