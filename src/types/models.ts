
interface IModel {
    createdAt: string;
    updatedAt: string;
}

export interface Department extends IModel {
    department_id: string;
    department_name: string;
    department_code: string;
    department_description: string;
}

export interface FinancialYear extends IModel {
    financial_year_id: string;
    name: string;
    start_date: string;
    end_date: string;
}

export interface CaseCategory extends IModel {
    category_id: string;
    department_id: string;
    category_name: string;
    category_code: string;
    category_description: string;
}