export const getTagSimilar = async (tag, apiUrl) => {
    try {
        const response = await fetch(`${apiUrl}${tag}`);
        const data = await response.json();
        return data.zapatoFound;
    } catch(error) {
        console.log(error);
        return {}
    }
};