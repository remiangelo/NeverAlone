import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Select,
  Button,
  Stack,
  Flex,
  Badge,
  useColorModeValue,
  FormControl,
  FormLabel,
  Divider,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaLink, FaInfoCircle } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { Meeting, Day } from '../../lib/types';

// Mock data for meetings
const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1',
    name: 'Recovery Together',
    type: 'NA',
    format: 'in-person',
    day: 'Monday',
    time: '19:30',
    duration: 90,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
    description: 'Open discussion meeting focused on daily recovery challenges.',
    tags: ['Open', 'Discussion', 'Beginners Welcome'],
  },
  {
    id: '2',
    name: 'Serenity Now',
    type: 'AA',
    format: 'hybrid',
    day: 'Wednesday',
    time: '18:00',
    duration: 60,
    address: {
      street: '456 Oak Ave',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      coordinates: {
        latitude: 34.0624,
        longitude: -118.3027,
      },
    },
    virtualLink: 'https://zoom.us/j/123456789',
    description: 'Step study meeting focusing on the 12 steps of recovery.',
    tags: ['Step Study', 'Hybrid', 'Speaker'],
  },
  {
    id: '3',
    name: 'Digital Recovery',
    type: 'NA',
    format: 'online',
    day: 'Friday',
    time: '20:00',
    duration: 90,
    virtualLink: 'https://zoom.us/j/987654321',
    description: 'Online meeting with a focus on literature study and sharing.',
    tags: ['Online', 'Literature', 'Speaker'],
  },
];

export default function Meetings() {
  const [zipCode, setZipCode] = useState('');
  const [day, setDay] = useState<Day | ''>('');
  const [format, setFormat] = useState<Meeting['format'] | ''>('');
  const [type, setType] = useState<Meeting['type'] | ''>('');
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>(MOCK_MEETINGS);

  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just filter the mock data
    let results = [...MOCK_MEETINGS];

    if (day) {
      results = results.filter(meeting => meeting.day === day);
    }

    if (format) {
      results = results.filter(meeting => meeting.format === format);
    }

    if (type) {
      results = results.filter(meeting => meeting.type === type);
    }

    // In a real app, zipCode would be used to filter by proximity
    // For now, we'll just log it
    console.log(`Searching for meetings near ${zipCode}`);

    setFilteredMeetings(results);
  };

  return (
    <Layout>
      <Head>
        <title>Meeting Finder | Never Alone</title>
        <meta name="description" content="Find NA/AA meetings near you or online" />
      </Head>

      <Box>
        <Heading as="h1" size="xl" mb={6}>
          Meeting Finder
        </Heading>
        <Text mb={8}>
          Search for NA/AA meetings by location, day, and format. Find in-person meetings near you or online meetings you can join from anywhere.
        </Text>

        <Card mb={8} variant="outline">
          <CardHeader>
            <Heading size="md">Search Filters</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <FormControl>
                <FormLabel>Zip Code</FormLabel>
                <Input 
                  placeholder="Enter zip code" 
                  value={zipCode} 
                  onChange={(e) => setZipCode(e.target.value)} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Day</FormLabel>
                <Select 
                  placeholder="Select day" 
                  value={day} 
                  onChange={(e) => setDay(e.target.value as Day | '')}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Format</FormLabel>
                <Select 
                  placeholder="Select format" 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value as Meeting['format'] | '')}
                >
                  <option value="in-person">In-Person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select 
                  placeholder="Select type" 
                  value={type} 
                  onChange={(e) => setType(e.target.value as Meeting['type'] | '')}
                >
                  <option value="NA">NA</option>
                  <option value="AA">AA</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <Button 
              mt={4} 
              colorScheme="teal" 
              onClick={handleSearch}
              width={{ base: 'full', md: 'auto' }}
            >
              Search Meetings
            </Button>
          </CardBody>
        </Card>

        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            {filteredMeetings.length} Meetings Found
          </Heading>
          <Divider mb={6} />

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {filteredMeetings.map((meeting) => (
              <Card key={meeting.id} borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden">
                <CardBody>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Heading as="h3" size="md" mb={2}>
                        {meeting.name}
                      </Heading>
                      <Badge colorScheme={meeting.type === 'NA' ? 'teal' : 'blue'} mr={2}>
                        {meeting.type}
                      </Badge>
                      <Badge colorScheme={
                        meeting.format === 'in-person' ? 'green' : 
                        meeting.format === 'online' ? 'purple' : 
                        'orange'
                      }>
                        {meeting.format === 'in-person' ? 'In-Person' : 
                         meeting.format === 'online' ? 'Online' : 
                         'Hybrid'}
                      </Badge>
                    </Box>
                  </Flex>

                  <Stack spacing={3} mt={4}>
                    <Flex align="center">
                      <Icon as={FaCalendarAlt} mr={2} color="gray.500" />
                      <Text>{meeting.day}</Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={FaClock} mr={2} color="gray.500" />
                      <Text>
                        {meeting.time} ({meeting.duration} minutes)
                      </Text>
                    </Flex>
                    {meeting.address && (
                      <Flex align="center">
                        <Icon as={FaMapMarkerAlt} mr={2} color="gray.500" />
                        <Text>
                          {meeting.address.street}, {meeting.address.city}, {meeting.address.state} {meeting.address.zipCode}
                        </Text>
                      </Flex>
                    )}
                    {meeting.virtualLink && (
                      <Flex align="center">
                        <Icon as={FaLink} mr={2} color="gray.500" />
                        <Link href={meeting.virtualLink} color="teal.500" isExternal>
                          Join Online Meeting
                        </Link>
                      </Flex>
                    )}
                    {meeting.description && (
                      <Flex align="flex-start">
                        <Icon as={FaInfoCircle} mr={2} mt={1} color="gray.500" />
                        <Text>{meeting.description}</Text>
                      </Flex>
                    )}
                  </Stack>

                  <Flex mt={4} flexWrap="wrap">
                    {meeting.tags.map((tag) => (
                      <Badge key={tag} mr={2} mb={2} colorScheme="gray">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Box mb={8} height="400px" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
          <Text textAlign="center" py={8}>
            Map view will be implemented here using Leaflet.js
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}
