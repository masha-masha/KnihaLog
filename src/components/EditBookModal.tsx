import { Modal, TextInput, Button, Stack, Select, Rating, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateBook } from '../store/bookSlice';
import type { Book, BookStatus } from '../types/book';

interface EditBookModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
}

export function EditBookModal({ opened, onClose, book }: EditBookModalProps) {
  const dispatch = useAppDispatch();
  
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [status, setStatus] = useState<BookStatus>(book.status);
  const [rating, setRating] = useState(book.rating);
  const [language, setLanguage] = useState(book.language);

  const handleUpdate = () => {
    dispatch(updateBook({
      ...book, 
      title,
      author,
      status,
      rating,
      language,
    }));
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Рэдагаваць кнігу" centered>
      <Stack>
        <TextInput label="Назва кнігі" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextInput label="Аўтар" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
        <Select 
          label="Статус" 
          data={[
            { value: 'planned', label: 'Хачу прачытаць' },
            { value: 'reading', label: 'Чытаю зараз' },
            { value: 'finished', label: 'Прачытана' },
          ]}
          value={status}
          onChange={(val) => setStatus(val as BookStatus)}
        />
         <Select 
          label="Мова" 
          data={[
            { value: 'be', label: 'Беларуская' },
            { value: 'en', label: 'English' },
            { value: 'ru', label: 'Русский' },
          ]}
          value={language}
          onChange={(val) => setLanguage(val || 'be')}
        />
        <Stack gap={5}>
          <Text size="sm" fw={500}>Твая адзенка</Text>
          <Rating value={rating} onChange={setRating} size="lg" />
        </Stack>
        <Button onClick={handleUpdate} fullWidth mt="md" color="yellow">Захаваць змены</Button>
      </Stack>
    </Modal>
  );
}