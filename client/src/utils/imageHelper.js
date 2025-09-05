import { useMemo } from "react";

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

function stripBase64Prefix(base64) {
  return base64.replace(/^data:image\/\w+;base64,/, "");
}

export function ProductImage({ base64Data }) {
  const imageUrl = useMemo(() => {
    if (!base64Data) return "";

    const cleanBase64 = stripBase64Prefix(base64Data);

    try {
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "image/png" });
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error("Failed to decode Base64:", err);
      return "";
    }
  }, [base64Data]);

  return <img src={imageUrl} alt="product" />;
}
