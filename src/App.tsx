import {
 Container,
 Title,
 Button,
 SimpleGrid,
 Group,
 Stack,
 Flex,
 Text,
 SegmentedControl,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; 
import { BookCard } from "./components/BookCard";
import { AddBookModal } from "./components/AddBookModal";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { setFilter, type BooksFilter } from "./store/bookSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";

export default function App() {
 const { t } = useTranslation(); 
 const [opened, { open, close }] = useDisclosure(false);
 
 const books = useAppSelector((state) => state.books.books);
 const currentFilter = useAppSelector((state) => state.books.filter);
 const dispatch = useAppDispatch();

 const filteredBooks = books.filter((book) => {
  if (currentFilter === "planned") return book.status === "planned";
  if (currentFilter === "finished") return book.status === "finished";
  if (currentFilter === "reading") return book.status === "reading";
  return true;
 });

 return (
  <Flex direction="column" mih="100vh">
   <Header />
   <Container size="md" py="xl" flex={1}>
    <Stack gap="xl">
     <Group justify="space-between">
      <Stack gap={0}>
       <Title order={1}>{t('title')}</Title>
       <Text c="dimmed">{t('subtitle')}</Text>
      </Stack>
      <Button leftSection={<IconPlus size={18} />} onClick={open} radius="xl">
       {t('addBook')}
      </Button>
     </Group>

     <AddBookModal opened={opened} onClose={close} />

     <SegmentedControl
      fullWidth
      value={currentFilter}
      onChange={(val) => dispatch(setFilter(val as BooksFilter))}
      data={[
       { label: t('filterAll'), value: "all" },
       { label: t('filterReading'), value: "reading" },
       { label: t('filterFinished'), value: "finished" },
       { label: t('filterPlanned'), value: "planned" },
      ]}
     />

     {books.length > 0 ? (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
       {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
       ) : (
        <Text c="dimmed" ta="center" py="xl" style={{ gridColumn: "1 / -1" }}>
         {t('noResultsInCategory')}
        </Text>
       )}
      </SimpleGrid>
     ) : (
      <Stack
       align="center"
       py={100}
       px={10}
       bd="2px dashed var(--mantine-color-gray-3)"
       bdrs="16px"
      >
       <Text c="dimmed" ta="center">
        {t('emptyLibraryText')}
       </Text>
       <Button variant="light" onClick={open}>
        {t('addFirstBook')}
       </Button>
      </Stack>
     )}
    </Stack>
   </Container>
   <Footer />
  </Flex>
 );
}
