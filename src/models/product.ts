
export class Product {
    readonly name: string;
    readonly isOk: boolean;
    readonly listOfViolations: string[];
    readonly imageUrl: string;

    constructor (name: string, isOk: boolean, listOfViolations: string[], imageUrl: string) {
        this.name = name;
        this.isOk = isOk;
        this.listOfViolations = listOfViolations;
        this.imageUrl = imageUrl;
    }
}