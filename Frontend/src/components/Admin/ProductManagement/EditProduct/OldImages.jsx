import React, { useState } from "react";
import API_BASE_URL from "../../../../config/apiConfig";

export default function OldImages({
  images,
  imagesToDelete,
  setImagesToDelete,
}) {
  const handleImageClick = (idImage) => {
    if (imagesToDelete.includes(idImage)) {
      setImagesToDelete(imagesToDelete.filter((id) => id !== idImage));
    } else {
      setImagesToDelete([...imagesToDelete, idImage]);
    }
  };

  return (
    <div className="mb-3">
      <label className="block font-semibold">Hình ảnh hiện tại</label>
      <div className="grid grid-cols-4 gap-4 w-full">
        {images?.map((img) => (
          <div
            key={img.idImage}
            className={`relative cursor-pointer ${
              imagesToDelete.includes(img.idImage) ? "opacity-50" : ""
            }`}
            onClick={() => handleImageClick(img.idImage)}
          >
            <img
              src={`${API_BASE_URL}/assets/${img.urlImage}`}
              alt="Product"
              className="w-full h-auto object-cover rounded-lg shadow"
            />
            {imagesToDelete.includes(img.idImage) && (
              <div className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs">
                X
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
