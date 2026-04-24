import { Container, Group, Flex, Divider } from "@mantine/core";
import { ThemeToggle } from "./ThemeToggle";
import { LanguagePicker } from "./LanguagePicker";

const Header = () => {
 return (
  <Container w="100%" pt="20px">
   <Flex justify="flex-end">
    <Group>
     <LanguagePicker />
     <ThemeToggle />
    </Group>
   </Flex>
   <Divider mt="sm" />
  </Container>
 );
};

export default Header;
