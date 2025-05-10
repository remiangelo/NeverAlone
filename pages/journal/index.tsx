import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Flex,
  useColorModeValue,
  Divider,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Badge,
  Textarea,
  Input,
  Select,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaSmile, FaMeh, FaFrown, FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { JournalEntry, Mood } from '../../lib/types';
import { format } from 'date-fns';

// Mock data for journal entries
const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '2023-09-01',
    title: 'First Day of Recovery',
    content: 'Today I made the decision to start my recovery journey. It was difficult but I feel hopeful.',
    mood: 'good',
    gratitude: ['My support system', 'The opportunity to change', 'This program'],
    tags: ['Day 1', 'Beginning', 'Hope'],
    isPrivate: false,
  },
  {
    id: '2',
    date: '2023-09-02',
    title: 'Dealing with Cravings',
    content: 'Had strong cravings today but managed to get through it by calling my sponsor and attending a meeting.',
    mood: 'okay',
    gratitude: ['My sponsor', 'NA meetings', 'Breathing techniques'],
    tags: ['Cravings', 'Sponsor', 'Meetings'],
    isPrivate: true,
  },
  {
    id: '3',
    date: '2023-09-03',
    title: 'A Better Day',
    content: 'Feeling much better today. Spent time in nature and practiced mindfulness. Taking it one day at a time.',
    mood: 'great',
    gratitude: ['Nature', 'Mindfulness', 'Progress'],
    tags: ['Nature', 'Mindfulness', 'Progress'],
    isPrivate: false,
  },
];

export default function Journal() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(MOCK_JOURNAL_ENTRIES);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    title: '',
    content: '',
    mood: 'okay',
    gratitude: [],
    tags: [],
    isPrivate: false,
  });

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  const handleCreateEntry = () => {
    // Reset form and open modal
    setSelectedEntry(null);
    setNewEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      title: '',
      content: '',
      mood: 'okay',
      gratitude: [],
      tags: [],
      isPrivate: false,
    });
    onOpen();
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setNewEntry({
      ...entry,
    });
    onOpen();
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
  };

  const handleSaveEntry = () => {
    if (selectedEntry) {
      // Update existing entry
      setJournalEntries(
        journalEntries.map(entry => 
          entry.id === selectedEntry.id 
            ? { ...entry, ...newEntry } as JournalEntry
            : entry
        )
      );
    } else {
      // Create new entry
      const entry: JournalEntry = {
        id: Date.now().toString(), // In a real app, this would be a UUID
        date: newEntry.date || format(new Date(), 'yyyy-MM-dd'),
        title: newEntry.title || 'Untitled Entry',
        content: newEntry.content || '',
        mood: newEntry.mood as Mood || 'okay',
        gratitude: newEntry.gratitude || [],
        tags: newEntry.tags || [],
        isPrivate: newEntry.isPrivate || false,
      };
      setJournalEntries([entry, ...journalEntries]);
    }
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };

  const handleGratitudeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const gratitudeText = e.target.value;
    setNewEntry({
      ...newEntry,
      gratitude: gratitudeText.split('\n').filter(item => item.trim() !== ''),
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsText = e.target.value;
    setNewEntry({
      ...newEntry,
      tags: tagsText.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    });
  };

  const handlePrivateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewEntry({
      ...newEntry,
      isPrivate: e.target.value === 'true',
    });
  };

  const getMoodIcon = (mood: Mood) => {
    switch (mood) {
      case 'great':
        return <Icon as={FaSmile} color="green.500" />;
      case 'good':
        return <Icon as={FaSmile} color="teal.500" />;
      case 'okay':
        return <Icon as={FaMeh} color="yellow.500" />;
      case 'bad':
        return <Icon as={FaFrown} color="orange.500" />;
      case 'terrible':
        return <Icon as={FaFrown} color="red.500" />;
      default:
        return <Icon as={FaMeh} color="gray.500" />;
    }
  };

  const getMoodColor = (mood: Mood) => {
    switch (mood) {
      case 'great':
        return 'green';
      case 'good':
        return 'teal';
      case 'okay':
        return 'yellow';
      case 'bad':
        return 'orange';
      case 'terrible':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Layout>
      <Head>
        <title>Journal & Mood Tracker | Never Alone</title>
        <meta name="description" content="Track your recovery journey with daily journal entries and mood tracking" />
      </Head>

      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1" size="xl">
            Journal & Mood Tracker
          </Heading>
          <Button 
            leftIcon={<FaPlus />} 
            colorScheme="teal" 
            onClick={handleCreateEntry}
          >
            New Entry
          </Button>
        </Flex>
        
        <Text mb={8}>
          Document your recovery journey, track your mood, and practice gratitude. Your journal entries can be private or shared with your support network.
        </Text>

        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            Your Journal Entries
          </Heading>
          <Divider mb={6} />

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {journalEntries.map((entry) => (
              <Card key={entry.id} borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden">
                <CardHeader pb={0}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Heading as="h3" size="md">
                      {entry.title}
                    </Heading>
                    <HStack>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        colorScheme="blue"
                        leftIcon={<FaPencilAlt />}
                        onClick={() => handleEditEntry(entry)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        colorScheme="red"
                        leftIcon={<FaTrash />}
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Flex align="center" mb={3}>
                    <Icon as={FaCalendarAlt} mr={2} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Text>
                    <Badge ml={2} colorScheme={getMoodColor(entry.mood)}>
                      {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                    </Badge>
                    {entry.isPrivate && (
                      <Badge ml={2} colorScheme="purple">Private</Badge>
                    )}
                  </Flex>

                  <Text mb={4} noOfLines={3}>
                    {entry.content}
                  </Text>

                  {entry.gratitude && entry.gratitude.length > 0 && (
                    <Box mb={4}>
                      <Text fontWeight="bold" mb={1}>Grateful for:</Text>
                      <VStack align="start" spacing={0}>
                        {entry.gratitude.map((item, index) => (
                          <Text key={index} fontSize="sm">• {item}</Text>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <Flex mt={2} flexWrap="wrap">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} mr={2} mb={2} colorScheme="gray">
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                  )}
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input 
                    type="date" 
                    name="date" 
                    value={newEntry.date} 
                    onChange={handleInputChange} 
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input 
                    name="title" 
                    placeholder="Entry title" 
                    value={newEntry.title} 
                    onChange={handleInputChange} 
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>How are you feeling today?</FormLabel>
                  <Select 
                    name="mood" 
                    value={newEntry.mood} 
                    onChange={handleInputChange}
                  >
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="okay">Okay</option>
                    <option value="bad">Bad</option>
                    <option value="terrible">Terrible</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Journal Entry</FormLabel>
                  <Textarea 
                    name="content" 
                    placeholder="Write about your day, thoughts, feelings..." 
                    value={newEntry.content} 
                    onChange={handleInputChange} 
                    minH="150px"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>What are you grateful for today? (One item per line)</FormLabel>
                  <Textarea 
                    placeholder="List things you're grateful for..." 
                    value={newEntry.gratitude?.join('\n')} 
                    onChange={handleGratitudeChange} 
                    minH="100px"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <Input 
                    placeholder="e.g., meetings, sponsor, meditation" 
                    value={newEntry.tags?.join(', ')} 
                    onChange={handleTagsChange} 
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Privacy</FormLabel>
                  <Select 
                    value={newEntry.isPrivate ? 'true' : 'false'} 
                    onChange={handlePrivateChange}
                  >
                    <option value="false">Public (visible to your support network)</option>
                    <option value="true">Private (only visible to you)</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleSaveEntry}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}