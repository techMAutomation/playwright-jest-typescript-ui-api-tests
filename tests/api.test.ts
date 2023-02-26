import { APIRequestContext, request } from '@playwright/test';
import * as env from '../env.json';

describe('API Tests', () => {

    let context: APIRequestContext;
    
    beforeAll( async() =>{
        context = await request.newContext();
    })

    it('Get Users list', async() => {
        const response = await context.get(`${env.apiURL}/users`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        let res = await response.json();
        console.log('GET Users list response :: ' + JSON.stringify(res));
        if (res != null) {
            expect(res[1].name).not.toBeNull;
            console.log(' username  :: ' +  res[1].name);
        }
    });

    it('GET User Not Found message', async() => {
        const response = await context.get(`${env.apiURL}/users/692`);
        expect(response.status()).toBe(404);
        let res = await response.json();
        console.log('GET Users list response :: ' + JSON.stringify(res));
        if (res == null) {
            expect(res.message).toBe('Resource not found');
        } 
    });

});
