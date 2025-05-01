package org.example.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.DTO.ProductDTO;
import org.example.backend.model.DTO.ProductRequest;
import org.example.backend.model.DTO.ProductSizeRequest;
import org.example.backend.model.Product;
import org.example.backend.model.mapper.ProductMapper;
import org.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    ProductMapper productMapper;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProduct(){
        List<ProductDTO> products = productService.getAllProduct();
        return  ResponseEntity.ok().body(products);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Sản phẩm hiện đang có trong đơn hàng nên ko thể xóa");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String keyword) {
        List<ProductDTO> products = productService.searchProduct(keyword);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProduct/{idProduct}")
    public ResponseEntity<?> getProductById(@PathVariable int idProduct){
        ProductDTO product=productService.getProduct(idProduct);
        return ResponseEntity.ok().body(product);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> createProduct(
            @RequestPart("product") String requestJSON,
            @RequestPart("file") List<MultipartFile> images
        ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProductRequest request = mapper.readValue(requestJSON,ProductRequest.class);
            ProductDTO savedProduct = productService.createProduct(request, images);
            return ResponseEntity.ok(savedProduct);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping(value = "/update/{idProductUpdate}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable int idProductUpdate,
            @RequestPart("product") String requestJSON,
            @RequestPart(value = "imagesUploaded",required = false) List<MultipartFile> imagesUploaded,
            @RequestParam(value = "imagesDeleted",required = false) List<Integer> IdimagesDeleted

    ) {
        try {
            System.out.println(IdimagesDeleted);
            if(imagesUploaded==null)
                imagesUploaded=new ArrayList<>();
            if(IdimagesDeleted==null)
                IdimagesDeleted=new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            ProductRequest request = mapper.readValue(requestJSON,ProductRequest.class);
            ProductDTO savedProduct = productService.updateProduct(idProductUpdate, request, imagesUploaded, IdimagesDeleted);
            return ResponseEntity.ok(savedProduct);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
