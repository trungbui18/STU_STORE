package org.example.backend.service;

import org.example.backend.model.*;
import org.example.backend.model.DTO.ProductDTO;
import org.example.backend.model.DTO.ProductRequest;
import org.example.backend.model.mapper.ProductMapper;
import org.example.backend.repository.ProductImageRepository;
import org.example.backend.repository.ProductRepository;
import org.example.backend.repository.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    ProductRepository productRepository;
    ProductImageRepository productImageRepository;
    StaffRepository staffRepository;
    ProductMapper productMapper;
    ImageService imageService;

    public ProductService(ProductRepository productRepository, ProductImageRepository productImageRepository, StaffRepository staffRepository, ProductMapper productMapper, ImageService imageService) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.staffRepository = staffRepository;
        this.productMapper = productMapper;
        this.imageService = imageService;
    }

    public List<ProductDTO> getAllProduct(){
        List<ProductDTO> dssp= productMapper.toListProductDTO(productRepository.findAll());
        return dssp;
    }

    public List<ProductDTO> searchProduct(String keyword){
        return productMapper.toListProductDTO(productRepository.findByNameContainingIgnoreCase(keyword));
    }

    public ProductDTO getProduct(int id){
        Product product=productRepository.findById(id).orElseThrow(()->new RuntimeException("ko tìm thấy product"));
        return productMapper.toProductDTO(product);
    }



    public ProductDTO createProduct(ProductRequest request, List<MultipartFile> images) {
        Product product =productMapper.toProduct(request);
        List<ProductImage> productimages=new ArrayList<>();
        if(!images.isEmpty()){
            for(MultipartFile image : images){
                if(image.getSize()>0){
                    String fileName=imageService.saveFile(image);
                    ProductImage productImage = new ProductImage();
                    productImage.setUrlImage(fileName);
                    productImage.setProduct(product);
                    productimages.add(productImage);
                }
            }
        }
        product.setImages(productimages);
        productRepository.save(product);
        return productMapper.toProductDTO(product);
    }


    public ProductDTO deleteProduct(int id){
        Product product=productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
        for(ProductImage productImage : product.getImages()){
            imageService.deleteFile(productImage.getUrlImage());
        }
        return productMapper.toProductDTO(product);
    }

    public ProductDTO updateProduct(int idProductUpdate, ProductRequest request, List<MultipartFile> imagesUploaded, List<Integer> imagesDeleted) {


        Product product = productRepository.findById(idProductUpdate)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.getSizes().clear();

        List<ProductSize> sizes = request.getSizes().stream().map(sizeRequest -> {
            ProductSize size = new ProductSize();
            size.setSize(sizeRequest.getSize());
            size.setQuantity(sizeRequest.getQuantity());
            size.setProduct(product);
            return size;
        }).collect(Collectors.toList());
        product.getSizes().addAll(sizes);

        if(imagesDeleted!=null){
            for(Integer idImageDeleted: imagesDeleted){
                ProductImage productImage = productImageRepository.findById(idImageDeleted).orElseThrow(() -> new RuntimeException("Product image not found"));
                imageService.deleteFile(productImage.getUrlImage());
                productImageRepository.delete(productImage);
            }
        }

        System.out.println("images deleted: "+imagesDeleted);

        if (!imagesUploaded.isEmpty()) {
            System.out.println("Số ảnh tải lên: " + imagesUploaded.size());
            for (MultipartFile image : imagesUploaded) {
                if (image.getSize() > 0) {
                    String fileName = imageService.saveFile(image);
                    ProductImage productImage = new ProductImage();
                    productImage.setUrlImage(fileName);
                    productImage.setProduct(product);
                    product.getImages().add(productImage);
                } else {
                    System.out.println("Bỏ qua file rỗng: " + image.getOriginalFilename());
                }
            }
        }
        return productMapper.toProductDTO(productRepository.save(product));
    }

}
