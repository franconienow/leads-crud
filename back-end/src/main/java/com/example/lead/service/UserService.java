package com.example.lead.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.lead.entity.Account;
import com.example.lead.entity.User;

public interface UserService {
    ResponseEntity<List<User>> getAll();
    
    ResponseEntity<Optional<User>> getById(Long id);
    
    ResponseEntity<User> add(User user);
    
    ResponseEntity<User> update(Long id, User user);
    
    ResponseEntity<Optional<User>> delete(Long id);

    ResponseEntity<List<Account>> getAllAccountsFromUser(Long userId);
}
