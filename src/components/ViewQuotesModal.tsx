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
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { Book, Quote } from "../types/book"; 
import { IconPlus, IconTrash, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
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

export function ViewQuotesModal({ opened, onClose, book, openAddQuote }: ViewQuotesModalProps) {
 const { t, i18n } = useTranslation();
 const dispatch = useAppDispatch();

 const [editingId, setEditingId] = useState<string | null>(null);
 const [editText, setEditText] = useState("");
 const [editPage, setEditPage] = useState("");

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
   dispatch(updateQuote({ 
    bookId: book.id, 
    quoteId, 
    text: editText, 
    page: editPage 
   }));
   cancelEditing();
  }
 };

 const handleOpenDeleteModal = (quoteId: string) =>
  modals.openConfirmModal({
   title: t("deleteQuoteTitle"),
   centered: true,
   children: <Text size="sm">{t("deleteConfirmText") || "Выдаліць гэту цытату?"}</Text>,
   labels: { confirm: t("confirm"), cancel: t("cancel") },
   confirmProps: { color: "red" },
   onConfirm: () => dispatch(deleteQuote({ bookId: book.id, quoteId })),
  });

 return (
  <Modal opened={opened} onClose={onClose} title={t("viewQuotesTitle", { title: book.title })} size="lg" centered>
   <ScrollArea h={400} offsetScrollbars>
    <Stack gap="md">
     {book.quotes.length > 0 ? (
      book.quotes.map((quote) => (
       <Paper key={quote.id} withBorder p="sm" radius="md" bg={editingId === quote.id ? "blue.0" : "gray.0"}>
        
        {editingId === quote.id ? (        
         <Stack gap="xs">
          <Textarea
           value={editText}
           onChange={(e) => setEditText(e.currentTarget.value)}
           minRows={2}
           autosize
          />
          <Group justify="space-between">
           <TextInput
            placeholder={t("pageLabel", { page: "" })}
            value={editPage}
            onChange={(e) => setEditPage(e.currentTarget.value)}
            size="xs"
            style={{ width: "100px" }}
           />
           <Group gap="xs">
            <ActionIcon color="green" variant="light" onClick={() => handleUpdate(quote.id)}>
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
          <Blockquote cite={quote.page ? t("pageLabel", { page: quote.page }) : undefined} p={10} mt={5}>
           {quote.text}
          </Blockquote>
          
          <Flex justify="space-between" align="center" mt="xs">
           <Group gap="xs">
            <ActionIcon color="blue" variant="subtle" onClick={() => startEditing(quote)}>
             <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon color="red" variant="subtle" onClick={() => handleOpenDeleteModal(quote.id)}>
             <IconTrash size={16} />
            </ActionIcon>
           </Group>
           
           <Text size="xs" c="dimmed">
            {new Date(quote.dateAdded).toLocaleDateString(i18n.language === "be" ? "be-BY" : i18n.language)}
           </Text>
          </Flex>
         </>
        )}
       </Paper>
      ))
     ) : (
      <Text c="dimmed" ta="center" py="xl">{t("noQuotesYet")}</Text>
     )}
     
     <Flex justify="center" mt="md">
      <Button leftSection={<IconPlus size={18} />} onClick={handleSwitchOpenModal} maw={300} fullWidth radius="xl" variant="light">
       {t("addQuoteTitle")}
      </Button>
     </Flex>
    </Stack>
   </ScrollArea>
  </Modal>
 );
}
