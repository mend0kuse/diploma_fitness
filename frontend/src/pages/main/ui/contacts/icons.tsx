import { Text, ThemeIcon, Stack, rem } from '@mantine/core';
import classes from './icons.module.css';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaAddressCard, FaClock, FaMapPin, FaPhone } from 'react-icons/fa';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: typeof FaMapPin;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <ThemeIcon size={40} radius='md' className={classes.icon}>
                <Icon style={{ width: rem(24), height: rem(24) }} />
            </ThemeIcon>

            <div>
                <Text size='xs' className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const CONTACT_ITEMS = [
    { title: 'Почта', description: 'rea@mail.ru', icon: MdEmail },
    { title: 'Телефон', description: '+49 (800) 335 35 35', icon: FaPhone },
    { title: 'Адрес', description: 'Ленина 5а', icon: FaAddressCard },
    { title: 'Рабочий график', description: '8:00 - 17:00', icon: FaClock },
];

export const ContactIconsList = () => {
    const items = CONTACT_ITEMS.map((item, index) => <ContactIcon key={index} {...item} />);
    return <Stack>{items}</Stack>;
};
