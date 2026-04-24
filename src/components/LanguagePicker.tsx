import { Menu, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

export function LanguagePicker() {
 const { i18n } = useTranslation();

 const languages = [
  { label: "BE", value: "be" },
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
 ];

 return (
  <Menu shadow="md" width={100}>
   <Menu.Target>
    <Button variant="subtle" size="sm">
     {i18n.language.toUpperCase()}
    </Button>
   </Menu.Target>

   <Menu.Dropdown>
    {languages.map((lang) => (
     <Menu.Item
      key={lang.value}
      onClick={() => i18n.changeLanguage(lang.value)}
     >
      {lang.label}
     </Menu.Item>
    ))}
   </Menu.Dropdown>
  </Menu>
 );
}