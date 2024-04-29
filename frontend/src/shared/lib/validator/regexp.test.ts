import { describe, expect, it } from 'vitest';
import { isValidEmail } from '@/shared/lib/validator/regexp';

describe('Тестирование регулярных выражений', () => {
    describe('Тестирование email', () => {
        it('Должен возвращать false при невеладном email ', () => {
            expect(isValidEmail('asd')).toBe(false);
            expect(isValidEmail('asd@')).toBe(false);
            expect(isValidEmail('.ru')).toBe(false);
        });

        it('Должен возвращать true валадном email', () => {
            expect(isValidEmail('asd@mail.ru')).toBe(true);
            expect(isValidEmail('asd@asd.asd')).toBe(true);
        });

        it('Должен возвращать false при пустой строке', () => {
            expect(isValidEmail('')).toBe(false);
        });
    });
});
