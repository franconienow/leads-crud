package com.example.lead.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = Account.TABLE_NAME)
public class Account {
    public static final String TABLE_NAME = "ACCOUNT_REG";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Length(min = 5, max = 50)
    @Column(length = 50, nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Lead> leads;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_account", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<User>();

    public Account() {
    }

    public Account(Long id, String name, List<Lead> leads, List<User> users) {
        this.id = id;
        this.name = name;
        this.leads = leads;
        this.users = users;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Lead> getLeads() {
        return this.leads;
    }

    public void setLeads(List<Lead> leads) {
        this.leads = leads;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUserToUsers(User user) {
        this.users.add(user);
    }

    public void removeUserFromUsers(User user) {
        this.users.remove(user);
    }

}
