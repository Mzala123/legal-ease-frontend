import http from "@/services/api.ts";


export function createCaseCategory(data: Record<string, any>) {
   return http.post(`/case-category`, data)
}

export function getOneCaseCategory(id:string){
   return http.get(`/case-category/${id}`)
}

export function getAllCaseCategories(){
   return http.get<Record<string, number | boolean | string>[]>(`/case-category`)
}

export function updateCaseCategory(id:string,data:Record<string, any>){
      return http.patch(`/case-category/${id}`, data)
}

export function deleteOneCaseCategory(id:string){
    return http.delete(`/case-category/${id}`)
}