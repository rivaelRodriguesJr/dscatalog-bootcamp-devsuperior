package com.devsuperior.dscatalog.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class FileDTO implements Serializable {
  private static final long serialVersionUID = 1L;

  private MultipartFile image;

  public FileDTO() {
  }

  public MultipartFile getImage() {
    return image;
  }

  public void setImage(MultipartFile image) {
    this.image = image;
  }

}
