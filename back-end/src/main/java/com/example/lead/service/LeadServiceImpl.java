package com.example.lead.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import com.example.lead.entity.Lead;
import com.example.lead.repository.LeadRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LeadServiceImpl implements LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Override
    public ResponseEntity<List<Lead>> getAll(HttpHeaders headers) {
        List<Lead> leads = leadRepository.findAll();
        if (!leads.isEmpty()) {
            return ResponseEntity.ok(leads);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @Override
    public ResponseEntity<Optional<Lead>> getById(HttpHeaders headers, Long id) {
        Optional<Lead> lead = leadRepository.findById(id);
        if (lead.isPresent()) {
            return ResponseEntity.ok(lead);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Lead> add(HttpHeaders headers, Lead lead) {
        Lead savedLead = leadRepository.save(lead);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLead);
    }

    @Override
    public ResponseEntity<Lead> update(@RequestHeader HttpHeaders headers, Long id, Lead lead) {
        Optional<Lead> existingLead = leadRepository.findById(id);
        if (existingLead.isPresent()) {
            Lead existingLeadObj = existingLead.get();
            existingLeadObj.setFirstName(lead.getFirstName());
            existingLeadObj.setLastName(lead.getLastName());
            existingLeadObj.setEmail(lead.getEmail());
            existingLeadObj.setPhone(lead.getPhone());
            return ResponseEntity.ok(lead);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Lead> delete(@RequestHeader HttpHeaders headers, Long id) {
        Optional<Lead> leadoOptional = leadRepository.findById(id);
        if (leadoOptional.isPresent()) {
            Lead lead = leadoOptional.get();
            lead.setAccount(null);
            leadRepository.deleteById(id);
            return ResponseEntity.ok(lead);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
