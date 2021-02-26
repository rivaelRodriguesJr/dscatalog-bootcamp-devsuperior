package com.devsuperior.dscatalog.tests.factory;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;

public class CategoryFactory {

	public static Category createCategory() {
		Category category = new Category();
		category.setId(1L);
		category.setName("Phones");

		return category;
	}

	public static CategoryDTO createCategoryDTO() {
		return new CategoryDTO(createCategory());
	}

}
