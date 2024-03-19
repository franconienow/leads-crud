package com.example.lead.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lead.entity.Lead;
import com.example.lead.service.LeadService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @GetMapping
    public ResponseEntity<List<Lead>> getAll(@RequestHeader HttpHeaders headers) {
        return leadService.getAll(headers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Lead>> getById(@RequestHeader HttpHeaders headers,
            @PathVariable @NotNull @Positive Long id) {
        return leadService.getById(headers, id);
    }

    @PostMapping
    public ResponseEntity<Lead> add(@RequestHeader HttpHeaders headers, @RequestBody @Valid Lead lead) {
        return leadService.add(headers, lead);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lead> update(@RequestHeader HttpHeaders headers, @PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Lead lead) {
        return leadService.update(headers, id, lead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Lead> delete(@RequestHeader HttpHeaders headers, @PathVariable @Valid Long id) {
        return leadService.delete(headers, id);
    }
}
