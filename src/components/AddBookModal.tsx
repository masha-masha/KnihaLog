import { Modal, TextInput, Button, Stack, Select, Rating, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addBook } from '../store/bookSlice';
import type { BookStatus } from '../types/book';

interface AddBookModalProps {
  opened: boolean;
  onClose: () => void;
}

export function AddBookModal({ opened, onClose }: AddBookModalProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<BookStatus>('planned');
  const [rating, setRating] = useState(0);
  const [language, setLanguage] = useState('be');

  const handleSave = () => {
    if (title && author) {
      dispatch(addBook({
        title,
        author,
        status,
        rating,
        language,
        notes: ''
      }));
      onClose();
      setTitle(''); setAuthor(''); setRating(0);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Дадаць новую кнігу" centered>
      <Stack>
        <TextInput label="Назва кнігі" placeholder="Напрыклад, Каласы пад сярпом тваім" required value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <TextInput label="Аўтар" placeholder="Уладзімір Караткевіч" required value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
        
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

        <Button onClick={handleSave} fullWidth mt="md">Захаваць у дзённік</Button>
      </Stack>
    </Modal>
  );
}