import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import cx from 'clsx';
import classes from './theme-icon.module.css';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';

export const ThemeSwitcher = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            aria-label='Toggle color scheme'
        >
            <IoSunny className={cx(classes.icon, classes.light)} />
            <FaMoon className={cx(classes.icon, classes.dark)} />
        </ActionIcon>
    );
};
