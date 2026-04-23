import {
 Container,
 Title,
 Button,
 SimpleGrid,
 Group,
 Stack,
 Flex,
 Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useAppSelector } from "./store/hooks";
import { BookCard } from "./components/BookCard";
import { AddBookModal } from "./components/AddBookModal";
import { Footer } from "./components/Footer";

export default function App() {
 const [opened, { open, close }] = useDisclosure(false);
 const books = useAppSelector((state) => state.books.books);

 return (
  <Flex direction="column" mih="100vh">
   <Container size="md" py="xl" flex={1} >
    <Stack gap="xl">
     <Group justify="space-between">
      <Stack gap={0}>
       <Title order={1}>KnihaLog</Title>
       <Text c="dimmed">Твой асабісты дзённік чытання</Text>
      </Stack>
      <Button leftSection={<IconPlus size={18} />} onClick={open} radius="xl">
       Дадаць кнігу
      </Button>
     </Group>

     <AddBookModal opened={opened} onClose={close} />

     {books.length > 0 ? (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
       {books.map((book) => (
        <BookCard key={book.id} book={book} />
       ))}
      </SimpleGrid>
     ) : (
      <Stack
       align="center"
       py={100}
       px={10}
       bd="2px dashed var(--mantine-color-gray-3)"
       bdrs="16px"
      >
       <Text c="dimmed">
        Твая бібліятэка пакуль пустая. Час пачаць новую гісторыю!
       </Text>
       <Button variant="light" onClick={open}>
        Дадаць першую кнігу
       </Button>
      </Stack>
     )}
    </Stack>
   </Container>
   <Footer />
  </Flex>
 );
}
