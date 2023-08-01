import { Global } from "./Global";

export const GetProfile = async (studentId, setState) => {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'student/profile/' + studentId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    const data = await request.json();
    if (data.status == 'success') {
        setState(data.student)
    }
    return data;

}