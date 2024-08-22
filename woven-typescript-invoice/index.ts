interface User {
    id: number;
    name: string;
    activatedOn: Date;
    deactivatedOn: null | Date;
    customerId: number;
}

interface Subscription {
    id: number;
    customerId: number;
    priceInCents: number;
}

function getBillForUser(monthYear: string, user: User, subscription: Subscription): number {
    if (user.customerId !== subscription.customerId) return 0;

    const startDateOfMonth = new Date(`${monthYear}-01`);
    const endDateOfMonth = getLastDayOfMonth(startDateOfMonth);

    if (user.deactivatedOn && user.deactivatedOn < new Date(startDateOfMonth)) return 0;

    let startDate = 1;
    let endDate = new Date(endDateOfMonth).getDate();

    if (user.activatedOn > startDateOfMonth) startDate = user.activatedOn.getDate();
    if (user.deactivatedOn && user.deactivatedOn < endDateOfMonth) endDate = user.deactivatedOn.getDate()

    const billingDay = endDate - startDate + 1;

    return Math.floor(subscription.priceInCents * billingDay / endDateOfMonth.getDate());
}


function getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 2, 0)
}

const user: User = {
    id: 0,
    name: 'test',
    activatedOn: new Date(),
    deactivatedOn: null,
    customerId: 1
}

const user1: User = {
    id: 1,
    name: 'test1',
    activatedOn: new Date('2024-04-01'),
    deactivatedOn: new Date(),
    customerId: 1
}

const subscription: Subscription = {
    id: 0,
    customerId: 1,
    priceInCents: 100
}

console.log(getBillForUser('2024-09', user, subscription));
console.log(getBillForUser('2024-08', user1, subscription));