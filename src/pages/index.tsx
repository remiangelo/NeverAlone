import { Box, Container, Heading, Text, SimpleGrid, Icon, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaBook, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Head>
        <title>Never Alone | NA/AA Meeting Finder + Recovery Journal</title>
        <meta name="description" content="Find NA/AA meetings, track your clean time, and journal your recovery journey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box bg={bgColor} minH="100vh">
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} textAlign="center" mb={10}>
            <Heading as="h1" size="2xl">
              Never Alone
            </Heading>
            <Text fontSize="xl" maxW="container.md">
              A free, open-source app that helps people in recovery find NA/AA meetings, track their clean time, and reflect daily through journaling and mood tracking.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <FeatureCard 
              icon={FaMapMarkerAlt} 
              title="Meeting Finder" 
              description="Search for local NA/AA meetings by zip code, day, or format (in-person/online)."
              href="/meetings"
            />
            <FeatureCard 
              icon={FaBook} 
              title="Daily Journal & Mood Tracker" 
              description="Log your feelings, gratitude, or experiences each day. Track emotional trends over time."
              href="/journal"
            />
            <FeatureCard 
              icon={FaCalendarAlt} 
              title="Clean Time Tracker" 
              description="Set your sobriety date and watch your clean days grow — with milestone badges."
              href="/clean-time"
            />
            <FeatureCard 
              icon={FaUserCircle} 
              title="Optional Sign-In & Sync" 
              description="Log in to sync your journal entries and clean time across devices."
              href="/account"
            />
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as={Link}
      href={href}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={cardBgColor}
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
      transition="all 0.3s ease"
      height="100%"
      display="block"
      textDecoration="none"
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} w={10} h={10} color="teal.500" />
        <Heading as="h3" size="md">{title}</Heading>
        <Text>{description}</Text>
        <Button colorScheme="teal" variant="outline" mt={2} size="sm">
          Learn More
        </Button>
      </VStack>
    </Box>
  );
}