import apiInstance from "."

export interface User {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const login = async (data: User) => {

    console.log("api data", data)
    try {

        const response = await apiInstance.post('/auth/login', data);
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }

}

export const signup = async (data: User) => {

    console.log("api data", data)
    try {

        const response = await apiInstance.post('/users', data);
        return response?.data

    } catch (error: any) {

        throw error?.response?.data
    }

}