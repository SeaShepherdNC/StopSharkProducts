
export class Product {
    readonly name: string;
    readonly isOk: boolean;
    readonly listOfViolations: string[];

    constructor (name: string, isOk: boolean, listOfViolations: string[]) {
        this.name = name;
        this.isOk = isOk;
        this.listOfViolations = listOfViolations;
    }
}
