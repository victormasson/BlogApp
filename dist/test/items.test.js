"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = require("./items");
describe('Items', () => {
    it('should return the first item', () => {
        expect(items_1.default.getFirstItem()).toBe('First item');
    });
});
describe('Items2', () => {
    it('should return the first item', () => {
        expect(items_1.default.getFirstItem()).toBe('First item');
    });
});
