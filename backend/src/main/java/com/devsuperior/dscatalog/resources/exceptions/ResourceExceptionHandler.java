package com.devsuperior.dscatalog.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.NOT_FOUND; 	
		StandardError err = StandardError.builder()
				.timestamp(Instant.now())
				.status(status.value())
				.error("Resource not found")
				.message(e.getMessage())
				.path(request.getRequestURI())
				.build();
		
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<StandardError> database(DatabaseException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST; 	
		StandardError err = StandardError.builder()
				.timestamp(Instant.now())
				.status(status.value())
				.error("Database exception")
				.message(e.getMessage())
				.path(request.getRequestURI())
				.build();
		
		return ResponseEntity.status(status).body(err);
	}
}
