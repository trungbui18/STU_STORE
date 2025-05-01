import React from "react";

export default function NewImagesUploader({ images, setImages }) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file: file,
    }));
    setImages([...images, ...newImages]);
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="mb-3">
      <label className="block font-semibold mb-2">Hình ảnh tải lên</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded w-full"
      />

      <div className="flex flex-wrap gap-4 mt-4">
        {images.map((img) => (
          <div key={img.id} className="relative w-32 h-32">
            <img
              src={img.id}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg shadow"
            />
            <button
              onClick={() => handleDeleteImage(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
