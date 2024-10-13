export interface IContactOption {
    displayNameLang: string;
    value: ContactType;
}

export enum ContactType {
    SalesCustomerSupport = 0,
    TechSupport = 1,
    RMA = 2,
    Marketing = 3,
    Sponsoring = 4,
}
