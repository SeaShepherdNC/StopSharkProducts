export class Product {
    readonly isbn: string
    readonly name: string;
    readonly exist: boolean;
    readonly isOk: boolean;
    readonly listOfViolations: string[];
    readonly imageUrl: string;

    constructor(isbn: string, name: string, exist: boolean, isOk: boolean, listOfViolations: string[], imageUrl: string) {
        this.isbn = isbn;
        this.name = name;
        this.exist = exist;
        this.isOk = isOk;
        this.listOfViolations = listOfViolations;
        this.imageUrl = imageUrl;
    }
}
