import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === 'light' ? (
        <MoonIcon width={20} />
      ) : (
        <SunIcon width={20}/>
      )}
    </ActionIcon>
  );
}