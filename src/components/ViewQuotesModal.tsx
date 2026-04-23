import { Modal, Text, Stack, Paper, ScrollArea, Blockquote } from '@mantine/core';
import type { Book } from '../types/book';


interface ViewQuotesModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
}

export function ViewQuotesModal({ opened, onClose, book }: ViewQuotesModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={`Цытаты з кнігі «${book.title}»`} size="lg" centered>
      <ScrollArea h={400} offsetScrollbars>
        <Stack>
          {book.quotes.length > 0 ? (
            book.quotes.map((quote) => (
              <Paper key={quote.id} withBorder p="sm" radius="md" bg="gray.0">
                <Blockquote cite={quote.page ? `Старонка: ${quote.page}` : undefined} p={10} mt={5}>
                  {quote.text}
                </Blockquote>
                <Text size="xs" c="dimmed" ta="right" mt="xs">
                  {new Date(quote.dateAdded).toLocaleDateString('be-BY')}
                </Text>
              </Paper>
            ))
          ) : (
            <Text c="dimmed" ta="center" py="xl">Цытат пакуль няма.</Text>
          )}
        </Stack>
      </ScrollArea>
    </Modal>
  );
}