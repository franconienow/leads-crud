package com.example.lead.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;

import com.example.lead.entity.Lead;

public interface LeadService {
    ResponseEntity<List<Lead>> getAll(HttpHeaders headers);

    ResponseEntity<Optional<Lead>> getById(HttpHeaders headers, Long id);

    ResponseEntity<Lead> add(HttpHeaders headers, Lead lead);

    ResponseEntity<Lead> update(@RequestHeader HttpHeaders headers, Long id, Lead lead);
    
    ResponseEntity<Lead> delete(@RequestHeader HttpHeaders headers, Long id);
}
