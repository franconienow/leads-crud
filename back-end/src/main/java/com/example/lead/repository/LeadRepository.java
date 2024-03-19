package com.example.lead.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lead.entity.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

}
