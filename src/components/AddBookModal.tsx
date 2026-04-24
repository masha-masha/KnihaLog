import { Modal, TextInput, Button, Stack, Select, Rating, Text } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import { useAppDispatch } from '../store/hooks';
import { addBook } from '../store/bookSlice';
import type { BookStatus } from '../types/book';

interface AddBookModalProps {
  opened: boolean;
  onClose: () => void;
}

export function AddBookModal({ opened, onClose }: AddBookModalProps) {
  const { t } = useTranslation(); 
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
      setTitle(''); 
      setAuthor(''); 
      setRating(0);
    }
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={t('addBook')} 
      centered
    >
      <Stack>
        <TextInput 
          label={t('bookTitleLabel')} 
          placeholder={t('bookTitlePlaceholder')} 
          required 
          value={title} 
          onChange={(e) => setTitle(e.currentTarget.value)} 
        />
        
        <TextInput 
          label={t('authorLabel')} 
          placeholder={t('authorPlaceholder')} 
          required 
          value={author} 
          onChange={(e) => setAuthor(e.currentTarget.value)} 
        />
        
        <Select 
          label={t('statusLabel')} 
          data={[
            { value: 'planned', label: t('filterPlanned') },
            { value: 'reading', label: t('filterReading') },
            { value: 'finished', label: t('filterFinished') },
          ]}
          value={status}
          onChange={(val) => setStatus(val as BookStatus)}
        />

        <Select 
          label={t('languageLabel')} 
          data={[
            { value: 'be', label: t('langBe') },
            { value: 'en', label: t('langEn') },
            { value: 'ru', label: t('langRu') },
          ]}
          value={language}
          onChange={(val) => setLanguage(val || 'be')}
        />

        <Stack gap={5}>
          <Text size="sm" fw={500}>{t('ratingLabel')}</Text>
          <Rating value={rating} onChange={setRating} size="lg" />
        </Stack>

        <Button onClick={handleSave} fullWidth mt="md">
          {t('saveBtn')}
        </Button>
      </Stack>
    </Modal>
  );
}