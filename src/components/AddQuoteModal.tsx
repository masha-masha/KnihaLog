import { Modal, Textarea, TextInput, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addQuote } from '../store/bookSlice';

interface AddQuoteModalProps {
  opened: boolean;
  onClose: () => void;
  bookId: string;
}

export const AddQuoteModal = ({ opened, onClose, bookId }: AddQuoteModalProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [page, setPage] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      dispatch(addQuote({ bookId, text, page }));
      setText('');
      setPage('');
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Дадаць цытату" centered>
      <Stack>
        <Textarea
          label="Тэкст цытаты"
          placeholder="Напішыце тое, што вас зачапіла..."
          minRows={3}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Старонка"
          placeholder="Напрыклад, 142"
          value={page}
          onChange={(e) => setPage(e.currentTarget.value)}
        />
        <Button onClick={handleSave} fullWidth>Захаваць</Button>
      </Stack>
    </Modal>
  );
}