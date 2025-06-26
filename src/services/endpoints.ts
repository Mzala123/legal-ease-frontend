import http from "@/services/api.ts";


export function createCaseCategory(){

}

export function getOneCaseCategory(id:string){
   return http.get(`/case-category/${id}`)
}

export function getAllCaseCategories(){
   return http.get(`/case-category`)
}

export function updateCaseCategory(){

}

export function deleteOneCaseCategory(){

}