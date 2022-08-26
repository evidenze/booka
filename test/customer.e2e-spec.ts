import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomersModule } from '../src/customers/customers.module';

describe('CustomersController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [CustomersModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (POST)', async () => {
        const data = {
            first_name: 'Essien',
            last_name: 'Ekanem',
            phone_number: '08989898760'
        }
        
        const response = await request(app.getHttpServer()).post('/customers').send({ data });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Customer created successfully');
    });
});
