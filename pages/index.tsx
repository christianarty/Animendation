import { Box, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Card } from "components/Card";
import constants from "../constants";
import { GET_INITIAL_PAGEINFO, GET_RANDOM_ANIME } from "graphql/queries";
import { GetServerSideProps } from "next";
import { GraphQLFetcher } from "utils/fetchers";
import useSWR from "swr";
import { GraphQLResponse } from "graphql-request/dist/types";
import { randomize } from "utils/random";
import { AniListResponse } from "interfaces";
import { useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async () => {
  const getInitialData: AniListResponse = await GraphQLFetcher(
    GET_INITIAL_PAGEINFO,
    {
      initialPage: 1,
    }
  );

  const lastPage = getInitialData.Page.pageInfo.lastPage;

  const randomPage = randomize(lastPage, 1);
  const getRandomInitialData: AniListResponse = await GraphQLFetcher(
    GET_INITIAL_PAGEINFO,
    {
      initialPage: 1,
    }
  );
  return {
    props: {
      initialAniListResponseData: getRandomInitialData,
    },
  };
};

type IndexPageProps = {
  initialAniListResponseData: AniListResponse;
};

const IndexPage = ({
  initialAniListResponseData: initialData,
}: IndexPageProps) => {
  const pageGQL = {
    page: initialData?.Page?.pageInfo?.currentPage,
  };

  const { data } = useQuery([GET_RANDOM_ANIME, pageGQL], GraphQLFetcher, {
    initialData,
  });

  console.log(data);
  return (
    <Container>
      {/* Header */}
      <Flex align="center">
        <Box>
          <Heading>Animendation</Heading>
        </Box>
        <Spacer />
        <Box>
          <Text>About</Text>
        </Box>
      </Flex>
      {/* Content */}
      <Card />
      {/* footer */}
    </Container>
  );
};

export default IndexPage;
