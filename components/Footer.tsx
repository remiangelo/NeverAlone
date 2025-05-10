import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import NextLink from 'next/link';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={10}
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Never Alone
              </Text>
            </Box>
            <Text fontSize={'sm'}>
              A free, open-source app that helps people in recovery find NA/AA meetings, 
              track their clean time, and reflect daily through journaling and mood tracking.
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'GitHub'} href={'https://github.com/yourusername/recovery-app'}>
                <FaGithub />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Features
            </Text>
            <Link as={NextLink} href={'/meetings'}>
              Meeting Finder
            </Link>
            <Link as={NextLink} href={'/journal'}>
              Journal
            </Link>
            <Link as={NextLink} href={'/clean-time'}>
              Clean Time
            </Link>
            <Link as={NextLink} href={'/resources'}>
              Resources
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Support
            </Text>
            <Link as={NextLink} href={'/help'}>
              Help Center
            </Link>
            <Link as={NextLink} href={'/privacy'}>
              Privacy Policy
            </Link>
            <Link as={NextLink} href={'/terms'}>
              Terms of Service
            </Link>
            <Link as={NextLink} href={'/contact'}>
              Contact Us
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
              Community
            </Text>
            <Link href={'https://na.org'} isExternal>
              NA.org
            </Link>
            <Link href={'https://aa.org'} isExternal>
              AA.org
            </Link>
            <Link href={'https://github.com/yourusername/recovery-app'} isExternal>
              Contribute
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© {new Date().getFullYear()} Never Alone. All rights reserved</Text>
          <Text>Made with ❤️ by Remi Beltram, an addict</Text>
        </Container>
      </Box>
    </Box>
  );
}
