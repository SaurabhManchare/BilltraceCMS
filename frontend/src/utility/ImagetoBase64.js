async function ImagetoBase64(file) {
    const reader = new FileReader();

    const userRegisterData = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    });

    reader.readAsDataURL(file);

    return userRegisterData;
}

export { ImagetoBase64 };
