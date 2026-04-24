import { Modal, TextInput, Button, Stack, Select, Rating, Text } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import { useAppDispatch } from '../store/hooks';
import { updateBook } from '../store/bookSlice';
import type { Book, BookStatus } from '../types/book';

interface EditBookModalProps {
  opened: boolean;
  onClose: () => void;
  book: Book;
}

export function EditBookModal({ opened, onClose, book }: EditBookModalProps) {
  const { t } = useTranslation(); 
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
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={t('editBookTitle')} 
      centered
    >
      <Stack>
        <TextInput 
          label={t('bookTitleLabel')} 
          value={title} 
          onChange={(e) => setTitle(e.currentTarget.value)} 
        />
        <TextInput 
          label={t('authorLabel')} 
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
        <Button 
          onClick={handleUpdate} 
          fullWidth 
          mt="md" 
          color="yellow"
        >
          {t('saveChangesBtn')}
        </Button>
      </Stack>
    </Modal>
  );
}

