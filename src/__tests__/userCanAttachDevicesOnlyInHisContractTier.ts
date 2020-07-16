import { Customer, checkIfUserIsAllowedToAddTheDevice } from '../Customer';
import { Device } from '../Device';

const silverCustomer: Customer = {
    id: 2,
    name: 'Test User 2',
    postcode: 'ME1 1FY',
    contractEndDate: '2021-05-01',
    contractTier: 'Silver',
};

const goldDevice: Device = {
    id: 1,
    name: 'iPad Pro',
    device_type: 'tablet',
    device_tier: 'Gold',
    is_active: false,
};

test("a user shouldn't be allowed to attach a device outside its contract tier", () => {
    expect(() => checkIfUserIsAllowedToAddTheDevice(silverCustomer, goldDevice)).toThrowError();
});
