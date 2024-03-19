package com.example.lead.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.lead.entity.Account;
import com.example.lead.entity.Lead;
import com.example.lead.entity.User;
import com.example.lead.repository.AccountRepository;
import com.example.lead.repository.LeadRepository;
import com.example.lead.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public ResponseEntity<List<Account>> getAll() {
        List<Account> accounts = accountRepository.findAll();
        if (!accounts.isEmpty()) {
            return ResponseEntity.ok(accounts);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @Override
    public ResponseEntity<Account> getById(Long id) {
        Optional<Account> account = accountRepository.findById(id);
        if (account.isPresent()) {
            return ResponseEntity.ok(account.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Account> add(Account account, String userId) {
        Optional<User> userOptional = userRepository.findById(Long.parseLong(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            account.addUserToUsers(user);
            Account savedAccount = accountRepository.save(account);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAccount);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Account> update(Long id, Account account) {
        Optional<Account> existingUser = accountRepository.findById(id);
        if (existingUser.isPresent()) {
            Account existingUserObj = existingUser.get();
            existingUserObj.setName(account.getName());
            return ResponseEntity.ok(existingUserObj);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Account> delete(Long id) {
        Optional<Account> accountOptional = accountRepository.findById(id);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            accountRepository.deleteById(id);
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> addUserToAccount(Long accountId, Long userId) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (accountOptional.isPresent() && userOptional.isPresent()) {
            Account account = accountOptional.get();
            User user = userOptional.get();
            account.addUserToUsers(user);
            return ResponseEntity.ok("User added to Account");
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<String> removeUserFromAccount(Long accountId, Long userId) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (accountOptional.isPresent() && userOptional.isPresent()) {
            Account account = accountOptional.get();
            User user = userOptional.get();
            account.removeUserFromUsers(user);
            return ResponseEntity.ok("User removed from Account");
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Lead> addLeadWithAccount(Long accountId, Lead lead) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            lead.setAccount(account);
            return ResponseEntity.ok(leadRepository.save(lead));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<Lead>> getAllLeadsFromAccount(Long accountId) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            List<Lead> leads = account.getLeads();
            if (!leads.isEmpty()) {
                return ResponseEntity.ok(leads);
            } else {
                return ResponseEntity.noContent().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Lead> getLeadByIdFromAccount(Long accountId, Long leadId) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        Optional<Lead> leadOptional = leadRepository.findById(leadId);
        if (accountOptional.isPresent() && leadOptional.isPresent()) {
            Account account = accountOptional.get();
            Lead lead = leadOptional.get();
            if (lead.getAccount().getId() == account.getId()) {
                return ResponseEntity.ok(lead);
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Lead> updateLeadFromAccount(Long accountId, Long leadId, Lead updatedLead) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        Optional<Lead> leadOptional = leadRepository.findById(leadId);
        if (accountOptional.isPresent() && leadOptional.isPresent()) {
            Account account = accountOptional.get();
            Lead lead = leadOptional.get();
            if (lead.getAccount().getId() == account.getId()) {
                lead.setLastName(updatedLead.getLastName());
                lead.setFirstName(updatedLead.getFirstName());
                lead.setEmail(updatedLead.getEmail());
                lead.setPhone(updatedLead.getPhone());
                lead.setStatus(updatedLead.getStatus());
                return ResponseEntity.ok(leadRepository.save(lead));
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Lead> deleteLeadFromAccount(Long accountId, Long leadId) {
        Optional<Account> accountOptional = accountRepository.findById(accountId);
        Optional<Lead> leadOptional = leadRepository.findById(leadId);
        if (accountOptional.isPresent() && leadOptional.isPresent()) {
            Account account = accountOptional.get();
            Lead lead = leadOptional.get();
            if (lead.getAccount().getId() == account.getId()) {
                lead.setAccount(null);
                leadRepository.delete(lead);
                return ResponseEntity.ok(lead);
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
