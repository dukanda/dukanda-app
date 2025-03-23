"use client";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

export const ImageUploader = ({ setImageUrl, isLoading, imageContain}: { imageContain?: string,isLoading?: boolean, setImageUrl: (url: string) => void }) => {
  const [imagePreview, setImagePreview] = useState<string | null>( imageContain || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
       // console.log("Image URL d:", imageUrl); // <-- Adicione esta linha para depuração
        setImagePreview(imageUrl);
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <label htmlFor="image-upload" className="cursor-pointer">
        {imagePreview ? (
          <Image
            width={200}
            height={200}
            src={imagePreview}
            alt="Preview"
            className="w-[200px] h-[200px] object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-48 border-dashed border-2 rounded-md flex items-center justify-center text-gray-500">
            Clique para carregar uma imagem
          </div>
        )}
      </label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        ref={fileInputRef}
      />

      {imagePreview && (
        <div className="flex items-center justify-center mt-4">
          <Button onClick={handleRemoveImage} disabled={isLoading} className="bg-red-500 hover:bg-red-600">Remover Imagem</Button>
        </div>
      )}
    </div>
  );
};
