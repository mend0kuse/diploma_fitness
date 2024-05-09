import { rem, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

type NavbarLinkProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: FC<any>;
    label: string;
    route?: string;
    active?: boolean;
    onClick?(): void;
};

export const NavbarLink = ({ icon: Icon, label, route, active, onClick }: NavbarLinkProps) => (
    <Tooltip zIndex={9999999} label={label} position='right' transitionProps={{ duration: 0 }}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <UnstyledButton
            onClick={onClick}
            className={classes.link}
            data-active={active || undefined}
            {...(route
                ? {
                      component: Link,
                      to: route,
                  }
                : {})}
        >
            <Icon style={{ width: rem(20), height: rem(20) }} />
        </UnstyledButton>
    </Tooltip>
);
