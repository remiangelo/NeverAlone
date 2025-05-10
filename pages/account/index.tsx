import { useState, useEffect } from 'react';
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
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Switch,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Icon,
  Avatar,
  AvatarBadge,
  Center,
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignOutAlt, FaSync, FaUserCircle } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { signIn, signUp, signOut, resetPassword, onAuthStateChange } from '../../lib/auth';
import { auth } from '../../lib/firebase';

export default function Account() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    syncJournal: true,
    syncMeetings: true,
    syncCleanTime: true,
  });

  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Check if the user is authenticated on load
  useEffect(() => {
    // Use Firebase's auth state observer
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setIsAuthenticated(true);
        setFormData(prevData => ({
          ...prevData,
          email: user.email || '',
          displayName: user.displayName || '',
        }));

        // For compatibility with existing code
        localStorage.setItem('user', JSON.stringify({ 
          email: user.email, 
          displayName: user.displayName 
        }));

        // In a full implementation, would also load user preferences from Firestore here
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const validateForm = (type: 'signin' | 'signup') => {
    const errors = {
      email: '',
      password: '',
      displayName: '',
    };
    let isValid = true;

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (type === 'signup' && !formData.displayName) {
      errors.displayName = 'Name is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked,
    });
  };

  const handleSignIn = async () => {
    if (!validateForm('signin')) return;

    setIsLoading(true);
    try {
      // Call Firebase auth
      const result = await signIn(formData.email, formData.password);

      if (result.error) {
        throw new Error(result.error);
      }

      // Still store in localStorage for compatibility with existing code
      localStorage.setItem('user', JSON.stringify({ email: formData.email }));
      setIsAuthenticated(true);
      toast({
        title: 'Signed in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.message || 'Please check your credentials and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateForm('signup')) return;

    setIsLoading(true);
    try {
      // Call Firebase auth
      const result = await signUp(formData.email, formData.password, formData.displayName);

      if (result.error) {
        throw new Error(result.error);
      }

      // Still store in localStorage for compatibility with existing code
      localStorage.setItem('user', JSON.stringify({ email: formData.email, displayName: formData.displayName }));
      setIsAuthenticated(true);
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.message || 'Please try again with a different email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Call Firebase auth
      const result = await signOut();

      if (result.error) {
        throw new Error(result.error);
      }

      // Still remove from localStorage for compatibility with existing code
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      toast({
        title: 'Signed out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setFormErrors({
        ...formErrors,
        email: 'Email is required to reset password',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call Firebase auth
      const result = await resetPassword(formData.email);

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Password reset email sent',
        description: 'Check your email for instructions to reset your password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error resetting password',
        description: error.message || 'Please check your email and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to Firestore
    toast({
      title: 'Preferences saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Head>
        <title>Account | Never Alone</title>
        <meta name="description" content="Manage your account and sync your data across devices" />
      </Head>

      <Box>
        <Heading as="h1" size="xl" mb={6}>
          Account
        </Heading>
        <Text mb={8}>
          Sign in to sync your journal entries, meeting favorites, and clean time across all your devices.
        </Text>

        {isAuthenticated ? (
          // User is signed in - show account management
          <Card borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden" mb={8}>
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md">Account Settings</Heading>
                <Button 
                  leftIcon={<FaSignOutAlt />} 
                  colorScheme="red" 
                  variant="outline"
                  onClick={handleSignOut}
                  isLoading={isLoading}
                >
                  Sign Out
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack spacing={8} align="stretch">
                <Flex 
                  direction={{ base: 'column', md: 'row' }} 
                  align={{ base: 'center', md: 'flex-start' }}
                  gap={6}
                >
                  <Center>
                    <Avatar size="xl" icon={<FaUserCircle fontSize="2rem" />}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </Center>
                  <Box flex="1">
                    <Heading as="h3" size="md" mb={2}>
                      {formData.displayName || 'User'}
                    </Heading>
                    <Text color="gray.500" mb={4}>
                      {formData.email}
                    </Text>
                    <HStack>
                      <Button size="sm" colorScheme="teal">
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleResetPassword}>
                        Change Password
                      </Button>
                    </HStack>
                  </Box>
                </Flex>

                <Divider />

                <Box>
                  <Heading as="h3" size="md" mb={4}>
                    Sync Settings
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="syncJournal" mb="0">
                        Sync Journal Entries
                      </FormLabel>
                      <Switch 
                        id="syncJournal" 
                        name="syncJournal"
                        isChecked={preferences.syncJournal}
                        onChange={handlePreferenceChange}
                        colorScheme="teal"
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="syncMeetings" mb="0">
                        Sync Favorite Meetings
                      </FormLabel>
                      <Switch 
                        id="syncMeetings" 
                        name="syncMeetings"
                        isChecked={preferences.syncMeetings}
                        onChange={handlePreferenceChange}
                        colorScheme="teal"
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="syncCleanTime" mb="0">
                        Sync Clean Time
                      </FormLabel>
                      <Switch 
                        id="syncCleanTime" 
                        name="syncCleanTime"
                        isChecked={preferences.syncCleanTime}
                        onChange={handlePreferenceChange}
                        colorScheme="teal"
                      />
                    </FormControl>
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Heading as="h3" size="md" mb={4}>
                    App Settings
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="darkMode" mb="0">
                        Dark Mode
                      </FormLabel>
                      <Switch 
                        id="darkMode" 
                        name="darkMode"
                        isChecked={preferences.darkMode}
                        onChange={handlePreferenceChange}
                        colorScheme="teal"
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="notifications" mb="0">
                        Enable Notifications
                      </FormLabel>
                      <Switch 
                        id="notifications" 
                        name="notifications"
                        isChecked={preferences.notifications}
                        onChange={handlePreferenceChange}
                        colorScheme="teal"
                      />
                    </FormControl>
                  </VStack>
                </Box>

                <Flex justify="flex-end">
                  <Button 
                    colorScheme="teal" 
                    leftIcon={<FaSync />}
                    onClick={handleSavePreferences}
                  >
                    Save Preferences
                  </Button>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          // User is not signed in - show auth forms
          <Card borderWidth="1px" borderColor={borderColor} borderRadius="lg" overflow="hidden">
            <CardBody>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Sign In</Tab>
                  <Tab>Create Account</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl isInvalid={!!formErrors.email}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                          />
                          <InputRightElement>
                            <Icon as={FaUser} color="gray.500" />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!formErrors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="********"
                          />
                          <InputRightElement>
                            <Button
                              variant="ghost"
                              onClick={() => setShowPassword(!showPassword)}
                              size="sm"
                              tabIndex={-1}
                            >
                              <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray.500" />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={handleSignIn}
                        isLoading={isLoading}
                        leftIcon={<FaLock />}
                        mt={2}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="link"
                        colorScheme="teal"
                        size="sm"
                        onClick={handleResetPassword}
                        isDisabled={isLoading}
                      >
                        Forgot Password?
                      </Button>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <FormControl isInvalid={!!formErrors.displayName}>
                        <FormLabel>Name</FormLabel>
                        <Input
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                        />
                        <FormErrorMessage>{formErrors.displayName}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!formErrors.email}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                          />
                          <InputRightElement>
                            <Icon as={FaUser} color="gray.500" />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={!!formErrors.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="********"
                          />
                          <InputRightElement>
                            <Button
                              variant="ghost"
                              onClick={() => setShowPassword(!showPassword)}
                              size="sm"
                              tabIndex={-1}
                            >
                              <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray.500" />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={handleSignUp}
                        isLoading={isLoading}
                        leftIcon={<FaUserCircle />}
                        mt={2}
                      >
                        Create Account
                      </Button>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        )}
      </Box>
    </Layout>
  );
}
