package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createProduct() {
		Product product = new Product();
		product.setId(1L);
		product.setName("Good Phone");
		product.setPrice(800.0);
		product.setImgUrl("https://img.com/img.png");
		product.setDate(Instant.parse("2021-10-20T03:00:00Z"));
		
		return product;
	}

	public static ProductDTO createProductDTO() {	
		return new ProductDTO(createProduct());
	}
}
