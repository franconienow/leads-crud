package com.example.lead.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lead.entity.Account;
import com.example.lead.entity.Lead;
import com.example.lead.service.AccountService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAll() {
        return accountService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getById(@PathVariable @NotNull @Positive Long id) {
        return accountService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Account> add(@RequestBody @Valid Account account, @RequestParam @NotNull String userId) {
        return accountService.add(account, userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Account account) {
        return accountService.update(id, account);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Account> delete(@PathVariable @NotNull @Positive Long id) {
        return accountService.delete(id);
    }

    @PostMapping("/{accountId}/addUser/{userId}")
    public ResponseEntity<String> addUserToAccount(@PathVariable @NotNull @Positive Long accountId,
            @PathVariable @NotNull @Positive Long userId) {
        return accountService.addUserToAccount(accountId, userId);
    }

    @PostMapping("/{accountId}/removeUser/{userId}")
    public ResponseEntity<String> removeUserFromAccount(@PathVariable @NotNull @Positive Long accountId,
            @PathVariable @NotNull @Positive Long userId) {
        return accountService.removeUserFromAccount(accountId, userId);
    }

    @PostMapping("/{accountId}/leads")
    public ResponseEntity<Lead> addLeadWithAccount(@PathVariable @NotNull @Positive Long accountId,
            @RequestBody @Valid Lead lead) {
        return accountService.addLeadWithAccount(accountId, lead);
    }

    @GetMapping("/{accountId}/leads")
    public ResponseEntity<List<Lead>> getAllLeadsFromAccount(@PathVariable @NotNull @Positive Long accountId) {
        return accountService.getAllLeadsFromAccount(accountId);
    }

    @GetMapping("/{accountId}/leads/{leadId}")
    public ResponseEntity<Lead> getLeadByIdFromAccount(@PathVariable @NotNull @Positive Long accountId,
            @PathVariable @NotNull @Positive Long leadId) {
        return accountService.getLeadByIdFromAccount(accountId, leadId);
    }

    @PutMapping("/{accountId}/leads/{leadId}")
    public ResponseEntity<Lead> updateLeadFromAccount(@PathVariable @NotNull @Positive Long accountId,
            @PathVariable @NotNull @Positive Long leadId,
            @RequestBody @Valid Lead lead) {
        return accountService.updateLeadFromAccount(accountId, leadId, lead);
    }

    @DeleteMapping("/{accountId}/leads/{leadId}")
    public ResponseEntity<Lead> deleteLeadFromAccount(@PathVariable @NotNull @Positive Long accountId,
            @PathVariable @NotNull @Positive Long leadId) {
        return accountService.deleteLeadFromAccount(accountId, leadId);
    }
}
