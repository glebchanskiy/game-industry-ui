import { Ref } from "preact/hooks";
import { ApiResponse } from "./api";

export type Entity = { [key: string]: string | undefined }


export const getFormField = (fieldName: string, ref: Ref<HTMLFormElement>) => (ref.current?.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement).value

export const camelCaseToWords = (s: string) => {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

export const responseToObject = async (response: Response) => response.json()

export const responseToApiResponse = async (response: Response) : Promise<ApiResponse<any>> => {
    let data 
    try {
       data = await response.json()
    } catch (err) {}
    return {
        data,
        meta: {
            status: response.status
        }
    } 
}

export const logAndPipe = async (obj: any) => {
    console.log('log: ', obj)
    return obj;
}
