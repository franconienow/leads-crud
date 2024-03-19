package com.example.lead.dto;

import com.example.lead.entity.UserRole;

public record RegisterDTO(String firstName, String lastName, String email, String password, UserRole role) {

}
