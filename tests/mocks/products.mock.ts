const addProduct = {
        
    "name": "renato de Thor",
    "price": "30 peças de ouro",
    "orderId": 4,
}

const addProductWithId = {
        id: 1,
        name: 'product name',
        price: "10",
        orderId: 4,
}

const productNotName = {
    "price": "30 peças de ouro",
    "orderId": 4,
}

const productNotPrice = {
    "name": "renato de Thor",
    "orderId": 4,
}

const productNotLengthName = {
    "name": "re",
    "price": "30 peças de ouro",
    "orderId": 4,
};

const productNotLengthPrice = {
    "name": "renato de Thor",
    "price": "30",
    "orderId": 4,
};

const products = [
    {
        "id": 1,
        "name": "Excalibur",
        "price": "10 peças de ouro",
        "orderId": 1
    },
    {
        "id": 2,
        "name": "Espada Justiceira",
        "price": "20 peças de ouro",
        "orderId": 1
    },
    {
        "id": 3,
        "name": "Lira de Orfeu",
        "price": "1 peça de ouro",
        "orderId": 2
    },
    {
        "id": 4,
        "name": "Armadura de Aquiles",
        "price": "1 peça de ouro",
        "orderId": 2
    },
    {
        "id": 5,
        "name": "Harpa de Dagda",
        "price": "15 peças de ouro",
        "orderId": 3
    },
    {
        "id": 6,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 7,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 8,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 9,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 10,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 11,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    },
    {
        "id": 12,
        "name": "renato de Thor",
        "price": "30 peças de ouro",
        "orderId": 4
    }
]

export default {
    addProduct,
    addProductWithId,
    products,
    productNotName,
    productNotPrice,
    productNotLengthName,
    productNotLengthPrice
}