import {
 Modal,
 Text,
 Stack,
 Paper,
 ScrollArea,
 Blockquote,
 Button,
 Flex,
 ActionIcon,
 Textarea,
 TextInput,
 Group,
 Box,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { Book, Quote } from "../types/book";
import {
 IconPlus,
 IconTrash,
 IconEdit,
 IconCheck,
 IconX,
 IconMoodSmile,
 IconMoodSad,
 IconMoodNeutral,
} from "@tabler/icons-react";
import { useAppDispatch } from "../store/hooks";
import { deleteQuote, updateQuote } from "../store/bookSlice";
import { modals } from "@mantine/modals";
import { useState } from "react";

interface ViewQuotesModalProps {
 opened: boolean;
 onClose: () => void;
 openAddQuote: () => void;
 book: Book;
}

export function ViewQuotesModal({
 opened,
 onClose,
 book,
 openAddQuote,
}: ViewQuotesModalProps) {
 const { t, i18n } = useTranslation();
 const dispatch = useAppDispatch();

 const [editingId, setEditingId] = useState<string | null>(null);
 const [editText, setEditText] = useState("");
 const [editPage, setEditPage] = useState("");
 const [editStatus, setEditStatus] = useState<"funny" | "sad" | "neutral">(
  "neutral",
 );

 const handleSwitchOpenModal = () => {
  onClose();
  setTimeout(() => openAddQuote(), 200);
 };

 const startEditing = (quote: Quote) => {
  setEditingId(quote.id);
  setEditText(quote.text);
  setEditPage(quote.page || "");
 };

 const cancelEditing = () => {
  setEditingId(null);
  setEditText("");
  setEditPage("");
 };

 const handleUpdate = (quoteId: string) => {
  if (editText.trim()) {
   dispatch(
    updateQuote({
     bookId: book.id,
     quoteId,
     text: editText,
     page: editPage,
     status: editStatus,
    }),
   );
   cancelEditing();
  }
 };

 const StatusIcon = ({
  status,
  size = 16,
 }: {
  status?: string;
  size?: number;
 }) => {
  switch (status) {
   case "funny":
    return <IconMoodSmile size={size} color="pink" />;
   case "sad":
    return <IconMoodSad size={size} color="var(--mantine-color-blue-filled)" />;
   default:
    return <IconMoodNeutral size={size} color="gray" />;
  }
 };

 const handleOpenDeleteModal = (quoteId: string) =>
  modals.openConfirmModal({
   title: t("deleteQuoteTitle"),
   centered: true,
   children: (
    <Text size="sm">{t("deleteQuoteText") || "Выдаліць гэту цытату?"}</Text>
   ),
   labels: { confirm: t("confirm"), cancel: t("cancel") },
   confirmProps: { color: "red" },
   onConfirm: () => dispatch(deleteQuote({ bookId: book.id, quoteId })),
  });

 return (
  <Modal
   opened={opened}
   onClose={onClose}
   title={t("viewQuotesTitle", { title: book.title })}
   size="lg"
   centered
  >
   <ScrollArea h={400} offsetScrollbars>
    <Stack gap="md">
     {book.quotes.length > 0 ? (
      book.quotes.map((quote) => (
       <Paper
        key={quote.id}
        withBorder
        p="sm"
        radius="md"
        bg={editingId === quote.id ? "blue.0" : "gray.0"}
       >
        {editingId === quote.id ? (
         <Stack gap="xs">
          <Textarea
           value={editText}
           onChange={(e) => setEditText(e.currentTarget.value)}
           minRows={2}
           autosize
          />

          <Group justify="space-between">
           <Group gap="xs">
            <TextInput
             placeholder={t("pageLabel", { page: "" })}
             value={editPage}
             onChange={(e) => setEditPage(e.currentTarget.value)}
             size="xs"
             style={{ width: "80px" }}
            />

            <Group gap={4} ml="xs">
             <ActionIcon
              variant={editStatus === "funny" ? "filled" : "light"}
              color="pink"
              onClick={() => setEditStatus("funny")}
              size="sm"
             >
              <IconMoodSmile size={16} />
             </ActionIcon>
             <ActionIcon
              variant={editStatus === "neutral" ? "filled" : "light"}
              color="gray"
              onClick={() => setEditStatus("neutral")}
              size="sm"
             >
              <IconMoodNeutral size={16} />
             </ActionIcon>
             <ActionIcon
              variant={editStatus === "sad" ? "filled" : "light"}
              color="blue"
              onClick={() => setEditStatus("sad")}
              size="sm"
             >
              <IconMoodSad size={16} />
             </ActionIcon>
            </Group>
           </Group>

           <Group gap="xs">
            <ActionIcon
             color="green"
             variant="light"
             onClick={() => handleUpdate(quote.id)}
            >
             <IconCheck size={18} />
            </ActionIcon>
            <ActionIcon color="red" variant="light" onClick={cancelEditing}>
             <IconX size={18} />
            </ActionIcon>
           </Group>
          </Group>
         </Stack>
        ) : (
         <>
          <Flex justify="space-between" align="flex-start">
           <Blockquote
            cite={quote.page ? t("pageLabel", { page: quote.page }) : undefined}
            p={10}
            mt={5}
            style={{ flex: 1 }}
           >
            {quote.text}
           </Blockquote>
           <Box mt={10} ml={5}>
            <StatusIcon status={quote.status} size={20} />
           </Box>
          </Flex>

          <Flex justify="space-between" align="center" mt="xs">
           <Group gap="xs">
            <ActionIcon
             color="blue"
             variant="subtle"
             onClick={() => startEditing(quote)}
            >
             <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
             color="red"
             variant="subtle"
             onClick={() => handleOpenDeleteModal(quote.id)}
            >
             <IconTrash size={16} />
            </ActionIcon>
           </Group>

           <Text size="xs" c="dimmed">
            {new Date(quote.dateAdded).toLocaleDateString(
             i18n.language === "be" ? "be-BY" : i18n.language,
            )}
           </Text>
          </Flex>
         </>
        )}
       </Paper>
      ))
     ) : (
      <Text c="dimmed" ta="center" py="xl">
       {t("noQuotesYet")}
      </Text>
     )}

     <Flex justify="center" mt="md">
      <Button
       leftSection={<IconPlus size={18} />}
       onClick={handleSwitchOpenModal}
       maw={300}
       fullWidth
       radius="xl"
       variant="light"
      >
       {t("addQuoteTitle")}
      </Button>
     </Flex>
    </Stack>
   </ScrollArea>
  </Modal>
 );
}
