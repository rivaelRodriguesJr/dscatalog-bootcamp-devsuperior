package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createProduct() {
		Product product = new Product();
		product.setId(1L);
		product.setName("Phone");
		product.setDescription("Good Phone");
		product.setPrice(800.0);
		product.setImgUrl("https://img.com/img.png");
		product.setDate(Instant.parse("2020-10-20T03:00:00Z"));
		
		Category category = new Category();
		category.setId(1L);
		category.setName(null);
		
		product.getCategories().add(category);
		
		return product;
	}

	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;
	}
}
