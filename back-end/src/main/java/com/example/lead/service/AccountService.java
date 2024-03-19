package com.example.lead.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.lead.entity.Account;
import com.example.lead.entity.Lead;

public interface AccountService {
    ResponseEntity<List<Account>> getAll();

    ResponseEntity<Account> getById(Long id);

    ResponseEntity<Account> add(Account user, String userId);

    ResponseEntity<Account> update(Long id, Account user);

    ResponseEntity<Account> delete(Long id);

    ResponseEntity<String> addUserToAccount(Long accountId, Long userId);

    ResponseEntity<String> removeUserFromAccount(Long accountId, Long userId);

    ResponseEntity<Lead> addLeadWithAccount(Long accountId, Lead lead);

    ResponseEntity<List<Lead>> getAllLeadsFromAccount(Long accountId);

    ResponseEntity<Lead> getLeadByIdFromAccount(Long accountId, Long leadId);

    ResponseEntity<Lead> updateLeadFromAccount(Long accountId, Long leadId, Lead lead);

    ResponseEntity<Lead> deleteLeadFromAccount(Long accountId, Long leadId);
}
