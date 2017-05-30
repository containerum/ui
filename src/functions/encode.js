export const encode = string => {
    let num = 0;
    let length = string.length;
    for (let i = 0; i < length; i++)
        num += string.charCodeAt(i) % 10;
    return num % 10;
};