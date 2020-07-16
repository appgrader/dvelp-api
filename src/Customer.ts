import db from './db';
import { Device } from './Device';

export interface Customer {
    id: number;
    name: string;
    postcode: string;
    contractEndDate: string;
    contractTier: string;
}

export async function addDevice(cutomerId: number, deviceId: number) {
    //TODO: get user and device form DB
    //TODO: check if user is allowed to add the device

    await db('customer_devices').insert({ customer_id: cutomerId, device_id: deviceId });
    await db('devices').where({ id: deviceId }).update({ is_active: true });
}

export function checkIfUserIsAllowedToAddTheDevice(customer: Customer, device: Device) {
    const customerTier: string = customer.contractTier;
    const deviceTier: string = device.device_tier;

    if (customerTier !== deviceTier) {
        throw new Error('You are not allowed to add this product in this tier');
    }

    return true;
}
