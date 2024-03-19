package com.example.lead.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lead.entity.Account;
import com.example.lead.entity.User;
import com.example.lead.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PostMapping
    public ResponseEntity<User> add(@RequestBody User user) {
        return userService.add(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<User>> delete(@PathVariable Long id) {
        return userService.delete(id);
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<List<Account>> getAllAccountsFromUser(@PathVariable Long userId) {
        return userService.getAllAccountsFromUser(userId);
    }
}
