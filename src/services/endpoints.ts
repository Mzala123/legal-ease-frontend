import http from "@/services/api.ts";

// financial year

export function createFinancialYear(data: Record<string, unknown>){
    return http.post("/financial-year", data);
}

export function getFinancialYear(){
    return http.get<Record<string, number | boolean | string>[]>(`/financial-year`)
}

export function getOneFinancialYear(id: string ){
    return http.get(`/financial-year/${id}`)
}

export function updateFinancialYear(id: string, data: Record<string, unknown>){
    return http.post(`/financial-year/${id}`, data);
}
export function deleteFinancialYear(id: number){
    return http.delete(`/financial-year/${id}`)
}

// case categories
export function createCaseCategory(data: Record<string, unknown>) {
   return http.post(`/case-category`, data)
}

export function getOneCaseCategory(id:string){
   return http.get(`/case-category/${id}`)
}

export function getAllCaseCategories(){
   return http.get<Record<string, number | boolean | string>[]>(`/case-category`)
}

export function updateCaseCategory(id:string,data:Record<string, unknown>){
      return http.patch(`/case-category/${id}`, data)
}

export function deleteOneCaseCategory(id:string){
    return http.delete(`/case-category/${id}`)
}