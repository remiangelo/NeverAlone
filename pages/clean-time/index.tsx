import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Divider,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Badge,
  SimpleGrid,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaTrophy, FaMedal, FaStar, FaEdit } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { differenceInDays, format, addDays } from 'date-fns';

// Define milestone days
const MILESTONES = [
  { days: 1, name: 'First Day', icon: FaStar, color: 'teal' },
  { days: 7, name: 'One Week', icon: FaStar, color: 'teal' },
  { days: 30, name: 'One Month', icon: FaStar, color: 'teal' },
  { days: 60, name: 'Two Months', icon: FaStar, color: 'teal' },
  { days: 90, name: 'Three Months', icon: FaMedal, color: 'blue' },
  { days: 180, name: 'Six Months', icon: FaMedal, color: 'blue' },
  { days: 270, name: 'Nine Months', icon: FaMedal, color: 'blue' },
  { days: 365, name: 'One Year', icon: FaTrophy, color: 'purple' },
  { days: 730, name: 'Two Years', icon: FaTrophy, color: 'purple' },
  { days: 1095, name: 'Three Years', icon: FaTrophy, color: 'purple' },
  { days: 1825, name: 'Five Years', icon: FaTrophy, color: 'purple' },
  { days: 3650, name: 'Ten Years', icon: FaTrophy, color: 'purple' },
];

export default function CleanTime() {
  // In a real app, this would be loaded from user data
  const [cleanDate, setCleanDate] = useState<string | null>('2023-01-01');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCleanDate, setNewCleanDate] = useState(cleanDate || '');

  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  // Calculate clean days
  const calculateCleanDays = () => {
    if (!cleanDate) return 0;
    return differenceInDays(new Date(), new Date(cleanDate));
  };

  const cleanDays = calculateCleanDays();

  // Find next milestone
  const getNextMilestone = () => {
    const nextMilestone = MILESTONES.find(milestone => milestone.days > cleanDays);
    return nextMilestone || MILESTONES[MILESTONES.length - 1];
  };

  const nextMilestone = getNextMilestone();
  
  // Calculate progress to next milestone
  const calculateProgress = () => {
    if (!nextMilestone) return 100;
    
    const prevMilestone = MILESTONES.filter(m => m.days < nextMilestone.days).pop();
    const prevDays = prevMilestone ? prevMilestone.days : 0;
    
    const totalDaysToNextMilestone = nextMilestone.days - prevDays;
    const daysCompleted = cleanDays - prevDays;
    
    return Math.round((daysCompleted / totalDaysToNextMilestone) * 100);
  };

  // Handle clean date update
  const handleUpdateCleanDate = () => {
    setCleanDate(newCleanDate);
    onClose();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  // Calculate milestone achievement date
  const getMilestoneDate = (days: number) => {
    if (!cleanDate) return '';
    const date = addDays(new Date(cleanDate), days);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <Layout>
      <Head>
        <title>Clean Time Tracker | Never Alone</title>
        <meta name="description" content="Track your clean time and celebrate recovery milestones" />
      </Head>

      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1" size="xl">
            Clean Time Tracker
          </Heading>
          <Button 
            leftIcon={<FaEdit />} 
            colorScheme="teal" 
            onClick={onOpen}
          >
            {cleanDate ? 'Update Clean Date' : 'Set Clean Date'}
          </Button>
        </Flex>
        
        <Text mb={8}>
          Track your clean time and celebrate your recovery milestones. Every day counts on your journey to recovery.
        </Text>

        {cleanDate ? (
          <>
            <Card mb={8} borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden">
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Stat>
                    <StatLabel>Clean Date</StatLabel>
                    <StatNumber>{formatDate(cleanDate)}</StatNumber>
                    <StatHelpText>
                      <Flex align="center">
                        <Icon as={FaCalendarAlt} mr={2} />
                        Your sobriety date
                      </Flex>
                    </StatHelpText>
                  </Stat>
                  
                  <Stat>
                    <StatLabel>Clean Time</StatLabel>
                    <StatNumber>{cleanDays} days</StatNumber>
                    <StatHelpText>
                      <Flex align="center">
                        <Icon as={FaStar} mr={2} />
                        One day at a time
                      </Flex>
                    </StatHelpText>
                  </Stat>
                  
                  <Stat>
                    <StatLabel>Next Milestone</StatLabel>
                    <StatNumber>{nextMilestone.name}</StatNumber>
                    <StatHelpText>
                      <Flex align="center">
                        <Icon as={nextMilestone.icon} mr={2} />
                        {nextMilestone.days - cleanDays} days to go
                      </Flex>
                    </StatHelpText>
                  </Stat>
                </SimpleGrid>
                
                <Box mt={6}>
                  <Text mb={2}>Progress to next milestone:</Text>
                  <Progress 
                    value={calculateProgress()} 
                    colorScheme="teal" 
                    height="12px" 
                    borderRadius="full" 
                    hasStripe
                    isAnimated
                  />
                </Box>
              </CardBody>
            </Card>

            <Heading as="h2" size="lg" mb={4}>
              Your Milestones
            </Heading>
            <Divider mb={6} />

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
              {MILESTONES.map((milestone) => {
                const isAchieved = cleanDays >= milestone.days;
                return (
                  <Card 
                    key={milestone.days} 
                    borderWidth="1px" 
                    borderColor={isAchieved ? `${milestone.color}.500` : borderColor} 
                    borderRadius="lg" 
                    overflow="hidden"
                    bg={isAchieved ? `${milestone.color}.50` : cardBgColor}
                    _dark={{
                      bg: isAchieved ? `${milestone.color}.900` : cardBgColor,
                      borderColor: isAchieved ? `${milestone.color}.500` : borderColor,
                    }}
                  >
                    <CardBody>
                      <Flex align="center" mb={3}>
                        <Icon 
                          as={milestone.icon} 
                          boxSize={6} 
                          color={isAchieved ? `${milestone.color}.500` : 'gray.400'} 
                          mr={3} 
                        />
                        <VStack align="start" spacing={0}>
                          <Heading as="h3" size="md">
                            {milestone.name}
                          </Heading>
                          <Text fontSize="sm" color="gray.500">
                            {milestone.days} days
                          </Text>
                        </VStack>
                      </Flex>
                      
                      <HStack mt={4} justify="space-between">
                        <Text fontSize="sm">
                          {isAchieved 
                            ? `Achieved on ${getMilestoneDate(milestone.days)}` 
                            : `Expected on ${getMilestoneDate(milestone.days)}`}
                        </Text>
                        <Badge colorScheme={isAchieved ? milestone.color : 'gray'}>
                          {isAchieved ? 'Achieved' : 'Upcoming'}
                        </Badge>
                      </HStack>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>
          </>
        ) : (
          <Card borderWidth="1px" borderColor={borderColor} borderRadius="lg" p={8} textAlign="center">
            <VStack spacing={4}>
              <Icon as={FaCalendarAlt} boxSize={12} color="gray.400" />
              <Heading as="h3" size="md">No Clean Date Set</Heading>
              <Text>Set your clean date to start tracking your recovery journey.</Text>
              <Button colorScheme="teal" onClick={onOpen}>Set Clean Date</Button>
            </VStack>
          </Card>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{cleanDate ? 'Update Clean Date' : 'Set Clean Date'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>When did you start your recovery journey?</FormLabel>
                  <Input 
                    type="date" 
                    value={newCleanDate} 
                    onChange={(e) => setNewCleanDate(e.target.value)} 
                    max={format(new Date(), 'yyyy-MM-dd')}
                  />
                </FormControl>
                <Text fontSize="sm" color="gray.500">
                  This date will be used to calculate your clean time and milestones.
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleUpdateCleanDate}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}