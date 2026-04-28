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
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import type { Book } from "../types/book";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useAppDispatch } from "../store/hooks";
import { deleteQuote } from "../store/bookSlice";
import { modals } from "@mantine/modals";

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

 const handleSwitchOpenModal = () => {
  onClose();
  setTimeout(() => {
   openAddQuote();
  }, 200);
 };

 const handleOpenDeleteModal = (quoteId: string) =>
  modals.openConfirmModal({
   title: t("deleteQuoteTitle") || "Выдаліць цытату?", 
   centered: true,
   children: (
    <Text size="sm">
     {t('deleteQuoteText')}
    </Text>
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
       <Paper key={quote.id} withBorder p="sm" radius="md" bg="gray.0" style={{ position: 'relative' }}>
        <Blockquote
         cite={quote.page ? t("pageLabel", { page: quote.page }) : undefined}
         p={10}
         mt={5}
        >
         {quote.text}
        </Blockquote>
        
        <Flex justify="space-between" align="center" mt="xs">
         <ActionIcon
          color="red"
          variant="subtle"
          onClick={() => handleOpenDeleteModal(quote.id)} 
         >
          <IconTrash size={16} />
         </ActionIcon>
         
         <Text size="xs" c="dimmed">
          {new Date(quote.dateAdded).toLocaleDateString(
           i18n.language === "be" ? "be-BY" : i18n.language,
          )}
         </Text>
        </Flex>
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
