package com.devsuperior.dscatalog.services.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.devsuperior.dscatalog.resources.exceptions.StandardError;


@ControllerAdvice
public class ResourceExceptionHnadler {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e, HttpServletRequest request) {
		
		StandardError err = StandardError.builder()
				.timestamp(Instant.now())
				.status(HttpStatus.NOT_FOUND.value())
				.error("Resource not found")
				.message(e.getMessage())
				.path(request.getRequestURI())
				.build();
		
		return ResponseEntity.status(err.getStatus()).body(err);
	}
}
