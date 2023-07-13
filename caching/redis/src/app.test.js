const request = require("supertest");
const app = require('./app');



async function getResponseTime(requestApp) {
    const start = Date.now();
    const response = await requestApp.get('/').set('Accept', 'application/json');
    console.log(response.body)
    expect(response.body.hello).toBe(true);
    const finish = Date.now();
    return finish - start;
}

it('retrieves latest and then cached data', async () => {
    jest.setTimeout(10000);
    const requestApp = request(app);

    const uncachedTime = await getResponseTime(requestApp);
    expect(uncachedTime).toBeGreaterThan(3000); // 3 sec response

    const cachedTime = await getResponseTime(requestApp);
    expect(cachedTime).toBeLessThan(300); // 300 msec response
});