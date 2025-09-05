import { useEffect, useState } from "react";

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export const base64ToFile = (base64, filename) => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export function ProductImage({ base64Data }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!base64Data) return;

    const cleanBase64 = base64Data.startsWith("data:") ? base64Data : `data:image/png;base64,${base64Data}`;

    fetch(cleanBase64)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      })
      .catch(err => console.error(err));

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [base64Data]);

  if (!imageUrl) return null;

  return <img src={imageUrl} alt="product" style={{ maxWidth: "5rem" }} loading="lazy" />;
}

