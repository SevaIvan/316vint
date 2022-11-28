package ru.kata.spring.boot_security.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.repo.RoleRepo;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleService {

    private final RoleRepo roleRepo;

    @Autowired
    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Transactional
    public void addRole(Role role) {
        roleRepo.save(role);
    }

    public Set<Role> findRollsById(String roleId) {
        Set<Role> roles = new HashSet<>();
        for (Role role: roleRepo.findAll()) {
            if (roleId.contains(role.getId().toString())){
                roles.add(role);
            }
        }
        return roles;
    }

    public Role getRole(String name) {
        return roleRepo.findRoleByName(name);
    }

}
