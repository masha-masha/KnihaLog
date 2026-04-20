import {
 Card,
 Text,
 Badge,
 Group,
 Rating,
 ActionIcon,
 Stack,
} from "@mantine/core";
import { IconTrash, IconBook, IconEdit } from "@tabler/icons-react";
import type { Book } from "../types/book";
import { useAppDispatch } from "../store/hooks";
import { deleteBook } from "../store/bookSlice";
import { useDisclosure } from "@mantine/hooks";
import { EditBookModal } from "./EditBookModal";

interface BookCardProps {
 book: Book;
}

export function BookCard({ book }: BookCardProps) {
 const dispatch = useAppDispatch();

 const [editOpened, { open: openEdit, close: closeEdit }] =
  useDisclosure(false);

 const statusColors = {
  planned: "gray",
  reading: "blue",
  finished: "green",
 };

 return (
  <>
   <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs">
     <Group justify="space-between">
      <Badge color={statusColors[book.status]} variant="light">
       {book.status}
      </Badge>
      <Group>
       <ActionIcon variant="subtle" color="black" onClick={openEdit}>
        <IconEdit size={18} />
       </ActionIcon>
       <ActionIcon
        variant="subtle"
        color="red"
        onClick={() => dispatch(deleteBook(book.id))}
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

     <Group justify="space-between" mt="md">
      <Rating value={book.rating} readOnly />
      <Text size="xs" c="dimmed">
       {book.language.toUpperCase()}
      </Text>
     </Group>
    </Stack>

    <Group
     mt="md"
     c="blue"
    >
     <IconBook size={14} /> 
     <Text>Цытат: {book.quotes.length}</Text>
    </Group>
   </Card>
   <EditBookModal opened={editOpened} onClose={closeEdit} book={book} />
  </>
 );
}
