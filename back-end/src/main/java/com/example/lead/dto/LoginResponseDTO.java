package com.example.lead.dto;

import com.example.lead.entity.UserRole;

public record LoginResponseDTO(String token, String userEmail, UserRole userRole, Long userId) {

}
