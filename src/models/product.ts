export class Product {
    name: string;
    exist: boolean;
    isOk: boolean;
    listOfViolations: string[];
    imageUrl: string;
    additives: string[];// additives_tags
    allergens: string[]; // allergens_tags
    traces: string[]; //traces
    certifications: string[]; // labels
    description: string; // generic_name
    quantity: string; //quantity
    nutritionGrade: string //nutrition_grades
    // nutrionTab: string[];

}
