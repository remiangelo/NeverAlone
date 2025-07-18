import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  Button, 
  Stack, 
  Collapse, 
  Icon, 
  Link as ChakraLink, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  useColorModeValue, 
  useBreakpointValue, 
  useDisclosure,
  useColorMode
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  CloseIcon, 
  ChevronDownIcon, 
  ChevronRightIcon, 
  MoonIcon, 
  SunIcon 
} from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={Link}
            href="/"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="xl"
            _hover={{ textDecoration: 'none' }}
            cursor="pointer"
          >
            Never Alone
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav currentPath={router.pathname} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <IconButton
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
          >
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'teal.400'}
            href={'#'}
            _hover={{
              bg: 'teal.300',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Meeting Finder',
    href: '/meetings',
  },
  {
    label: 'Journal',
    href: '/journal',
  },
  {
    label: 'Clean Time',
    href: '/clean-time',
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'NA Resources',
        subLabel: 'Find NA literature and resources',
        href: '/resources/na',
      },
      {
        label: 'AA Resources',
        subLabel: 'Find AA literature and resources',
        href: '/resources/aa',
      },
    ],
  },
];

interface DesktopNavProps {
  currentPath: string;
}

const DesktopNav = ({ currentPath }: DesktopNavProps) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box>
                <ChakraLink
                  as={Link}
                  href={navItem.href ?? '#'}
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={currentPath === navItem.href ? 'teal.500' : linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </ChakraLink>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <ChakraLink
      as={Link}
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('teal.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'teal.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'teal.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleClick = () => {
    if (children) {
      onToggle();
    }
  };

  return (
    <div onClick={handleClick}>
      <Stack spacing={4}>
        <Flex
          py={2}
          as="div"
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!children) {
              window.location.href = href ?? '#';
            }
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}
          >
            {children &&
              children.map((child) => (
                <ChakraLink 
                  key={child.label} 
                  as={Link} 
                  href={child.href} 
                  py={2}
                >
                  {child.label}
                </ChakraLink>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </div>
  );
};
