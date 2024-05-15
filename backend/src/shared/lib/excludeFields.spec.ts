import { excludeFields } from './excludeFields';

interface TestObject {
    id: number;
    name: string;
    age: number;
    email: string;
}

describe('excludeFields', () => {
    it('should exclude specified fields', () => {
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

    it('should return the same object if no keys are excluded', () => {
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

    it('should handle excluding non-existent keys gracefully', () => {
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

    it('should handle excluding all keys', () => {
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

    it('should handle empty objects', () => {
        const obj: Record<string, string> = {};
        const keysToExclude: Array<string> = ['id', 'name'];

        const result = excludeFields(obj, keysToExclude);

        expect(result).toEqual({});
    });
});
