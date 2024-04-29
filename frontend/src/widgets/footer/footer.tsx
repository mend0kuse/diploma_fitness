import { Container, Group, ActionIcon, rem } from '@mantine/core';
import classes from './footer.module.css';
import { AiFillInstagram, AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';

export const Footer = () => (
    <div className={classes.footer}>
        <Container className={classes.inner}>
            <svg width='136' height='61' viewBox='0 0 136 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M3 9.18H11.52V23.1C12.84 15.3 15.54 8.28 24.9 8.28C33.78 8.28 41.4 11.58 41.4 22.02C41.4 30.36 36.84 34.08 30.84 35.64L41.16 50.94H31.44L21.66 36.54H11.52V51H3V9.18ZM13.86 17.94C11.28 27.24 11.52 35.52 11.52 35.52H20.22C25.98 35.52 32.7 34.68 32.7 22.02C32.7 14.22 32.34 8.52 23.4 9.36C19.68 9.66 15.48 12.06 13.86 17.94Z'
                    fill='#3C38FF'
                />
                <path d='M50 51V9.18H82.94V10.2H58.52V28.62H77.6V29.7H58.52V49.98H82.94V51H50Z' fill='#3C38FF' />
                <path
                    d='M90.8 51L105.2 9.18H114.26L130.46 51H121.52L114.86 33.9H97.76L91.88 51H90.8ZM105.8 10.5L98.12 32.88H114.5L105.8 10.5Z'
                    fill='#3C38FF'
                />
            </svg>
            <Group gap={0} className={classes.links} justify='flex-end' wrap='nowrap'>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillTwitterSquare style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillFacebook style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillInstagram style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
            </Group>
        </Container>
    </div>
);
