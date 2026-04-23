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
import { modals } from "@mantine/modals";

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

 const openDeleteModal = () =>
  modals.openConfirmModal({
   title: "Выдаліць кнігу?",
   centered: true,
   children: (
    <Text size="sm">
     Вы сапраўды хочаце выдаліць кнігу <b>«{book.title}»</b>? Гэта дзеянне
     немагчыма будзе адмяніць.
    </Text>
   ),
   labels: { confirm: "Так, выдаліць", cancel: "Адмена" },
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
      <Group>
       <ActionIcon variant="subtle" color="black" onClick={openEdit}>
        <IconEdit size={18} />
       </ActionIcon>
       <ActionIcon variant="subtle" color="red" onClick={openDeleteModal}>
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

     <Group justify="space-between" align="center" mt="md">
      <Rating value={book.rating} readOnly />
      <Text size="md" ta="center"c="dimmed">
       {book.language.toUpperCase()}
      </Text>
     </Group>
    </Stack>

    <Group mt="md" c="blue">
     <IconBook size={14} />
     <Text>Цытат: {book.quotes.length}</Text>
    </Group>
   </Card>
   <EditBookModal opened={editOpened} onClose={closeEdit} book={book} />
  </>
 );
}
