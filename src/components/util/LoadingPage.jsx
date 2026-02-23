import { Flex, Spinner, Text } from '@radix-ui/themes';

const LoadingPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      style={{ height: '100vh', width: '100%' }}
    >
      <Spinner size="3" />
      <Text size="2" color="gray">
        Loading...
      </Text>
    </Flex>
  );
};

export default LoadingPage;

