package com.example.lead.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.lead.entity.Account;
import com.example.lead.entity.User;
import com.example.lead.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userRepository.findAll();
        if (!users.isEmpty()) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @Override
    public ResponseEntity<Optional<User>> getById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<User> add(User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @Override
    public ResponseEntity<User> update(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User existingUserObj = existingUser.get();
            existingUserObj.setFirstName(user.getFirstName());
            existingUserObj.setLastName(user.getLastName());
            existingUserObj.setEmail(user.getEmail());
            return ResponseEntity.ok(existingUserObj);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Optional<User>> delete(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<List<Account>> getAllAccountsFromUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Account> accounts = user.getAccounts();
            if (!accounts.isEmpty()) {
                return ResponseEntity.ok(accounts);
            } else {
                return ResponseEntity.noContent().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
