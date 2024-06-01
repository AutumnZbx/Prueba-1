export const sendItemData = (id, url) =>{

    let params = new URLSearchParams();
    params.append("id", id);
 
    url += params.toString();
    location.href = url;
 };