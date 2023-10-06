import {
  View,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
  ArrowRightIcon,
} from '@gluestack-ui/themed';
import { ErrorBoundaryProps } from 'expo-router';
import { Box } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

function Unmatched(props: ErrorBoundaryProps) {
  const router = useRouter();
  return (
    <Box
      bg="#000"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Box justifyContent="center" alignItems="center">
        <Text fontSize={80}>404</Text>
        <Text fontSize={20} mt={24}>
          Page not found
        </Text>
        <Button
          variant="link"
          onPress={() => {
            router.replace('/dashboard');
          }}
        >
          <ButtonText mt={40} color="#fff" fontWeight="normal">
            Redirect to Dashboard
          </ButtonText>
          <ButtonIcon as={ArrowRightIcon} ml={8} mt={40} color="white" />
        </Button>
      </Box>
    </Box>
  );
}

export default Unmatched;
