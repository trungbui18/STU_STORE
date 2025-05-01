export default function ProductImages({ images }) {
  return (
    <div className="w-full sm:w-full md:w-full lg:w-1/2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto h-auto lg:h-screen border-r border-black scrollbar-hidden whitespace-nowrap">
      {images.map((img, index) => (
        <img
          key={img.id || index} // Ưu tiên dùng ID, nếu không có thì dùng index
          src={`http://localhost:8080/assets/${img.urlImage}`}
          alt="Product"
          className="h-full lg:h-auto w-auto lg:w-full object-cover border-r lg:border-b border-black"
        />
      ))}
    </div>
  );
}
