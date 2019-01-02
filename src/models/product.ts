export class Product {
    readonly name: string;
    readonly exist: boolean;
    readonly isOk: boolean;
    readonly listOfViolations: string[];
    readonly imageUrl: string;

    constructor(name: string, exist: boolean, isOk: boolean, listOfViolations: string[], imageUrl: string) {
        this.name = name;
        this.exist = exist;
        this.isOk = isOk;
        this.listOfViolations = listOfViolations;
        this.imageUrl = imageUrl;
    }
}
