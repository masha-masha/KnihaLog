import {
 Card,
 Text,
 Badge,
 Group,
 Rating,
 ActionIcon,
 Stack,
} from "@mantine/core";
import {
 IconTrash,
 IconBook,
 IconEdit,
 IconPlus,
 IconEye,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; 
import type { Book } from "../types/book";
import { useAppDispatch } from "../store/hooks";
import { deleteBook } from "../store/bookSlice";
import { useDisclosure } from "@mantine/hooks";
import { EditBookModal } from "./EditBookModal";
import { modals } from "@mantine/modals";
import { AddQuoteModal } from "./AddQuoteModal";
import { ViewQuotesModal } from "./ViewQuotesModal";

interface BookCardProps {
 book: Book;
}

export function BookCard({ book }: BookCardProps) {
 const { t } = useTranslation(); 
 const dispatch = useAppDispatch();

 const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
 const [addQuoteOpened, { open: openAddQuote, close: closeAddQuote }] = useDisclosure(false);
 const [viewQuotesOpened, { open: openViewQuotes, close: closeViewQuotes }] = useDisclosure(false);

 const statusColors = {
  planned: "gray",
  reading: "blue",
  finished: "green",
 };

 const openDeleteModal = () =>
  modals.openConfirmModal({
   title: t('deleteModalTitle'), 
   centered: true,
   children: (
    <Text size="sm">
     {t('deleteModalText', { title: book.title })} 
    </Text>
   ),
   labels: { confirm: t('confirm'), cancel: t('cancel') }, 
   confirmProps: { color: "red" },
   onConfirm: () => dispatch(deleteBook(book.id)),
  });

 return (
  <>
   <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs">
     <Group justify="space-between">
      <Badge color={statusColors[book.status]} variant="light">
      {book.status}
      </Badge>
      <Group justify="space-between">
       <ActionIcon 
        variant="subtle" 
        color="black" 
        onClick={openEdit} 
        title={t('editBookTitle')}
       >
        <IconEdit size={18} />
       </ActionIcon>
       <ActionIcon 
        variant="subtle" 
        color="red" 
        onClick={openDeleteModal}
        title={t('deleteModalTitle')}
       >
        <IconTrash size={18} />
       </ActionIcon>
      </Group>
     </Group>
    </Card.Section>

    <Stack mt="md" gap="xs">
     <Text fw={700} size="lg" lineClamp={1}>
      {book.title}
     </Text>
     <Text size="sm" c="dimmed">
      {book.author}
     </Text>

     <Group justify="space-between" align="center" mt="md" pr="5px">
      <Rating value={book.rating} readOnly />
      <Text size="md" ta="center" c="dimmed">
       {book.language.toUpperCase()}
      </Text>
     </Group>
    </Stack>

    <Group mt="md" c="blue" justify="space-between" pr="5px">
     <Group
      onClick={openViewQuotes}
      style={{ cursor: "pointer" }}
      title={t('viewQuotesTitle', { title: book.title })}
     >
      <IconBook size={14} />
      <Text size="sm" fw={500}>
       {t('quotes')}: {book.quotes.length}
      </Text>
     </Group>

     <Group>
      <ActionIcon
       variant="subtle"
       color="blue"
       onClick={openViewQuotes}
       title={t('viewQuotesTitle', { title: '' }).replace(' «»', '')}
      >
       <IconEye size={18} />
      </ActionIcon>
      <ActionIcon
       variant="subtle"
       color="blue"
       onClick={openAddQuote}
       title={t('addQuoteTitle')}
      >
       <IconPlus size={18} />
      </ActionIcon>
     </Group>
    </Group>
   </Card>

   <EditBookModal opened={editOpened} onClose={closeEdit} book={book} />
   <AddQuoteModal
    opened={addQuoteOpened}
    onClose={closeAddQuote}
    bookId={book.id}
   />
   <ViewQuotesModal
    opened={viewQuotesOpened}
    onClose={closeViewQuotes}
    book={book}
   />
  </>
 );
}
