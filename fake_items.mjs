import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";

class Item {
    constructor(image, title, description, price, views, category, rating,) {
        this.image = image;
        this.title = title;
        this.description = description;
        this.price = price;
        this.views = views;
        this.category = category;
        this.rating = rating;
    }
}

const items = []

for (let i = 0; i < 101; i++) {
    const item = new Item(
        faker.image.business(),
        faker.word.noun({ length: { min: 5 } }),
        faker.lorem.lines(),
        +faker.finance.amount(1, 1000, 0),
        0,
        faker.helpers.arrayElement(["appliances", "laptops", "Phones", "Men's Clothing", "Women's Clothing"]),
        +faker.finance.amount(0, 5, 0)
    );
    items.push(item)
}

const jsonItems = JSON.stringify(items)

await writeFile("./items.json", jsonItems)