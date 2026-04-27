import { Container, Group, Text, Anchor, Divider, Flex } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"; 

export function Footer() {

  const { t } = useTranslation(); 

 return (
  <Container w="100%" mt="xl" pb="md">
   <Divider mb="sm" />
   <Flex justify="space-between">
    <Group justify="space-between">
     <Text size="sm" c="dimmed">
      © {new Date().getFullYear()} — {t("author")}
     </Text>
    </Group>
    <Group gap="xs">
     <Anchor
      href="https://github.com/masha-masha/KnihaLog"
      target="_blank"
      c="dimmed"
      size="sm"
      display="flex"
      style={{ alignItems: "center", gap: "4px" }}
     >
      <IconBrandGithub size={16} />
      {t("source")}
     </Anchor>
    </Group>
   </Flex>
  </Container>
 );
}
