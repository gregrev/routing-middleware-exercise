process.env.NODE_ENV = 'test';

const request = require("supertest");
const app = require("./app");
let shoppingItems = require("./fakeDb");

let foodItems = {
    name: "cheeseburger",
    price: 8.00,
};

beforeEach(function() {
    shoppingItems.push(foodItems);
});

afterEach(function() {
    shoppingItems.length = 0;
});


// TEST FOR GETTING ALL ITEMS
describe("GET /items", () => {
    test('get all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ shoppingItems: [foodItems] });
    });
});

// TEST GETTING ITEMS BY NAME
describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${foodItems.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(foodItems);
    });
    test("Responds with 404 for an invalid item name", async () => {
        const res = await request(app).get(`/items/icecube`);
        expect(res.statusCode).toBe(404);
    });
});

// TEST POSTING A NEW ITEM
describe('POST /items', () => {
    test('Posting a new item', async () => {
        const res = await request(app).post(`/items`).send({
            name: 'Cheetos',
            price: 1.00
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            added: {
                name: 'Cheetos',
                price: 1.00
            }
        });
    });
});

// TEST PATCHING AN ITEM
describe('PATCH /items/:name', () => {
    test('Updating an item', async () => {
        const res = await request(app).patch(`/items/${foodItems.name}`).send({
            name: "hotdog",
            price: 3.00
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {
                name: 'hotdog',
                price: 3.00
            }
        });
    });
});

// TEST DELETING AN ITEM

describe('DELETE /items/:name', () => {
    test('Deleting an item', async () => {
        const res = await request(app).delete(`/items/${foodItems.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted' })
    })
})