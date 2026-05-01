import {
 Modal,
 Textarea,
 TextInput,
 Button,
 Stack,
 Group,
 ActionIcon,
 Input,
 Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/hooks";
import { addQuote } from "../store/bookSlice";
import {
 IconMoodSmile,
 IconMoodSad,
 IconMoodNeutral,
} from "@tabler/icons-react";

interface AddQuoteModalProps {
 opened: boolean;
 onClose: () => void;
 bookId: string;
}

export const AddQuoteModal = ({
 opened,
 onClose,
 bookId,
}: AddQuoteModalProps) => {
 const { t } = useTranslation();
 const dispatch = useAppDispatch();

 const [text, setText] = useState("");
 const [page, setPage] = useState("");
 // Дадаем стэйт для статусу (настрою)
 const [status, setStatus] = useState<"funny" | "sad" | "neutral">("neutral");

 const handleSave = () => {
  if (text.trim()) {
   // Цяпер перадаем і статус у экшн
   dispatch(
    addQuote({
     bookId,
     text,
     page,
     status, // Дадалі статус
    } as any),
   ); // as any часова, пакуль не абноўлены тыпы ў slice

   // Скідваем палі пасля захавання
   setText("");
   setPage("");
   setStatus("neutral");
   onClose();
  }
 };

 return (
  <Modal opened={opened} onClose={onClose} title={t("addQuoteTitle")} centered>
   <Stack>
    <Textarea
     label={t("quoteTextLabel")}
     placeholder={t("quoteTextPlaceholder")}
     minRows={3}
     value={text}
     onChange={(e) => setText(e.currentTarget.value)}
     required
    />

    <TextInput
     label={t("quotePageLabel")}
     placeholder={t("quotePagePlaceholder")}
     value={page}
     onChange={(e) => setPage(e.currentTarget.value)}
    />

    {/* Секцыя выбару настрою */}
    <Input.Wrapper label={t("quoteStatusLabel") || "Настрой цытаты"}>
     <Group gap="sm" mt={5}>
      <Tooltip label={t("moodFunny") || "Вясёлая"}>
       <ActionIcon
        size="lg"
        variant={status === "funny" ? "filled" : "light"}
        color="orange"
        onClick={() => setStatus("funny")}
       >
        <IconMoodSmile size={24} />
       </ActionIcon>
      </Tooltip>

      <Tooltip label={t("moodNeutral") || "Няма настрою"}>
       <ActionIcon
        size="lg"
        variant={status === "neutral" ? "filled" : "light"}
        color="gray"
        onClick={() => setStatus("neutral")}
       >
        <IconMoodNeutral size={24} />
       </ActionIcon>
      </Tooltip>

      <Tooltip label={t("moodSad") || "Сумная"}>
       <ActionIcon
        size="lg"
        variant={status === "sad" ? "filled" : "light"}
        color="blue"
        onClick={() => setStatus("sad")}
       >
        <IconMoodSad size={24} />
       </ActionIcon>
      </Tooltip>
     </Group>
    </Input.Wrapper>

    <Button onClick={handleSave} fullWidth mt="md">
     {t("saveQuoteBtn")}
    </Button>
   </Stack>
  </Modal>
 );
};
