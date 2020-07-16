import Router from 'koa-router';
import { orderBy, flatten } from 'lodash';
import db from './db';
import { addDevice } from './Customer';
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = { test: 'Hello World!' };
});

router.get('/customers', async (ctx) => {
    const customers = await db('customers');
    ctx.body = orderBy(customers, ['id'], ['desc']);
});

router.post('/customers', async (ctx) => {
    const body = ctx.request.body;
    await db('customers').insert({ ...body });

    ctx.body = { body };
});

router.put('/customers/:id', async (ctx) => {
    const id = Number(ctx.params.id);
    const body = ctx.request.body;

    await db('customers')
        .where({ id })
        .update({ ...body });

    const customer = await db('customers').where({ id }).first();

    ctx.body = { updated: customer };
});

router.post('/customers/:id/device', async (ctx) => {
    const customer_id = Number(ctx.params.id);
    const { deviceId } = ctx.request.body;

    try {
        addDevice(customer_id, deviceId);
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: true,
            message: 'Something went wrong! Check your input',
        };
        return;
    }

    ctx.body = { error: false, mesasge: 'Device was added' };
});

router.get('/customers/:id', async (ctx) => {
    const id = Number(ctx.params.id);
    const customer = await db('customers').where({ id }).first();
    const customerDevices = await db('customer_devices').where({ customer_id: id });
    const devices = await Promise.all(customerDevices.map((device) => db('devices').where({ id: device.device_id })));
    ctx.body = { ...customer, devices: flatten(devices) };
});

router.delete('/customers/:id', async (ctx) => {
    const id = Number(ctx.params.id);

    //Delete customer
    await db('customers').where({ id }).del();

    //Delete devices from pivot table
    const devicesObj = db('customer_devices').where({ customer_id: id });
    const devices = await devicesObj;

    //Detach devices
    await Promise.all(
        devices.map((device) => {
            db('devices')
                .where({ id: device.device_id })
                .update({ is_active: false })
                .catch((err) => console.error(err));
        }),
    );

    await devicesObj.del();

    ctx.body = {
        error: false,
        message: 'Cusomter deleted',
    };
});

router.get('/devices', async (ctx) => {
    const devices = await db('devices');
    ctx.body = { devices };
});

router.post('/devices', async (ctx) => {
    const body = ctx.request.body;
    await db('devices').insert({ ...body });
    ctx.body = { body };
});

router.put('/devices', async (ctx) => {
    const id = Number(ctx.params.id);
    const body = ctx.request.body;

    await db('devices')
        .where({ id })
        .update({ ...body });

    const device = await db('customer_devices').where({ id }).first();

    ctx.body = { updated: device };
});

router.get('/devices/active', async (ctx) => {
    const activeDevices = await db('devices').where({ is_active: true });
    ctx.body = { activeDevices };
});

router.get('/devices/unprovisioned', async (ctx) => {
    const unprovisionedDevices = await db('devices').where({ is_active: false });
    ctx.body = { unprovisionedDevices };
});

export const routes = router.routes();
