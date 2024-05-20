import { excludeFields } from './excludeFields';

interface TestObject {
    id: number;
    name: string;
    age: number;
    email: string;
}

describe('excludeFields', () => {
    it('Должен удалять указанные ключи', () => {
        const obj: TestObject = {
            id: 1,
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };

        const keysToExclude: Array<keyof TestObject> = ['age', 'email'];

        const result = excludeFields(obj, keysToExclude);

        const expected = {
            id: 1,
            name: 'John Doe',
        };

        expect(result).toEqual(expected);
    });

    it('Должен вернуть тот же объект, если ключи не были переданы', () => {
        const obj: TestObject = {
            id: 1,
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };

        const keysToExclude: Array<keyof TestObject> = [];

        const result = excludeFields(obj, keysToExclude);

        expect(result).toEqual(obj);
    });

    it('Должен корректно обрабатывать передачу несуществующих ключей', () => {
        const obj: TestObject = {
            id: 1,
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };

        const keysToExclude: Array<keyof TestObject> = ['nonExistentKey' as keyof TestObject];

        const result = excludeFields(obj, keysToExclude);

        expect(result).toEqual(obj);
    });

    it('Должен удалять все ключи', () => {
        const obj: TestObject = {
            id: 1,
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        };

        const keysToExclude: Array<keyof TestObject> = ['id', 'name', 'age', 'email'];

        const result = excludeFields(obj, keysToExclude);

        const expected = {};

        expect(result).toEqual(expected);
    });

    it('Должен корректно отрабатывать при пустом объекте', () => {
        const obj: Record<string, string> = {};
        const keysToExclude: Array<string> = ['id', 'name'];

        const result = excludeFields(obj, keysToExclude);

        expect(result).toEqual({});
    });
});
