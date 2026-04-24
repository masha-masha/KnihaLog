import { Modal, Text, Stack, Paper, ScrollArea, Blockquote } from '@mantine/core';
import { useTranslation } from 'react-i18next'; 
import type { Book } from '../types/book';

interface ViewQuotesModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
}

export function ViewQuotesModal({ opened, onClose, book }: ViewQuotesModalProps) {
  const { t, i18n } = useTranslation(); 
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={t('viewQuotesTitle', { title: book.title })} 
      size="lg" 
      centered
    >
      <ScrollArea h={400} offsetScrollbars>
        <Stack>
          {book.quotes.length > 0 ? (
            book.quotes.map((quote) => (
              <Paper key={quote.id} withBorder p="sm" radius="md" bg="gray.0">
                <Blockquote 
                  cite={quote.page ? t('pageLabel', { page: quote.page }) : undefined} 
                  p={10} 
                  mt={5}
                >
                  {quote.text}
                </Blockquote>
                <Text size="xs" c="dimmed" ta="right" mt="xs">
                  {new Date(quote.dateAdded).toLocaleDateString(
                    i18n.language === 'be' ? 'be-BY' : i18n.language
                  )}
                </Text>
              </Paper>
            ))
          ) : (
            <Text c="dimmed" ta="center" py="xl">
              {t('noQuotesYet')}
            </Text>
          )}
        </Stack>
      </ScrollArea>
    </Modal>
  );
}

