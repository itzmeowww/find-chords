import { Text, Flex, Box, Tooltip, Divider } from "@chakra-ui/react";

import { Container } from "../components/Container";

import { DarkModeSwitch } from "../components/DarkModeSwitch";

import song from "../data/song.json";
interface sectionInterface {
  info: string;
  noLyric?: boolean;
}
const Index = () => {
  const createSection = (ly: sectionInterface) => {
    let ret = [];
    let text = "";
    let chord = "";
    const noLyric = ly.noLyric === undefined ? false : ly.noLyric;
    for (let idx = 0; idx < ly.info.length; idx++) {
      if (ly.info[idx] == "[") {
        idx++;
        while (ly.info[idx] != "]") {
          chord += ly.info[idx];
          idx++;
        }
      } else if (ly.info[idx] == " " || idx == ly.info.length - 1) {
        if (idx == ly.info.length - 1) text += ly.info[idx];

        ret.push(
          <Flex
            h="4em"
            mr="5px"
            justify="flex-end"
            flexDir="column"
            overflow="visible"
          >
            <Tooltip
              label={chord}
              isOpen={true}
              placement="top-start"
              fontSize="xs"
              hasArrow={!noLyric}
              modifiers={[
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: [],
                  },
                },
                {
                  name: "preventOverflow",
                  options: {
                    mainAxis: false,
                    altAxis: false,
                  },
                },
              ]}
            >
              <Text whiteSpace="nowrap" fontFamily="sanSerif" fontWeight="thin">
                {text}&nbsp;
              </Text>
            </Tooltip>
          </Flex>
        );

        chord = "";
        text = "";
      } else {
        text += ly.info[idx];
      }
    }
    return ret;
  };

  const ret = song.chord.map((x) => {
    return createSection(x);
  });

  return (
    <Container minHeight="100vh">
      <Box h="20vh"></Box>
      <Text fontSize="4xl" fontWeight="bold" colorScheme="blackAlpha">
        {song.title}
      </Text>
      <Text fontSize="xl" colorScheme="gray">
        {song.artist}
      </Text>
      <Box h="10vh"></Box>
      <Flex flexDir="column" justify="center">
        {ret.map((x, id) => {
          return (
            <Flex
              maxW={["80vw", "30vw"]}
              flexDir="row"
              flexWrap="wrap"
              justify="center"
              key={id}
            >
              {x.map((xx) => {
                return xx;
              })}
              <Divider mt="20px" mb="10px" w="80%" variant="dashed" />
            </Flex>
          );
        })}
      </Flex>
      <Box h="50vh" w="100%"></Box>

      <DarkModeSwitch />
    </Container>
  );
};
export default Index;
