import { Container, Group, Text, Anchor, Divider, Stack, Flex } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {


 return (
  <Container w="100%" mt="xl" pb="md">
   <Divider mb="sm"/>
   <Flex justify="space-between">
    <Group justify="space-between">
     <Text size="sm" c="dimmed">
      © {new Date().getFullYear()} — Аўтар: Маша.Б
     </Text>
    </Group>
     <Group gap="xs">
      <Anchor
       href="#"
       target="_blank"
       c="dimmed"
       size="sm"
       display="flex"
       style={{ alignItems: "center", gap: "4px" }}
      >
       <IconBrandGithub size={16} />
       Зыходны код
      </Anchor>
     </Group>
   </Flex>
  </Container>
 );
}