package com.example.exampleapp;

public class ProductEndpoint {

    public ProductService productService;

    public void addProduct(String name, String description) {
        productService.addProduct(name, description);

    }

}
