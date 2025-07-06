const { handler } = require('./index');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const ctx = require('aws-lambda-mock-context');

describe('mal lambda function testing', () => {
    let mockAxios;
    const mockContext = ctx();

    beforeAll(() => {
        mockAxios = new MockAdapter(axios);
        process.env.MAL_CLIENT_ID = 'test-client-id';
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it('should return anime list for valid user', async () => {
        const mockData = {
            data: [
                {
                node: {
                    title: 'Attack on Titan',
                    main_picture: { medium: 'image_url' },
                    id: 1
                },
                list_status: {
                    score: 9,
                    status: 'completed',
                    num_episodes_watched: 25
                }
                }
            ]
        };

        mockAxios.onGet(/users\/.+\/animelist/).reply(200, { data: mockData });

        const event = {
            queryStringParameters: {
                user: 'testuser',
                limit: '1'
            }
        };

        const result = await handler(event, mockContext);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.anime.length).toBe(1);
        expect(body.anime[0].title).toBe('Attack on Titan');
    });

    it('should handle API errors', async () => {
        mockAxios.onGet(/users\/.+\/animelist/).reply(404, { error: 'Not found' });

        const event = {
            queryStringParameters: {
                user: 'invaliduser'
            }
        };

        const result = await handler(event, mockContext);
        expect(result.statusCode).toBe(404);
    });

    it('should require client ID', async () => {
        delete process.env.MAL_CLIENT_ID;
        const result = await handler({}, mockContext);
        expect(result.statusCode).toBe(500);
    });
});