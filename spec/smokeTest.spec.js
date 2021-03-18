import supertest from 'supertest';
import { start } from '../src/express';

const request = supertest(start("test"));

describe("Jest Smoke Test", () => {
  it("expects 1 to be 1 as expected", () => {
    expect(1).toBe(1);
  });
});

describe("Smoke test", () => {
  test("It should see smoke where there is fire...", async done => {
    const res = await request.get("/api/smokeTest");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Smoke test');
    done();
  });
});

