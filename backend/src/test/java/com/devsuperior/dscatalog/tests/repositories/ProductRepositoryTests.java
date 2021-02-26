package com.devsuperior.dscatalog.tests.repositories;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamerProducts;
	private long countCategoryId1Products;
	private long countCategoryId2Products;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		countCategoryId1Products = 1L;
		countCategoryId2Products = 2L;
	}

	//Exercício
	@Test
	public void findShouldReturnProductsWhenHasSeveralCategories() {
		Category category1 = new Category();
		category1.setId(1L);
		category1.setName("Livros");
		
		Category category2 = new Category();
		category2.setId(2L);
		category2.setName("Eletrônicos");
		
		Page<Product> result = repository.find(Arrays.asList(category1, category2), "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategoryId1Products + countCategoryId2Products, result.getTotalElements());
		

	}
	//Exercício
	@Test
	public void findShouldReturnProductsWhenHasOneCategory() {
		Category category = new Category();
		category.setId(1L);
		category.setName("Livros");

		Page<Product> result = repository.find(Arrays.asList(category), "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategoryId1Products, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		
		String name = "";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		
		String name = "pc gAMeR";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		
		String name = "PC Gamer";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}

	@Test
	public void saveShouldPersistsWithAutoIncrementWhenIdIsNull () {
		
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {

		repository.deleteById(existingId);

		Optional<Product> result = repository.findById(existingId);

		Assertions.assertFalse(result.isPresent());
	}

	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}

}
