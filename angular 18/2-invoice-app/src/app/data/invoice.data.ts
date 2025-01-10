import { Invoice } from "../models/invoice";

export const invoiceData: Invoice = {
    id: 1,
    name: 'PC Gamer',
    client: {
        name: 'Juan Perez',
        lastName: 'Gonzalez',
        address: {
            country: 'Colombia',
            city: 'Bogotá',
            street: 'Street 1',
            number: 15,
        }
    },
    company: {
        name: 'Tech Solutions',
        fiscalNumber: 31234567890,
    },
    items: [
        {
            id: 1,
            product: 'Processor Intel Core i5-12600K',
            price: 250,
            quantity: 1,
        },
        {
            id: 2,
            product: 'Memory RAM DDR4 16GB',
            price: 100,
            quantity: 2,
        },
        {
            id: 3,
            product: 'Graphics Card NVIDIA GeForce RTX 3060',
            price: 150,
            quantity: 1,
        },
    ],
    total: 0,
}