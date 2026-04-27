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
 return (
  <Modal
   opened={opened}
   onClose={onClose}
   title={t("viewQuotesTitle", { title: book.title })}
   size="lg"
   centered
  >
   <ScrollArea h={400} offsetScrollbars>
    <Stack>
     {book.quotes.length > 0 ? (
      book.quotes.map((quote) => (
       <Paper key={quote.id} withBorder p="sm" radius="md" bg="gray.0">
        <Blockquote
         cite={quote.page ? t("pageLabel", { page: quote.page }) : undefined}
         p={10}
         mt={5}
        >
         {quote.text}
        </Blockquote>
        <Text size="xs" c="dimmed" ta="right" mt="xs">
         {new Date(quote.dateAdded).toLocaleDateString(
          i18n.language === "be" ? "be-BY" : i18n.language,
         )}
        </Text>
        <Flex justify="flex-end">
         <ActionIcon
          color="red"
          variant="subtle"
          onClick={() =>
           dispatch(deleteQuote({ bookId: book.id, quoteId: quote.id }))
          }
         >
          <IconTrash size={16} />
         </ActionIcon>
        </Flex>
       </Paper>
      ))
     ) : (
      <Flex justify="center" direction="column">
       <Text c="dimmed" ta="center" py="xl">
        {t("noQuotesYet")}
       </Text>
      </Flex>
     )}
     <Flex justify="center" mt="md">
      <Button
       leftSection={<IconPlus size={18} />}
       onClick={handleSwitchOpenModal}
       maw="400px"
       fullWidth
       radius="lg"
       variant="light"
      >
       {t("addQuote")}
      </Button>
     </Flex>
    </Stack>
   </ScrollArea>
  </Modal>
 );
}
