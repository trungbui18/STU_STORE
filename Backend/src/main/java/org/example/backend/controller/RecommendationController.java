package org.example.backend.controller;


import org.example.backend.model.DTO.ProductDTO;
import org.example.backend.model.Product;
import org.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
@RequestMapping("/api")
public class RecommendationController {
   ProductService productService;

    public RecommendationController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/recommend")
    public List<ProductDTO> recommend(@RequestParam int id) {
        String apiAiRecommend = "http://localhost:5000/recommend?idProduct=" + id;
        RestTemplate restTemplate = new RestTemplate();
        List<Integer> recommendations = restTemplate.getForObject(apiAiRecommend, List.class);

        List<ProductDTO> listRecommend=productService.getProductRecommendation(recommendations);
        return listRecommend;
    }

}
