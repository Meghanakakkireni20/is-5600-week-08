// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {

  let createdProduct;
  let createdOrder;

  // Populate the database with dummy data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Task 1: Add "get" test to orders
  describe('get', () => {
    it('should get an order by id', async () => {
      // First ensure we have a created order to work with
      expect(createdOrder).toBeDefined();

      // Get the order by its ID
      const order = await get(createdOrder._id);

      // Assertions
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
      expect(order.buyerEmail).toBe(createdOrder.buyerEmail);
    });
  });

  // Task 2: Add "edit" test to orders
  describe('edit', () => {
    it('should edit an order', async () => {
      // First ensure we have a created order to work with
      expect(createdOrder).toBeDefined();

      // Define changes to make to the order
      const change = { 
        status: 'COMPLETED',
        buyerEmail: 'updated.email@example.com'
      };

      // Edit the order
      const editedOrder = await edit(createdOrder._id, change);

      // Assertions
      expect(editedOrder).toBeDefined();
      expect(editedOrder._id).toBe(createdOrder._id);
      expect(editedOrder.status).toBe(change.status);
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });
});